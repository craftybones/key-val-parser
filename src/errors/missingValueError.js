function MissingValueError(message,key,position) {
  this.position=position;
  this.key=key;
  this.message=message || "Parse Error";
  this.stack=(new Error()).stack;
}

MissingValueError.prototype = Object.create(Error.prototype);
MissingValueError.constructor = MissingValueError;

module.exports=MissingValueError;
