var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    doesUserExist: function(request, response) {
        User.findOne({name: request.body.name}, function(err, result) {
            if (result.length == 0) {
                console.log(result);
                response.json({result: false})
            } else {
                console.log(result);
                response.json({result: true, user: result});
            }
        });
    },
    register: function(request, response) {
        var newUser = new User({
            name: request.body.name
        });
        newUser.save(function(err, result) {
            if (err) {
                console.log(err);
            }
        });

    }
}
