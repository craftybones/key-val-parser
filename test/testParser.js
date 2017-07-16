const assert=require('assert');
const kvParser=require('../src/keyValueParser.js');

describe("parse basic key values",function(){
  it("should parse key=value",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser("key=value"));
  });


  it("should parse when there are leading spaces before key",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser(" key=value"));
  });

  it("should parse when there are spaces after key",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser("key =value"));
  });

  it("should parse when there are spaces before and after key",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser(" key =value"));
  });

  it("should parse when there are spaces before value",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser("key= value"));
  });

  it("should parse when there are spaces after value",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser("key=value "));
  });
});

describe("multiple keys",function(){
  it("should parse more than one key",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser("key=value anotherkey=anothervalue"));
  });

  it("should parse more than one key when keys have leading spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser("   key=value anotherkey=anothervalue"));
  });

  it("should parse more than one key when keys have trailing spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser("key  =value anotherkey  =anothervalue"));
  });

  it("should parse more than one key when keys have leading and trailing spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser("  key  =value anotherkey  =anothervalue"));
  });
});
