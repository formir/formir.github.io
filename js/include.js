
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
      if ($(block).closest('.section.tabs').length > 0) {
        $(block).closest('.section.tabs').find("> input[type='radio'][checked]").each(function() {
          $(this).get(0).checked=true;
        });
        $(block).closest('.section.tabs').find(".tabs input[type='radio'][checked]").each(function() {
          $(this).get(0).checked=true;
        });
      }
    }
    hljs.highlightBlock(block);
  });
});
