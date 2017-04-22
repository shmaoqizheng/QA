var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var QuestionSchema = new Schema({
    _createdBy: {type: ObjectId, ref: 'User'},
    title: {type: String, min: [10, "Question should be at least 10 characters"]},
    description: String,
    answers: [{type: ObjectId, ref: 'Answer'}],
    answer_count: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("Question", QuestionSchema);
