/*
 * grunt-dictator
 * https://github.com/justspamjustin/grunt-dictator
 *
 * Copyright (c) 2013 Justin Martin
 * Licensed under the MIT license.
 */

'use strict';

var Handlebars = require('handlebars');
var fileset = require('fileset');
var _ = require('underscore');
var fs = require('fs');

Handlebars.registerHelper('toLower', function(value) {
  return new Handlebars.SafeString(value.toLowerCase());
});

Handlebars.registerHelper('className', function(value) {
  return new Handlebars.SafeString(value.split(/(?=[A-Z])/g).join('-').toLowerCase());
});

var Dictator = function (grunt, opts) {
  this.grunt = grunt;
  this.options = opts;
  if (_.isUndefined(this.options.templates)) {
    grunt.fail.fatal('The "templates" property must be defined');
  }
  this.templateArgs = _.defaults(this.convertArgsToObject(), opts.templateDefaults);

  this.destination = this.templateArgs['dest'] ? this.options.baseDest + '/' + this.templateArgs['dest'] : this.options.baseDest;
  this.handleFiles();
};

Dictator.prototype.handleFiles = function () {
  var self = this;
  fileset(this.options.templates + '/**/*', function (err, files) {
    files.forEach(function (fileName) {
      self.handleFileOrDirectory(fileName.replace(self.options.templates, ''));
    });
  });
};

Dictator.prototype.handleFile = function (fileName) {
  var newFileName = Handlebars.compile(fileName)(this.templateArgs);
  var templateContent = fs.readFileSync('./' + this.options.templates + fileName).toString();
  var newFileContent = Handlebars.compile(templateContent)(this.templateArgs);
  fs.writeFileSync( './' + this.destination + newFileName, newFileContent);
};

Dictator.prototype.handleDirectory = function (directoryName) {
  var newDirectoryName = Handlebars.compile(directoryName)(this.templateArgs);
  try {
    fs.mkdirSync( './' + this.destination + newDirectoryName);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e;
    }
  }
};

Dictator.prototype.handleFileOrDirectory = function (fileName) {
  if (fileName.indexOf('.') != -1) {
    this.handleFile(fileName);
  } else {
    this.handleDirectory(fileName);
  }
};

Dictator.prototype.convertArgsToObject = function () {
  var rawArgs = process.argv.splice(3);
  var argObj = {};
  for (var i = 0; i < rawArgs.length; i++) {
    var argPair = rawArgs[i];
    if (_.isNull(argPair.match(/--[^\=]*=.*/))) {
      this.grunt.fail.fatal('Template arguments need to be of the format "--name=value"');
    }
    var key = argPair.split('=')[0].replace('--', '');
    var value = argPair.split('=')[1];
    argObj[key] = value;
  }
  return argObj;
};

module.exports = function(grunt) {

  grunt.registerMultiTask('dictator', 'Your task description goes here.', function() {
    var opts = this.options({
      baseDest: ''
    });
    new Dictator(grunt, opts);
  });
};
