const KeyValueParseError=require("./keyValParseError.js");

function MissingKeyError(position) {
  KeyValueParseError.call(this,"Missing key",position);
}

MissingKeyError.prototype = Object.create(KeyValueParseError.prototype);
MissingKeyError.constructor = MissingKeyError;

module.exports=MissingKeyError;
