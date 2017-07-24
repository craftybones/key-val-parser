[![CircleCI](https://circleci.com/gh/craftybones/key-value-parser.svg?style=svg)](https://circleci.com/gh/craftybones/key-value-parser)

# key-value-parser

This is a parser written in Javascript that helps parse key value pairs of the format "key1=value1 key2=value2". The resultant value is a JSON object that contains all the keys and their associated values. Additionally values might be quoted to contain sentences or multiple words that are space separated.

#### Examples

Single key
> username=john

Multiple keys on the same line separated by whitespace
> username=john age=23

Single key with space between key, assignment operator and value
> username = john

Multiple keys with spaces between keys, assignment operator and values
> username = john age = 23

Single key with quoted value
> username="John Doe"

Multiple keys with quoted values
> username="John Doe" address="No 1 Janpath, New Delhi"

Multiple keys with both quoted and unquoted values
> username=johndoe address="No 1 Janpath, New Delhi"

These are broadly the cases that it will cover.


## Motivation

I was writing a [Slack](https://slack.com/) app and I had to receive arguments as a series of key value pairs. I shopped around and didn't find a package that suited my needs.

## Usage

#### Installation

`npm install key-value-parser` 
