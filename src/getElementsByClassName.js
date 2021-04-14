// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var elementArray = [];
  var docBody = document.body;

  var innerFunction = function (list) {
    if (list.classList && list.classList.contains(className)) {
      elementArray.push(list);
    }
    if (list.hasChildNodes()) {
      var docChild = list.childNodes;
      for (var i = 0; i < docChild.length; i++) {
        innerFunction(docChild[i]);
      }
    }
  };
  innerFunction(docBody);

  return elementArray;
};





/*

$('body').addClass('targetClassName');
htmlStrings.forEach(function(htmlString) {
  var $rootElement = $(htmlString);
  $('body').append($rootElement);
  var result = getElementsByClassName('targetClassName');
  console.log('result', result);
  var expectedNodeList = document.getElementsByClassName('targetClassName');
  console.log('expectedNodeList', expectedNodeList);
  var expectedArray = Array.prototype.slice.apply(expectedNodeList);
  console.log('expectedArray', expectedArray);
  var equality = _.isEqual(result, expectedArray); // why can't we use `===` here?
  expect(equality).to.equal(true);
  $rootElement.remove();
});

*/