//factory
app.factory('QaFactory', function($http) {
    var factory = {};
    var user;
    var questions = [];

    //initialize questions in factory
    $http.get('/getQuestions').then(function(response) {
        questions = response.data;
    });

    factory.doesUserExist = function(login, callback) {
        $http.post('/doesUserExist', login).then(function(response) {
            callback(response.data);
        });
    }

    factory.register = function(user) {
        $http.post('/register', user);
    }

    factory.setUser = function(userObject) {
        user = userObject;
    }

    factory.getUser = function(callback) {
        callback(user);
    }

    factory.getQuestions = function(callback) {
        $http.get('/getQuestions').then(function(response) {
            questions = response.data;
            callback(questions);
        });
    }

    factory.addQuestion = function(newQuestion, callback) {
        $http.post('/addQuestion', newQuestion).then(function(response) {
            questions.push(response.data);
            callback();
        });
    }

    factory.getQuestion = function(id, callback) {
        for (var i = 0; i < questions.length; i++) {
            if (questions[i]._id == id) {
                callback(questions[i]);
                break;
            }
        }
    }

    factory.addAnswer = function(newAnswer, callback) {
        $http.post('/addAnswer', newAnswer).then(function(response) {
            $http.get('/getQuestions').then(function(response) {
                questions = response.data;
                callback();
            });
            console.log(response.data);
        });
    }

    factory.like = function(answerId, callback) {
        $http.post('/like', {id: answerId}).then(function(response) {
            //update question
            loop1:
                for (var i = 0; i < questions.length; i++) {
                    if (questions[i]._id == response.data._question) {
                        console.log(questions[i].answers);
                        for (var j = 0; j < questions[i].answers.length; i++) {
                            if (questions[i].answers[j]._id == response.data._id) {
                                questions[i].answers[j] = response.data;
                                callback(questions[i]);
                                break loop1;
                            }
                        }
                    }
                }
        });
    }

    return factory;
});
