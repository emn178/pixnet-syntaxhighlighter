/*
 * pixnet-syntaxhighlighter v0.2.0
 * https://github.com/emn178/pixnet-syntaxhighlighter
 *
 * Copyright 2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function($, window, document, undefined) {
  'use strict';

  var BRUSHES = {
    'shBrushAS3.js': ['as3', 'actionscript3'],
    'shBrushBash.js': ['bash', 'shell'],
    'shBrushColdFusion.js': ['cf', 'coldfusion'],
    'shBrushCSharp.js': ['c-sharp', 'csharp'],
    'shBrushCpp.js': ['cpp', 'c'],
    'shBrushCss.js': ['css'],
    'shBrushDelphi.js': ['delphi', 'pas', 'pascal'],
    'shBrushDiff.js': ['diff', 'patch'],
    'shBrushErlang.js': ['erl', 'erlang'],
    'shBrushGroovy.js': ['groovy'],
    'shBrushJScript.js': ['js', 'jscript', 'javascript'],
    'shBrushJava.js': ['java'],
    'shBrushJavaFX.js': ['jfx', 'javafx'],
    'shBrushPerl.js': ['perl', 'pl'],
    'shBrushPhp.js': ['php'],
    'shBrushPlain.js': ['plain', 'text'],
    'shBrushPowerShell.js': ['ps', 'powershell'],
    'shBrushPython.js': ['py', 'python'],
    'shBrushRuby.js': ['rails', 'ror', 'ruby'],
    'shBrushScala.js': ['scala'],
    'shBrushSql.js': ['sql'],
    'shBrushVb.js': ['vb', 'vbnet'],
    'shBrushXml.js': ['xml', 'xhtml', 'xslt', 'html', 'xhtml']
  };

  var FILES = {};
  for(var file in BRUSHES) {
    $(BRUSHES[file]).each(function() {
      FILES[this] = file;
    });
  }

  var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/';
  function loadScript(file) {
    return $.ajax({
      url: cdn + file,
      dataType: "script",
      cache: true
    });
  }

  $.extend({
    pixSyntaxhighlighter: function (options) {
      cdn = options.cdn || cdn;
      var classes = [];
      $('pre.brush\\:').each(function() {
        $(this.classList).each(function() {
          if(this == 'brush:') {
            return;
          }
          classes.push(this);
        });
      });
      $.unique(classes);

      $('body').append('<link rel="stylesheet" type="text/css" href="' + cdn + 'styles/shCoreDefault.css">')

      var deferred = $.Deferred();
      deferred.resolve();
      deferred = deferred.pipe( function() {
        return loadScript('scripts/shCore.js');
      });

      $.each(classes, function(o, className) {
        deferred = deferred.pipe(function() {
          return loadScript('scripts/' + FILES[className]);
        });
      });
      deferred.done(function() {
        SyntaxHighlighter.all();
      });
    }
  });
})(jQuery, window, document);
