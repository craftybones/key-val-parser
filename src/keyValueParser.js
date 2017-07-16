var isWhiteSpace=function(character) {
  return character==" "||character=="\t";
}

var parser=function(text) {
  var tokens=[]
  var i=0;
  var currentToken="";
  while(i<text.length) {
    currentChar=text[i];
    if(currentChar=="=") {
      tokens.push(currentToken);
      currentToken="";
    } else {
      if(isWhiteSpace(currentChar)) {
        tokens.push(currentToken);
        currentToken="";
      } else {
        currentToken+=currentChar;
      }
    }
    i++;
  }
  tokens.push(currentToken);
  // raise error if(tokens.length%2!=0)
  var parsed={keys:{},numberOfKeys:0};
  for (var i = 0; i < tokens.length; i+=2) {
    parsed.keys[tokens[i]]=tokens[i+1];
    parsed.numberOfKeys++;
  }
  return parsed;
}

module.exports=parser;
