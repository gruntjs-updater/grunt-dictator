define(function (require) {
  'use strict';

  var Marionette = require('marionette');
  var template = require('hbs!./{{name}}Template');
  require('css!./{{name}}Style');

  return Marionette.ItemView.extend({
    className: '{{ className name }}',
    template: template
  });

});