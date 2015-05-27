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

  var MAX_HISTORIES = 5;

  var localStorage = window.localStorage || {};

  var wrapper = $('<div></div>');
  function createCodeBlock(language, code) {
    wrapper.html($('<pre></pre>').addClass('brush: ' + language).text(code));
    return wrapper.html();
  }

  function onSubmit() {
    var language = elements.language.val();
    var code = elements.code.val();
    var data = createCodeBlock(language, code);
    var ret = $.query.get('addon_id') + "||PIXNET||" + data;
    windowProxy.postMessage(ret);
    histories.unshift(language);
    histories = $.unique(histories).reverse().slice(0, MAX_HISTORIES);
    localStorage['histories'] = JSON.stringify(histories);
    return false;
  }

  function onCancel() {
    var ret = $.query.get('addon_id') + "||PIXNET||";
    windowProxy.postMessage(ret);
    return false;
  }

  function onClickHistories() {
    elements.language.val($(this).text());
  }

  var windowProxy, elements = {}, histories;
  $(document).ready(function() {
    var proxy_url = $.query.get('proxy_url') + '?addon_id=' + $.query.get('addon_id') + '&pToken=' + $.query.get('pToken');
    windowProxy = new Porthole.WindowProxy( proxy_url );

    histories = jQuery.parseJSON(localStorage['histories'] || '[]');

    elements.language = $('#language');
    elements.language.val(histories[0]);
    elements.code = $('#code');
    elements.histories = $('#histories');

    histories.forEach(function(language) {
      elements.histories.append('<a href="#">' + language + '</a>');
    });

    $('#form-html-code').on('submit', onSubmit);
    $('#popup-cancel-btn').click(onCancel);
    elements.histories.on('click', 'a', onClickHistories);
  });
})(jQuery, window, document);
