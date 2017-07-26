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

  it("should throw an error when one of the keys is not valid",function(){
    assert.throws(
      () => {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("name=john age=23 color=blue");
      },
      invalidKeyErrorChecker("color"))
  });

  it("should throw an error on invalid key when there are spaces between keys and assignment operators",function(){
    assert.throws(
      () => {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("color   = blue");
      },
      invalidKeyErrorChecker("color"))
  });

  it("should throw an error on invalid key when there are quotes on values",function(){
    assert.throws(
      () => {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("color   = \"blue\"");
      },
      invalidKeyErrorChecker("color"))
  });

  it("should throw an error on invalid key when there are cases of both quotes and no quotes",function(){
    assert.throws(
      () => {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("name = john color   = \"light blue\"");
      },
      invalidKeyErrorChecker("color"))
  });

});
