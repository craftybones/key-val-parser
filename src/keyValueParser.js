var ParseInfo=function(initialParsingFunction) {
    this.currentToken="";
    this.currentKey="";
    this.currentValue="";
    this.parsedKeys={};
    this.nextFunction=initialParsingFunction;
}

ParseInfo.prototype.resetKeysAndValues=function() {
  this.currentKey=this.currentValue=this.currentToken="";
}

ParseInfo.prototype.pushKeyValuePair=function() {
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

ParseInfo.prototype.endOfText=function() {
  if(this.currentValue!="") {
    if(this.currentKey!="")
      this.pushKeyValuePair();
    else {
      //raise error
    }
  }
}

ParseInfo.prototype.parsed=function() {
    var length=Object.keys(this.parsedKeys).length;
    return {keys:this.parsedKeys,numberOfKeys:length};
}

var Parser=function() {
}

Parser.prototype = {
  parse:function(text) {
    var parseInfo=new ParseInfo(this.ignoreLeadingWhiteSpace);
    var parsedKeys={};

    for (var i = 0; i < text.length; i++) {
      this.f=parseInfo.nextFunction;
      parseInfo=this.f(text[i],parseInfo);
    }
    parseInfo.endOfText(parseInfo,parsedKeys);
    return parseInfo.parsed();
  },
  parseKey:function(currentChar,parseInfo) {
    if(isAlphanumeric(currentChar)) {
      parseInfo.currentToken+=currentChar;
      return parseInfo;
    }
    if(isWhiteSpace(currentChar))
      return parseInfo;
    if(isEqualsCharacter(currentChar)) {
      parseInfo.currentKey=parseInfo.currentToken;
      parseInfo.currentToken="";
      parseInfo.nextFunction=this.parseValue;
      return parseInfo;
    } // throw error otherwise
  },
  parseValue:function(currentChar,parseInfo) {
    if(isWhiteSpace(currentChar))
      return parseInfo;
    if(isAlphanumeric(currentChar)) {
      parseInfo.currentValue+=currentChar;
      parseInfo.nextFunction=this.parseValueWithoutQuotes;
      return parseInfo;
    }
    if(isQuote(currentChar)) {
      parseInfo.nextFunction=this.parseValueWithQuotes;
      return parseInfo;
    }
  },
  parseValueWithQuotes:function(currentChar,parseInfo) {
    if(isQuote(currentChar)) {
      parseInfo.pushKeyValuePair();
      parseInfo.nextFunction=this.ignoreLeadingWhiteSpace;
      return parseInfo;
    }
    parseInfo.currentValue+=currentChar;
    return parseInfo;
  },
  parseValueWithoutQuotes:function(currentChar,parseInfo) {
    if(isWhiteSpace(currentChar)) {
      parseInfo.pushKeyValuePair();
      parseInfo.nextFunction=this.ignoreLeadingWhiteSpace;
      return parseInfo;
    }
    parseInfo.currentValue+=currentChar;
    return parseInfo;
  },
  ignoreLeadingWhiteSpace:function(currentChar,parseInfo) {
    if(isWhiteSpace(currentChar))
      return parseInfo;
    if(isAlphanumeric(currentChar)) {
      parseInfo.currentToken+=currentChar;
      parseInfo.nextFunction=this.parseKey;
    } // else throw error
    return parseInfo;
  },
}

var isWhiteSpace=function(character) {
  return character.match(/\s/);
}

var isAlphanumeric=function(character) {
  var r=RegExp(/\w/);
  return character.match(r);
}

var isQuote=function(character) {
  return character.match(/"/);
}

var isEqualsCharacter=function(character) {
  return character=="=";
}

module.exports=Parser;
