function InvalidKeyError(message,invalidKey,position) {
  this.position=position;
  this.invalidKey=invalidKey;
  this.message=message || "Parse Error";
  this.stack=(new Error()).stack;
}

InvalidKeyError.prototype = Object.create(Error.prototype);
InvalidKeyError.constructor = InvalidKeyError;

module.exports=InvalidKeyError;
