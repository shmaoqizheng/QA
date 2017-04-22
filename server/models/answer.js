var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AnswerSchema = new Schema({
    _createdBy: {type: ObjectId, ref: 'User'},
    title: {type: String, min: [5, "Answer should be at least 5 characters"]},
    description: String,
    _question: {type: ObjectId, ref: 'Question'},
    like_count: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("Answer", AnswerSchema);
