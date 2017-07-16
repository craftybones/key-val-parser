const assert=require('assert');
const kvParser=require('../src/keyValueParser.js');

describe("parse basic key values",function(){
  it("should parse key=value",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser("key=value"));
  });
});
