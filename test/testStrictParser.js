const assert=require('assert');
const StrictParser=require('../src/index.js').StrictParser;

describe("strict parser",function(){
  it("should only parse keys that are specified",function(){
    let kvParser=new StrictParser(["name"]);
    assert.throws(
      () => {
        var p=kvParser.parse("age=23");
      },Error)
  });
});
