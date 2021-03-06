const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
// Regular expression to check formal correctness of base64 encoded strings
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const fallbackatob = function(string) {
    // atob can work with strings with whitespaces, even inside the encoded part,
    // but only \t, \n, \f, \r and ' ', which can be stripped.
    string = String(string).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(string))
        throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");

    // Adding the padding if missing, for semplicity
    string += "==".slice(2 - (string.length & 3));
    var bitmap, result = "", r1, r2, i = 0;
    for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12
                | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
                : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
                : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
};

export const atob = (a, ...args) => {
  if(typeof window !== 'undefined') {
    return window.atob(a, ...args);
  }/*
  if(typeof Buffer !== 'undefined'){
    return Buffer.from(a, 'base64').toString();
  }*/
  console.log("WARNING; could not find atob");
  return fallbackatob(a);
};
export const decodeURIComponent = (a, ...args) => {
  if(typeof window !== 'undefined') {
    return window.decodeURIComponent(a, ...args);
  }
  if(typeof global !== 'undefined') {
    return global.decodeURIComponent(a, ...args);
  }
  if(typeof self !== 'undefined') {
    return self.decodeURIComponent(a, ...args);
  }
  console.log("WARNING; could not find decodeURIComponent");
  return a;
};
export const escape = (a, ...args) => {
  if(typeof window !== 'undefined') {
    return window.escape(a, ...args);
  }
  if(typeof global !== 'undefined') {
    return global.escape(a, ...args);
  }
  if(typeof self !== 'undefined') {
    return self.escape(a, ...args);
  }
  console.log("WARNING; could not find escape");
  return a;
};
