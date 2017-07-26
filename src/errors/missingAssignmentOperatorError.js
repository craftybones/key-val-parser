const KeyValueParseError=require("./keyValParseError.js");

function MissingAssignmentOperatorError(position) {
  KeyValueParseError.call(this,"Missing assignment operator",position);
}

MissingAssignmentOperatorError.prototype = Object.create(KeyValueParseError.prototype);
MissingAssignmentOperatorError.constructor = MissingAssignmentOperatorError;

module.exports=MissingAssignmentOperatorError;
