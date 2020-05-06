console.log("ci sono!");

// onclick: // - calcolo // - encoding della risposta nella url // -
// redirect pagina1.html (con querystring contenente dato processato)

function computeQueryString(bin, dec, hex) {
  // Array.map + Array.join
  // var result = 'bin=' + bin + '&dec' ..
  var labels = ["bin", "dec", "hex"];
  var qs = [bin, dec, hex]
    .map(function(item, i) {
      return [labels[i], item].join("=");
    })
    .join("&");

  // bin=<bin>&dec=<dec>&hex=<hex>
  return encodeURIComponent(qs);
}

function goToResultPage(qs) {
  window.location.href = "/pagina1.html?" + qs;
}

window.clickHandler = function() {
  //convert_str2bin();convert_bin2dec();convert_dec2hex();changeColor();
  var input = document.getElementById("ti1").value;
  var bin = convert_str2bin(input);
  var dec = convert_bin2dec(input);
  var hex = convert_dec2hex(input);
  // op1, op2...opN
  // return o stampo su view / redirect con il dato calcolato

  // - encoding in qs
  // - cambio pagina
  var qs = computeQueryString(bin, dec, hex);
  goToResultPage(qs);
  console.log("handled!", computeQueryString(bin, dec, hex));
};

function convert_str2bin(gianfranco) {
  var computed = "";
  for (var i = 0; i < gianfranco.length; i++) {
    computed += gianfranco[i].charCodeAt(0).toString(2) + " ";
  }
  return computed;
}

function convert_bin2dec(input_dec) {
  var computed = "";
  for (var i = 0; i < input_dec.length; i++) {
    computed += input_dec[i].charCodeAt(0).toString(10);
  }
  return computed;
}

function convert_dec2hex(input_hex) {
  var computed = "";
  for (var i = 0; i < input_hex.length; i++) {
    computed += input_hex[i].charCodeAt(0).toString(16);
  }
  return (
    "#" +
    computed.substring(0, 6) +
    " " +
    "#" +
    computed.substring(6, 12) +
    " " +
    "#" +
    computed.substring(12, 18)
  );
}

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

function convert_str2hex(input) {
  var output_hexfromstr = document.getElementById("ti4");
  output_hexfromstr.value = "";
  output_hexfromstr.value =
    "#" + intToRGB(hashCode(document.getElementById("ti1").value));
}

function changeColor() {
  document.getElementById("sq1").style.background = document
    .getElementById("ti4")
    .value.substring(0, 7);
  document.getElementById("sq2").style.background = document
    .getElementById("ti4")
    .value.substring(8, 15);
  document.getElementById("sq3").style.background = document
    .getElementById("ti4")
    .value.substring(16, 23);
}
