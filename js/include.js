
/**
 * Convert a string to HTML entities
 */
String.prototype.toHtmlEntities = function() {
  return this.replace(/./gm, function(s) {
      return "&#" + s.charCodeAt(0) + ";";
  });
};

/**
* Create string from HTML entities
*/
String.fromHtmlEntities = function(string) {
  return (string+"").replace(/&#\d+;/gm,function(s) {
      return String.fromCharCode(s.match(/\d+/gm)[0]);
  })
};


$(document).ready(function() {
  $('pre code').each(function(i, block) {
    if ($(block).is(':not(.skip)')) {
      encode = $(block)[0].innerHTML.trim().toHtmlEntities();
      $(block).html(encode);
    }
    hljs.highlightBlock(block);
  });
});
