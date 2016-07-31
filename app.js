//
// Here is how to define your module
// has dependent on mobile-angular-ui
//

try {


  var app = angular.module('MobileAngularUiExamples', [
    'ngRoute',
    'mobile-angular-ui',

    // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
    // it is at a very beginning stage, so please be careful if you like to use
    // in production. This is intended to provide a flexible, integrated and and
    // easy to use alternative to other 3rd party libs like hammer.js, with the
    // final pourpose to integrate gestures into default ui interactions like
    // opening sidebars, turning switches on/off ..
    'mobile-angular-ui.gestures'
  ]);

  app.run(function($transform) {
    window.$transform = $transform;
  });

  //
  // You can configure ngRoute as always, but to take advantage of SharedState location
  // feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
  // in order to avoid unwanted routing.
  //
  app.config(function($routeProvider) {
    $routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
    $routeProvider.when('/login',         {templateUrl: 'login.html', reloadOnSearch: false});
    $routeProvider.when('/scroll',        {templateUrl: 'scroll.html', reloadOnSearch: false});
    $routeProvider.when('/toggle',        {templateUrl: 'toggle.html', reloadOnSearch: false});
    $routeProvider.when('/tabs',          {templateUrl: 'tabs.html', reloadOnSearch: false});
    $routeProvider.when('/accordion',     {templateUrl: 'accordion.html', reloadOnSearch: false});
    $routeProvider.when('/overlay',       {templateUrl: 'overlay.html', reloadOnSearch: false});
    $routeProvider.when('/forms',         {templateUrl: 'forms.html', reloadOnSearch: false});
    $routeProvider.when('/dropdown',      {templateUrl: 'dropdown.html', reloadOnSearch: false});
    $routeProvider.when('/touch',         {templateUrl: 'touch.html', reloadOnSearch: false});
    $routeProvider.when('/swipe',         {templateUrl: 'swipe.html', reloadOnSearch: false});
    $routeProvider.when('/drag',          {templateUrl: 'drag.html', reloadOnSearch: false});
    $routeProvider.when('/drag2',         {templateUrl: 'drag2.html', reloadOnSearch: false});
    $routeProvider.when('/carousel',      {templateUrl: 'carousel.html', reloadOnSearch: false});
    $routeProvider.when('/newUser',       {templateUrl: 'SignUpForm.html', reloadOnSearch: false});
    $routeProvider.when('/investorTerms', {templateUrl: 'InvestorAgreementForm.html', reloadOnSearch: false});
    $routeProvider.when('/profileInfo',   {templateUrl: 'CurrentUserDetailsForm.html', reloadOnSearch: false});
  });



  app.directive('toucharea', ['$touch',touchArea]);
  app.directive('dragToDismiss', dragToDismiss);
  app.directive('carousel', carousel);
  app.directive('disableTap', disableTap);
  app.directive('carouselItem', carouselItem);
  app.directive('dragMe', ['$drag', dragMe]);
  app.directive("mustMatchThis",mustMatchThis);
  app.directive("newUserRequiredField",newUserRequiredField);
  app.directive("attributetest",attributetest);


  app.config(function($httpProvider) {
       $httpProvider.interceptors.push(function($q) {
          return {
            responseError: function(rejection) {
                  if(rejection.status <= 0) {
                    alert("SERVER IS DOWN")
                    return;
                  }
                  return $q.reject(rejection);
              }
          };
      });
  });



  app.factory('deviceReady', function(){
    return function(done) {
      if (typeof window.cordova === 'object') {

        document.addEventListener('deviceready', function () {
          done();
        }, false);
      } else {

        done();
      }
    };
  });
  app.run(function($rootScope,$location)
  {    // register listener to watch route changes
    var postLogInRoute;
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log($rootScope.currentUser)
        if ( token == null ) {

          // no logged user, we should be going to #login
          if ( next.templateUrl == "login.html" || next.templateUrl == "SignUpForm.html" || next.templateUrl== "InvestorAgreementForm.html") {
            // already going to #login, no redirect needed
          } else {
            // not going to #login, we should redirect now
            postLogInRoute = $location.path();

            $location.path("/login");
          }
        }
        else if(postLogInRoute){
          console.log("route2",postLogInRoute)
          $location.path(postLogInRoute).replace();
           postLogInRoute = null;
        }
      });
  });
  //
  // For this trivial demo we have just a unique MainController
  // for everything
  //
  app.controller("UserController",UserController);
  app.controller('MainController',MainController );

} catch (e) {
  alert("i dont like it"+e.message)
} finally {

}
