var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = {
    getQuestions: function(request, response) {
        Question.find({}).populate('answers').exec(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                response.json(result);
            }
        });
    },
    addQuestion: function(request, response) {
        var newQuestion = new Question({
            _createdBy: request.body.user,
            title: request.body.title,
            description: request.body.description,
            _answer: [],
            answer_count: 0
        });
        newQuestion.save(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                response.json(result);
            }
        });
    }
}
