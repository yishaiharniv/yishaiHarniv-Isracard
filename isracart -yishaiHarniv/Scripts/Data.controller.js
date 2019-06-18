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
        Loader(true); 
        $http.get("/Home/ToList").then(function (response) {
            $scope.data = response.data;
            Loader(false);            
        });
    }

    //search function from api
    $scope.Search = function (key) {
        Loader(true); 
        $http.get('https://api.github.com/search/repositories?q=' + key).then(function (response) {
            $scope.data = response.data.items
            Loader(false);            
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
            item.disabled = true;
        })
    }


    function Loader(status) {
        if (status == true) {
            $('#loader').show();
            $('#res').hide();
            $('#res1').hide();
        }
        else {
            $('#loader').hide();
            $('#res').show();
            $('#res1').show();
        }
    }

})