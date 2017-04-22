var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
