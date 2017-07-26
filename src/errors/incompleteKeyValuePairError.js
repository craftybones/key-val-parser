const KeyValueParseError=require("./keyValParseError.js");

function IncompleteKeyValuePairError(position) {
  KeyValueParseError.call(this,"Missing key value pair",position);
}

IncompleteKeyValuePairError.prototype = Object.create(KeyValueParseError.prototype);
IncompleteKeyValuePairError.constructor = IncompleteKeyValuePairError;

module.exports=IncompleteKeyValuePairError;
