var ParseInfo=require('./parseInfo.js');

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

var parseValueWithQuotes=function(parseInfo,currentChar) {
  if(isQuote(currentChar)) {
    parseInfo.pushKeyValuePair();
    parseInfo.nextFunction=ignoreLeadingWhiteSpace;
    return parseInfo;
  }
  parseInfo.currentValue+=currentChar;
  return parseInfo;
}

var parseValueWithoutQuotes=function(parseInfo,currentChar) {
  if(isWhiteSpace(currentChar)) {
    parseInfo.pushKeyValuePair();
    parseInfo.nextFunction=ignoreLeadingWhiteSpace;
    return parseInfo;
  }
  parseInfo.currentValue+=currentChar;
  return parseInfo;
}

var parseValue=function(parseInfo,currentChar) {
  if(isWhiteSpace(currentChar))
    return parseInfo;
  if(isAlphanumeric(currentChar)) {
    parseInfo.currentValue+=currentChar;
    parseInfo.nextFunction=parseValueWithoutQuotes;
    return parseInfo;
  }
  if(isQuote(currentChar)) {
    parseInfo.nextFunction=parseValueWithQuotes;
    return parseInfo;
  }
}

var parseKey=function(parseInfo,currentChar) {
  if(isAlphanumeric(currentChar)) {
    parseInfo.currentToken+=currentChar;
    return parseInfo;
  }
  if(isWhiteSpace(currentChar))
    return parseInfo;
  if(currentChar=="=") {
    parseInfo.currentKey=parseInfo.currentToken;
    parseInfo.currentToken="";
    parseInfo.nextFunction=parseValue;
    return parseInfo;
  } // throw error otherwise
}

var ignoreLeadingWhiteSpace=function(parseInfo,currentChar) {
  if(isWhiteSpace(currentChar))
    return parseInfo;
  if(isAlphanumeric(currentChar)) {
    parseInfo.currentToken+=currentChar;
    parseInfo.nextFunction=parseKey;
  } // else throw error
  return parseInfo;
}

var parser=function(text) {
  parseInfo=new ParseInfo(ignoreLeadingWhiteSpace);
  for (var i = 0; i < text.length; i++) {
    parseInfo=parseInfo.nextFunction(parseInfo,text[i]);
  }
  parseInfo.endOfText();
  var length=Object.keys(parseInfo.keys).length;
  var parsed={keys:parseInfo.keys,numberOfKeys:length};
  return parsed;
}

module.exports=parser;
