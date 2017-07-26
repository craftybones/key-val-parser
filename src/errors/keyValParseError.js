function KeyValueParseError(message,position) {
  this.position=position;
  this.message=message || "Parse Error";
  this.stack=(new Error()).stack;
}

KeyValueParseError.prototype = Object.create(Error.prototype);
KeyValueParseError.constructor = KeyValueParseError;

module.exports=KeyValueParseError;
