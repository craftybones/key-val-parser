const assert=require('assert');
const StrictParser=require('../src/index.js').StrictParser;
const InvalidKeyError=require('../src/invalidKeyError.js');

var invalidKeyErrorChecker=function(invalidKey) {
  return function(err) {
    if(err instanceof InvalidKeyError && err.invalidKey==invalidKey)
      return true;
    return false;
  }
}

describe("strict parser",function(){
  it("should only parse keys that are specified for a single key",function(){
    let kvParser=new StrictParser(["name"]);
    assert.throws(
      () => {
        var p=kvParser.parse("age=23");
      },
      invalidKeyErrorChecker("age"))
  });

  it("should only parse keys that are specified for multiple keys",function(){
    let kvParser=new StrictParser(["name","age"]);
    let actual=kvParser.parse("name=john age=23");
    let expected={name:"john",age:"23"};
    assert.deepEqual(expected,actual);
    assert.throws(
      () => {
        var p=kvParser.parse("color=blue");
      },
      invalidKeyErrorChecker("color"))
  });
});
