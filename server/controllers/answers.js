var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');

module.exports = {
    addAnswer: function(request, response) {
        var newAnswer = new Answer({
            _createdBy: request.body.createdBy,
            title: request.body.title,
            description: request.body.description,
            _question: request.body.questionId
        });

        newAnswer.save(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                Question.findById(request.body.questionId, function(err2, question) {
                    question.answers.push(result._id);
                    question.answer_count++;
                    question.save(function(err3) {
                        response.json(result);
                    });
                });
            }
        });
    },
    like: function(request, response) {
        var id = request.body.id;
        Answer.findById(id, function(err, result) {
            result.like_count++;
            result.save(function(err2, result2) {
                response.json(result2);
            });
        });
    }
}
