//login
app.controller('LoginController', function($scope, QaFactory, $location) {
    $scope.user = {};
    $scope.newUser = {};

    $scope.login = function() {
        //check against db see if user exists
        QaFactory.doesUserExist($scope.user, function(response) {
            if (response.result == true) {
                //login
                QaFactory.setUser(response.user);
                $location.url("/dashboard")
            } else {
                //dont login

            }
        });
    }

    $scope.register = function() {
        QaFactory.doesUserExist($scope.newUser, function(response) {
            console.log(response);
            if (response.result == true) {
                //do not register
            } else {
                //register
                QaFactory.register($scope.newUser);
            }
        });
    }
});

//dashboard
app.controller('DashboardController', function($scope, QaFactory) {
    $scope.user;
    $scope.questions = [];
    $scope.answers = [];

    function setQuestions(data) {
        $scope.questions = data;
    }

    function setUser(data) {
        $scope.user = data;
    }

    //get the current user
    QaFactory.getUser(setUser);

    //initialize questions
    QaFactory.getQuestions(setQuestions);

});

//new questions
app.controller('NewQuestionController', function($scope, QaFactory, $location) {
    $scope.newQuestion = {};

    function setUser(data) {
        $scope.user = data;
    }
    //initialize user
    QaFactory.getUser(setUser);

    $scope.addQuestion = function() {
        $scope.newQuestion.user = $scope.user
        console.log($scope.newQuestion);
        QaFactory.addQuestion($scope.newQuestion, function() {
            $location.url('/dashboard')
        });

    }
});

//show questions details
app.controller('ShowController', function($scope, QaFactory, $routeParams, $location) {
    $scope.question = {};

    //initialize questions
    var id = $routeParams.id;

    function setQuestion(data) {
        $scope.question = data;
    }

    QaFactory.getQuestion(id, setQuestion);

    //like
    $scope.like = function(answerId) {
        QaFactory.like(answerId, setQuestion);
    }

});

//new answer
app.controller('NewAnswerController', function($scope, QaFactory, $routeParams, $location) {
    $scope.question = {};
    $scope.newAnswer = {};
    $scope.user;
    //init user
    QaFactory.getUser(setUser);

    //initialize questions
    var id = $routeParams.id;

    function setUser(data) {
        $scope.user = data;
    }

    function setQuestion(data) {
        $scope.question = data;
    }

    QaFactory.getQuestion(id, setQuestion);

    $scope.submit = function() {
        $scope.newAnswer.createdBy = $scope.user._id;
        $scope.newAnswer.questionId = $scope.question._id;
        QaFactory.addAnswer($scope.newAnswer, function() {
            $location.url('/question/' + $scope.question._id);
        });
    }
});
