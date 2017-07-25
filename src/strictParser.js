const Parser=require("./keyValueParser.js");
const strictParseInfoCreator=require("./parseInfoCreator.js").strict;

var StrictParser=function(listOfKeys) {
  Parser.call(this);
  this.parseInfoCreator=strictParseInfoCreator(listOfKeys);
}

StrictParser.prototype=Object.create(Parser.prototype);
module.exports=StrictParser;
