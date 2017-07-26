const parseInfoCreator=require("./parseInfoCreator.js").basic;
const MissingKeyError=require("./errors/missingKeyError.js");

var Parser=function() {
  this.parseInfoCreator=parseInfoCreator;
}

Parser.prototype = {
  parse:function(text) {
    var parseInfo=this.parseInfoCreator(this.ignoreLeadingWhiteSpace);
    var parsedKeys={};

    for (var i = 0; i < text.length; i++) {
      this.f=parseInfo.nextFunction;
      parseInfo.incrementPosition();
      parseInfo=this.f(text[i],parseInfo);
    }
    parseInfo.endOfText();
    return parseInfo.parsed();
  },
  parseWhiteSpaceBeforeAssignment:function(currentChar,parseInfo) {
    if(isWhiteSpace(currentChar))
      return parseInfo;
    if(isEqualsCharacter(currentChar)) {
      parseInfo.currentKey=parseInfo.currentToken;
      parseInfo.currentToken="";
      parseInfo.nextFunction=this.parseValue;
      return parseInfo;
    } else {
      throw new Error("missing assignment operator");
    }
  },
  parseKey:function(currentChar,parseInfo) {
    if(isAlphanumeric(currentChar)) {
      parseInfo.currentToken+=currentChar;
      return parseInfo;
    }
    if(isWhiteSpace(currentChar)) {
      parseInfo.nextFunction=this.parseWhiteSpaceBeforeAssignment;
      return parseInfo;
    }
    if(isEqualsCharacter(currentChar)) {
      parseInfo.currentKey=parseInfo.currentToken;
      parseInfo.currentToken="";
      parseInfo.nextFunction=this.parseValue;
    }
    return parseInfo;
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
      parseInfo.parseWithQuotes=true;
      parseInfo.nextFunction=this.parseValueWithQuotes;
      return parseInfo;
    }
  },
  parseValueWithQuotes:function(currentChar,parseInfo) {
    if(isQuote(currentChar)) {
      parseInfo.pushKeyValuePair();
      parseInfo.parseWithQuotes=false;
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
    } else {
      throw new MissingKeyError(parseInfo.currentPos);
    }
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
