var Parser=function() {
  this.currentToken="";
  this.currentKey="";
  this.currentValue="";
  this.parsedKeys={};
  this.nextFunction=this.ignoreLeadingWhiteSpace;
}

Parser.prototype = {
  parse:function(text) {
    for (var i = 0; i < text.length; i++) {
      this.nextFunction(text[i]);
    }
    this.endOfText();
    var length=Object.keys(this.parsedKeys).length;
    var parsed={keys:this.parsedKeys,numberOfKeys:length};
    return parsed;
  },
  pushKeyValuePair:function() {
    this.parsedKeys[this.currentKey]=this.currentValue;
    this.currentKey=this.currentValue="";
  },
  parseKey:function(currentChar) {
    if(isAlphanumeric(currentChar)) {
      this.currentToken+=currentChar;
      return this;
    }
    if(isWhiteSpace(currentChar))
      return this;
    if(isEqualsCharacter(currentChar)) {
      this.currentKey=this.currentToken;
      this.currentToken="";
      this.nextFunction=this.parseValue;
      return this;
    } // throw error otherwise
  },
  parseValue:function(currentChar) {
    if(isWhiteSpace(currentChar))
      return this;
    if(isAlphanumeric(currentChar)) {
      this.currentValue+=currentChar;
      this.nextFunction=this.parseValueWithoutQuotes;
      return this;
    }
    if(isQuote(currentChar)) {
      this.nextFunction=this.parseValueWithQuotes;
      return this;
    }
  },
  parseValueWithQuotes:function(currentChar) {
    if(isQuote(currentChar)) {
      this.pushKeyValuePair();
      this.nextFunction=this.ignoreLeadingWhiteSpace;
      return this;
    }
    this.currentValue+=currentChar;
    return this;
  },
  parseValueWithoutQuotes:function(currentChar) {
    if(isWhiteSpace(currentChar)) {
      this.pushKeyValuePair();
      this.nextFunction=this.ignoreLeadingWhiteSpace;
      return this;
    }
    this.currentValue+=currentChar;
    return this;
  },
  ignoreLeadingWhiteSpace:function(currentChar) {
    if(isWhiteSpace(currentChar))
      return this;
    if(isAlphanumeric(currentChar)) {
      this.currentToken+=currentChar;
      this.nextFunction=this.parseKey;
    } // else throw error
    return this;
  },
  endOfText:function() {
    if(this.currentValue!="") {
      if(this.currentKey!="")
        this.pushKeyValuePair();
      else {
        //raise error
      }
    }
  }
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
