
/*
this directive is to be used in the new user form in order to validate required
fields
*/
var newUserRequiredField= function()
{
  var result = {};
  result.restrict = "A";
  result.require = 'ngModel';
  result.link = function(scope, element, attr, ctrl)
  {
        function myValidation(value)
        {console.log("in myvalidation");
           if(!value || value.length ==  0)
          {
             ctrl.$setValidity('newUserRequiredField', false);
              return undefined;
          }
          ctrl.$setValidity('newUserRequiredField', true);
            return value;
        };

        ctrl.$parsers.unshift(myValidation);
  }
  return result;
}

var mustMatchThis = function()
{
  var result = {};
  result.require = 'ngModel';
  result.scope = {otherModel:"=mustMatchThis"};
  result.link = function(scope, element, attr, ctrl)
  {
    var executeMatch = function(value){
        var theyMatch = value==scope.otherModel;
        ctrl.$setValidity("matchingPassworrds",theyMatch);

        return value
      }
    ctrl.$parsers.push(executeMatch);
  };
  return result;
}


var attributetest=function() {
   return {
     restrict: 'A',
     require: 'ngModel',
     scope: {
         ngModel: '='
     },
     link: function (scope, element, attrs, ngModelCtrl) {

         function modelvalid(val){
           console.log(val);
              return ngModelCtrl.$valid;
         }

     scope.$watch(modelvalid, function(newVal,oldVal){
          ngModelCtrl.$valid = newVal.length>0;
          ngModelCtrl.$invalid=!ngModelCtrl.$valid;
             console.log('scope.modelvalid = ' + ngModelCtrl.$valid );
         });

     }

 };
}
