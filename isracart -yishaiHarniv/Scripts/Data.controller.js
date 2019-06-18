var mainApp = angular.module('mainApp', ['ngRoute']);

//directive when click enter key for search call to search function
mainApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

//routig pages
mainApp.config(function ($routeProvider, $locationProvider) {
    //here we will write code for implement routing 
    $routeProvider
        .when('/', { // This is for reditect to another route
            redirectTo: function () {
                return '/home';
            }
        })
        .when('/home', {
            templateUrl: '/Html/Main.html',
            controller: 'mainCtrl'
        })
        .when('/bookmark', {
            templateUrl: '/Html/Bookmark.html',
            controller: 'mainCtrl'
        })

    $locationProvider.html5Mode(false).hashPrefix('!'); // This is for Hashbang Mode
})

mainApp.controller('mainCtrl', function ($scope, $http) {
    $scope.key = '';
    $scope.data = [];

    //get bookmark from session
    $scope.getBookmark = function () {
        $http.get("/Home/ToList").then(function (response) {
            console.log('response', response.data);
            $scope.data = response.data
        });
    }

    //search function from api
    $scope.Search = function (key) {
        console.log('search', key);
        $http.get('https://api.github.com/search/repositories?q=' + key).then(function (response) {
            console.log('response', response.data);
            $scope.data = response.data.items
        });
    };

    //set bookmark avatar
    $scope.Post = function (item) {
        console.log('item', item);
        $http({
            method: "POST",
            url: "/Home/Post",
            datatype: "json",
            data: item
        }).then(function (response) {
            console.log(response);
        })
    }


    $scope.name = 'Nishchit Dhananai';
    $scope.alert = function (name) {
        alert("sdsds");
    }
})