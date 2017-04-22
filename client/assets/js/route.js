var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
    })
    .when('/new_question', {
        templateUrl: 'partials/new_question.html',
    })
    .when('/question/:id', {
        templateUrl: 'partials/show.html',
    })
    .when('/question/:id/new_answer', {
        templateUrl: 'partials/new_answer.html',
    })
    .otherwise({
      redirectTo: '/'
    });
});
