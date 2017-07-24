# key-value-parser

## What?

This is a parser written in Javascript that helps parse key value pairs of the format "key1=value1 key2=value2". The resultant value is a JSON object that contains all the keys and their associated values. Additionally values might be quoted to contain sentences or multiple words that are space separated. Here are examples of keys that can be parsed with this parser:

_Single key_
> key=value

_Multiple keys on the same line separated by a space_
> key1=value1 key2=value2

_Single key with space between key, assignment operator and value_
> key1 = value2

