// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (obj === null) {
    return 'null';
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return stringifyArray(obj);
  } else if (typeof obj === 'object') {
    return stringifyObject(obj);
  }
};

var stringifyArray = function (array) {
  var arrString = [];
  for (var i = 0; i < array.length; i++) {
    var currentEle = array[i];
    if (Array.isArray(currentEle)) {
      arrString.push(stringifyArray(currentEle));
    } else if (typeof currentEle === 'object' && !Array.isArray(currentEle)) {
      arrString.push(stringifyObject(currentEle));
    } else if (currentEle.length === 0) {
      arrString.concat([]);
    } else if (typeof currentEle === 'string') {
      arrString.push('"' + currentEle + '"');
    } else {
      arrString.push(currentEle);
    }
  }
  return '[' + arrString.join(',') + ']';
};

var stringifyObject = function (object) {
  var resultArr = [];
  var objKeys = Object.keys(object);

  if (objKeys.length === 0) {
    return '{}';
  }

  for (var j = 0; j < objKeys.length; j++) {
    var currentKey = objKeys[j];
    var objValue = object[currentKey];

    if (objValue === null) {
      resultArr.push('"' + currentKey + '":' + objValue);
    } else if (typeof objValue === 'function' || objValue === undefined) {
      delete currentKey;
    } else {
      resultArr.push('"' + currentKey + '":' + stringifyValue(objValue));
    }
  }
  return '{' + resultArr.join(',') + '}';
};

var stringifyValue = function(value) {
  if (Number.isNaN(value)) {
    return null;
  } else if (Array.isArray(value)) {
    return stringifyArray(value);
  } else if (typeof value === 'object') {
    return stringifyObject(value);
  } else if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'string') {
    return '"' + value + '"';
  } else if (value !== Infinity && typeof value === 'number') {
    return value;
  } else if (value === Infinity) {
    return null;
  } else if (typeof value === 'function' || typeof value === 'symbol') {
    return null;
  }
};