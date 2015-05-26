/*
 * pixnet-syntaxhighlighter v0.1.0
 * https://github.com/emn178/pixnet-syntaxhighlighter
 *
 * Copyright 2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function($, window, document, undefined) {
  'use strict';

  var wrapper = $('<div></div>');
  function createCodeBlock(language, code) {
    wrapper.html($('<pre></pre>').addClass('brush: ' + language).text(code));
    return wrapper.html();
  }

  window.createCodeBlock = createCodeBlock;
})(jQuery, window, document);
