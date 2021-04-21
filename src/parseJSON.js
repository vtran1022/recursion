// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  if (json[0] === 'n') {
    return null;
  } else if (json[0] === 't') {
    return true;
  } else if (json[0] === 'f') {
    return false;
  } else if (Number.isInteger(Number.parseInt(json))) {
    return Number.parseInt(json);
  } else if (json[0] === '"') {
    return parseString(json);
  } else if (json[0] === '{') {
    return parseObject(json);
  } else if (json[0] === '[') {
    return parseArray(json);
  }
};

/*

object
    {}
    { members }
members
    pair
    pair , members
pair
    string : value
array
    []
    [ elements ]
elements
    value
    value , elements
value
    string
      if (json[0] === '"') {return parseString(json);}
    number
      if (Number.isInteger(Number.parseInt(json))) {return Number.parseInt(json);}
    object
      if (json[0] === '{') {return parseObject(json);}
    array
      if (json[0] === '[') {return parseArray(json);}
    true
      if (json[0] === 't') {return true;}
    false
      if (json[0] === 'f') {return false;}
    null
      if (json[0] === 'n') {return null;}

*/

// [4, "harro, world", [], {}];

var parseString = function(json) {
  var str = json.slice(1, json.length - 1);
  return str;
};

var parseArray = function(json) {
  var arr = [];
  if (json.length <= 2) {
    return arr;
  }
  var slicedStr = json.slice(1, json.length - 1);
  if (slicedStr[0] === '[') {
    return parseArray(slicedStr);
  } else if (slicedStr[0] === '{') {
    return parseObject(slicedStr);
  } else if (slicedStr[0] === '"' && slicedStr.indexOf('"') === slicedStr.length - 1) {
    return parseString(slicedStr);
  } else {
    var initialIndex = 0;
    for (var i = 0; i <= slicedStr.length; i++) {
      if (i === ',' || i === slicedStr.length) {
        var innerSlicedStr = slicedStr.slice(initialIndex, i);
        var slicedParse = parseJSON(innerSlicedStr);
        arr.push(slicedParse);
        initialIndex++;
      }
    }
  }
  return arr;
};


