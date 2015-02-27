var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
var Feedback = mongoose.model('feedback');
var feedbacks = restifyMongoose(Feedback);
var User=mongoose.model('User');
module.exports = function (app){   

    app.get('/feedbacks',feedbacks.query());
    app.get('/feedbacks/:id', feedbacks.detail());
    app.post('/feedbacks', feedbacks.insert());
    app.post('/feedbacks/:id', feedbacks.update());
    app.del('/feedbacks/:id', feedbacks.remove());
    app.get('/feedbacks/average/:tour_id',function (req,res){
        Feedback.aggregate([
            { $match : { tour_id : req.params.tour_id }},
            { $group: {
                _id: '$tour_id',
                average_rating: { $avg: '$rating'}
            }
            }

        ], function (err, results) {
                if (err)  return res.send(500,err);
                if(results[0])return res.send(results[0]);
                res.send(404,{message:'tour not found.'});
            }
        );
    })

}


