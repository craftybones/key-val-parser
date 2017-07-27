[![CircleCI](https://circleci.com/gh/craftybones/key-val-parser.svg?style=shield&circle-token=bf6ce6c20ee055640d93e8272915b7e59482403d)](https://circleci.com/gh/craftybones/key-val-parser) [![npm version](https://badge.fury.io/js/key-val-parser.svg)](https://badge.fury.io/js/key-val-parser) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# key-val-parser

This is a parser written in Javascript that helps parse key value pairs of the format "key1=value1 key2=value2". The resultant value is a JSON object that contains all the keys and their associated values. Additionally values might be quoted to contain sentences or multiple words that are space separated.

## Motivation

I was writing a [Slack](https://slack.com/) app and I had to receive arguments as a series of key value pairs. I shopped around and didn't find a package that suited my needs.

## Installation

`npm install key-val-parser`

## Usage

```javascript
var Parser=require('key-val-parser');

var p=new Parser();

var parsed=p.parse("name=john age=23");

console.log("Number of keys parsed",parsed.length());
console.log("value of name=",parsed.name);
console.log("value of age=",parsed.age);
```

The above code will produce

```
Number of keys parsed 2
value of name= john
value of age= 23
```


#### Examples

##### Regular Parser
```javascript
var Parser=require('key-val-parser').Parser;
var p=new Parser();

// Single key
> p.parse("username=john");
Parsed { username: 'john' }

// Multiple keys on the same line separated by whitespace
> p.parse("username=john age=23");
Parsed { username: 'john', age: '23' }

// Single key with space between key, assignment operator and value
> p.parse("username = john");
Parsed { username: 'john' }

// Multiple keys with spaces between keys, assignment operator and values
> p.parse("username = john age = 23");
Parsed { username: 'john', age: '23' }

// Single key with quoted value
> p.parse("username=\"John Doe\"");
Parsed { username: 'John Doe' }

// Multiple keys with quoted values
> p.parse("username=\"John Doe\" address=\"No 1 Janpath, New Delhi\"");
Parsed { username: 'John Doe', address: 'No 1 Janpath, New Delhi' }

// Multiple keys with both quoted and unquoted values
> p.parse("username=johndoe address=\"No 1 Janpath, New Delhi\"");
Parsed { username: 'johndoe', address: 'No 1 Janpath, New Delhi' }

```

These are broadly the cases that it will cover.

##### Strict Parser

There is also a Strict Parser available that allows you to specify valid keys. If the parser encounters an invalid key, it will raise an error. This is useful in cases where you want to whitelist certain options. For example, a config file.

```javascript
var StrictParser=require('key-val-parser').StrictParser;
var sp=new StrictParser(["name","age"]);

> sp.parse("name=john age=23 color=blue") // Error: Invalid key
```


_Note: The rest of the parsing stays the same as a regular parser, and it will handle all the cases involving leading spaces, quotes etc._


#### Error handling

Errors will be thrown if the parser encounters missing keys, values or assignment operators.

```javascript
var Parser=require('key-val-parser');
var p=new Parser();

// Missing value
p.parse("username=");  // Error: missing value

// Missing key
p.parse("=john"); // Error: missing key

// Missing assignment operator
p.parse("username john"); // Error: missing assignment operator

// Incomplete key value pair
p.parse("key"); // Error: incomplete key value pair
```

#### Unsupported Cases

Keys with spaces
```javascript
p.parse("user name=john");
```

Keys containing non-alphanumeric characters
```javascript
p.parse("abc123#$$=john"); // It will simply ignore special characters
```

Quoted keys
```javascript
p.parse("\"user name\"=john");
```

Quoted values containing nested quotes
```javascript
p.parse("quotation=\"she said \"stop!\"\"");
```
