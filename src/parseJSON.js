// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
// console.log(JSON.parse('["\\\\\\"\\"a\\""]'));
// console.log(JSON.parse('["and you can\'t escape thi\s"]'));

var parseJSON = function(json) {
  if (json[0] === 'n') {
    return null;
  } else if (json[0] === 't') {
    return true;
  } else if (json[0] === 'f') {
    return false;
  } else if (Number.isInteger(Number.parseInt(json))) {
    return Number(json);
  } else if (json[0] === '"') {
    return parseString(json);
  } else if (json[0] === '{') {
    return parseObject(json);
  } else if (json[0] === '[') {
    return parseArray(json);
  }
};

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
  slicedStr = slicedStr.split(' ').join('');

  if (slicedStr[0] === '[') {
    arr.push(parseArray(slicedStr));
  } else if (slicedStr[0] === '{') {
    arr.push(parseObject(slicedStr));
  } else if (slicedStr[0] === '"' && slicedStr.indexOf('"', 1) === slicedStr.length - 1) {
    arr.push(parseString(slicedStr));
  } else {
    var initialIndex = 0;
    for (var i = 0; i <= slicedStr.length; i++) {
      if (slicedStr[i] === ',' || i === slicedStr.length) {
        var innerSlicedStr = slicedStr.slice(initialIndex, i);
        var slicedParse = parseJSON(innerSlicedStr);
        arr.push(slicedParse);
        initialIndex += innerSlicedStr.length + 1;
      }
    }
  }
  return arr;
};


var parseObject = function() {
  // something
};

// if more than 2 \\ then delete rest
// if less than 1 \ then delete