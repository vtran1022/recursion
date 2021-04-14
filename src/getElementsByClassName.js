// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var elementArray = [];
  var docBody = document.childNodes[1].childNodes[2];
  if (docBody.classList.contains(className)) {
    elementArray.push(docBody);
  }

  var docChildren = docBody.childNodes;
  var innerFunction = function(list) {
    console.log('before loop', elementArray);
    for (var i = 0; i < list.length; i++) {
      if (!list[i].hasChildNodes()) {
        var eleClassList = list[i].classList;
        if (eleClassList !== undefined) {
          if (eleClassList.contains(className)) {
            elementArray.push(list[i]);
            console.log('inside', elementArray);
            return;
          }
        }
      } else if (list[i].hasChildNodes()) {
        innerFunction(list[i]);
      }
    }
  };
  innerFunction(docChildren);

  console.log('outside', elementArray);

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