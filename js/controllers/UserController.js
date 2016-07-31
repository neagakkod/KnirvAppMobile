var UserController= function ($scope,$rootScope,$http,$routeParams, $location ,$filter,$sce)
{
    var newUserCommandIsCalled = $location.path().indexOf("newUser")>0 || $location.path().indexOf("investorTerms")>0;

    console.log("path:"+$location.path());
    var command;

    if(newUserCommandIsCalled)
    {
      command = new NewUserCommand($scope,$http,$rootScope, $location);

    }
    else if($location.path().indexOf("login")>0)
    {

      command = new LoginCommand($scope,$http,$rootScope, $location);
    }
    else
    {
      command = new UserMenuCommand($scope,$http,$rootScope, $location);
    }
    console.log(command);

    command.execute();

};

var UserMenuCommand = function($scope,$http,$rootScope, $location)
{
  this.execute= function()
   {
      $scope.logout  = function()
      {
        $rootScope.currentUser=null;
        token = null;
        $location.path("/login");
      }
      console.log("current user:");
      console.log($rootScope.currentUser);
      $scope.updateUser = function(form)
      {
        if(form.$valid)
        {

          //  $http.post(serverUrl+"/performAddUser",$rootScope.newUser,{"content-type":"application/json"}).then(successFunction,failureFunction);
        }
      }
    }
}
var LoginCommand = function($scope,$http,$rootScope, $location)
{
  $scope.credentials = {};
  $scope.loginError ="";
  this.execute= function()
  {

    $scope.login = function()
    {

      var request = $http.post(serverUrl+"/login",$scope.credentials);
       request.then(function(result) {
         if(result.data.error || !result.data.requested.athenticationPass){
            $scope.loginError = result.data.message;
            return;
          }
         $rootScope.currentUser= result.data.requested.user;
         token = result.data.requested.token;
         $location.path("/");
       },function(result) {
              $scope.loginError = result.data.message;
         });
   };


  }
}
var NewUserCommand = function($scope,$http,$rootScope, $location)
{
      //var addressFormHelper= new AddressFormHelper();
      var self = this;

      self.execute = function()
      {

         $scope.notices = [];
         if(!$rootScope.newUser)
            $rootScope.newUser={passwordConfirmation:"",password:""};
        console.log($rootScope.newUser);
        //load investor aggreement terms
        $scope.loadInvestorAgreement = function(form)
        {
          log($rootScope.newUser);
           if(form.$valid)
              $location.path("/investorTerms");
        }
          //when terms are agreed. we then add the new user
         $scope.performAddUser= function()
         {
            try
            {
              if(!$rootScope.newUser.userName)
              {
                $scope.notices.push({icon: 'warning', message:"ERROR:"+"we lost user information. please create user" });
                return;
              }
                var successFunction = function(response)
                {
                  try
                  {
                    if(response.data.error)
                    {
                       $scope.notices.push({icon: 'warning', message:"ERROR:"+response.data.message });
                       return;
                    }
                      $rootScope.currentUser = $rootScope.newUser;
                      $rootScope.currentUser.permission = "Investor"
                      $rootScope.newUser = null;
                      token = response.data.requested.token;
                      $location.path("/");

                  }
                  catch (e) {
                    $scope.notices.push({icon: 'warning', message:"ERROR:"+e.message });
                  } finally {

                  }
                };
                var failureFunction = function(response)
                {alert("it failed");
                  console.log(response);
                };

                $http.post(serverUrl+"/performAddUser",$rootScope.newUser,{"content-type":"application/json"}).then(successFunction,failureFunction);

            }
            catch (e){
                  $scope.notices.push({icon: 'warning', message:"ERROR:"+e.message });
                  // $scope.notices.push({icon: 'warning', message:"ERROR:"+e.message });
            }

          };// end  $scope.performAdUser
      };//execute
  };
