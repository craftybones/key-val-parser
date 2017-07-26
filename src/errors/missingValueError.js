const KeyValueParseError=require("./keyValParseError.js");

function MissingValueError(key,position) {
  KeyValueParseError.call(this,"Missing value",position);
  this.key=key;
}

MissingValueError.prototype = Object.create(KeyValueParseError.prototype);
MissingValueError.constructor = MissingValueError;

module.exports=MissingValueError;
