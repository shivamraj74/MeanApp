//Angular Starter App
var main = angular.module("main", ['ui.router','ngRoute','ngResource'])
.run(function($http,$rootScope)
{
    if(sessionStorage.length > 0){
        $rootScope.current_user = sessionStorage.current_user;
        $rootScope.authenticated = true;
    }else{
        $rootScope.authenticated = false;
        $rootScope.current_user = 'Guest';
    }
    
    $rootScope.signout = function(){
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        $rootScope.current_user = 'Guest';
        sessionStorage.clear();
    };

});                                                                                                     
//Routing Configuration (define routes)
main.config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider,$rootScope) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'Index.html',
                caseInsensitiveMatch: true,
                controller: 'MainController'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'Contact.html',
                caseInsensitiveMatch: true,
                controller: 'MainController'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'About.html',
                caseInsensitiveMatch: true,
                controller: 'MainController'
            })
            .state('login',{
                url: '/login',
                templateUrl: 'login.html',
                caseInsensitiveMatch: true,
                controller: 'AuthController'
            })
            .state('register',{
                url: '/register',
                templateUrl: 'register.html',
                caseInsensitiveMatch: true,
                controller: 'AuthController'
            }).state('unauth',{
                url: '/unauth',
                templateUrl: 'unauth.html',
                caseInsensitiveMatch: true
            });
    }
]);