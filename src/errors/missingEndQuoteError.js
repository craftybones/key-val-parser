const KeyValueParseError=require("./keyValParseError.js");

function MissingEndQuoteError(key,position) {
  KeyValueParseError.call(this,"Missing end quote",position);
  this.key=key;
}

MissingEndQuoteError.prototype = Object.create(KeyValueParseError.prototype);
MissingEndQuoteError.constructor = MissingEndQuoteError;

module.exports=MissingEndQuoteError;
