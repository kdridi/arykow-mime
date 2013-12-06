/*
 * arykow-mime
 * https://github.com/kdridi/arykow-mime
 *
 * Copyright (c) 2013 Karim DRIDI
 * Licensed under the MIT license.
 */
'use strict';

var Q = require('q'),
	FS = require('fs'),
	arykow = {
		http: require('arykow-http')
	};

var MIMEParserErrors = {
	FSERR: 'file error',
	NULL: 'data is null',
	HTTP: 'HTTP error',
	INVALID: 'data is an invalid Buffer'
};

var file = {
	createBuffer: function (path) {
		var deferred = Q.defer();
		FS.readFile(path, function (error, data) {
			if(error) {
				deferred.reject(new Error(MIMEParserErrors.FSERR));
			} else {
				deferred.resolve(data);
			}
		});
		return deferred.promise;
	}
};

var MIMEParser = function () {
	this.numbers = {};
};

MIMEParser.prototype.registerMIMEType = function (number, name, extension) {
	if (number === undefined || name === undefined ||  extension === undefined) {
		throw new Error('registerMIMEType invalid arguments');
	}
	this.numbers[number] = {
		name: name,
		extension: extension
	};
	return this;
};

MIMEParser.prototype.parse = function (data) {
	if (data === null) {
		throw new Error(MIMEParserErrors['NULL']);
	}

	if (data === undefined) {
		throw new Error('data is undefined');
	}

	if (!Buffer.isBuffer(data)) {
		throw new Error('data is not a Buffer');
	}

	if (data.length <= 0) {
		throw new Error('data is an empty Buffer');
	}

	var pattern = '^(' + Object.keys(this.numbers).join('|') + ').*$';
	var value = data.slice(0, 20).toString('hex');
	var match = new RegExp(pattern, 'gi').exec(value);

	if (match === null) {
		throw new Error(MIMEParserErrors['INVALID']);
	}

	var result = this.numbers[match[1].toUpperCase()];

	if(!result) {
		throw new Error("error");
	}

	result.data = data;

	return result;
};

MIMEParser.createInstance = function() {
	return new MIMEParser()
		.registerMIMEType('474946383961', 'image/gif', 'gif')
		.registerMIMEType('474946383761', 'image/gif', 'gif')
		.registerMIMEType('424D', 'image/bitmap', 'bmp')
		.registerMIMEType('FFD8', 'image/jpeg', 'jpg')
		.registerMIMEType('89504E470D0A1A0A', 'image/png', 'png');
};

exports.errors = MIMEParserErrors;

exports.parseFromBuffer = function(buffer) {
	var deferred = Q.defer();
	setTimeout(function() {
		try {
			var result = MIMEParser.createInstance().parse(buffer);
			deferred.resolve(result);
		} catch(error) {
			deferred.reject(error);
		}
	}, 0);
	return deferred.promise;
};

exports.parseFromFile = function(path) {
	return file.createBuffer(path).then(function(buffer) {
		return MIMEParser.createInstance().parse(buffer);
	});
};

exports.parseFromURI = function(uri) {
	return arykow.http.get().uri(uri).execute().then(function(result) {
		var code = result.response.statusCode;
		if (code !== 200) {
			throw new Error(MIMEParserErrors['HTTP']);
		}
		return MIMEParser.createInstance().parse(result.body);
	}, function(error) {
		error = new Error(MIMEParserErrors['HTTP']);
		if(error) {
			throw error;
		}
		return error;
	});
};
