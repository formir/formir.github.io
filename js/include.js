
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

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          encode = elmnt.getAttribute("encode") || {};
          if (this.status == 200) {
            if (encode.length) {
              elmnt.innerHTML = this.responseText.toHtmlEntities();
              $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
              });
            } else {
              elmnt.innerHTML = this.responseText;
            }
          }
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          active = elmnt.getAttribute("active") || {};
          
          if (active.length) {
            document.querySelector('[active-target="' + active + '"]').classList.add("active");
          }
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
