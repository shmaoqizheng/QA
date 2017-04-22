var mongoose = require('mongoose');
//require controllers
var questions = require('../controllers/questions.js');
var answers = require('../controllers/answers.js');
var users = require('../controllers/users.js');

module.exports = function(app) {
    app.get('/getQuestions', function(request, response) {
        questions.getQuestions(request, response);
    });

    app.post('/doesUserExist', function(request, response) {
        users.doesUserExist(request, response);
    });

    app.post('/register', function(request, response) {
        users.register(request, response);
    });

    app.post('/addQuestion', function(request, response) {
        questions.addQuestion(request, response);
    });

    app.post('/addAnswer', function(request, response) {
        answers.addAnswer(request, response);
    });

    app.post('/like', function(request, response) {
        answers.like(request, response);
    });
}
