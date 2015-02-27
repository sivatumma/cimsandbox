module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var FeedbackSchema = Schema({
        tour_id: String,
        user_id:String,
        comment:String,
        rating:{type:Number,default:0}
    },{ strict: false });
    var Feedback = mongoose.model('feedback', FeedbackSchema);
    return Feedback;
}