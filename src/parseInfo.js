var ParseInfo=function(nextFunction) {
  this.currentToken="";
  this.currentKey="";
  this.currentValue="";
  this.keys={};
  this.nextFunction=nextFunction;
}

ParseInfo.prototype = {
  pushKeyValuePair:function() {
    this.keys[this.currentKey]=this.currentValue;
    this.currentKey=this.currentValue="";
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

module.exports=ParseInfo;
