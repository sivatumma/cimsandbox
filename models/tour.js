module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var TourSchema = Schema({
        tour_id: String,
        status: {type:Boolean,default:false},

    },{ strict: false });
    var Tour = mongoose.model('tour', TourSchema);
    return Tour;
}