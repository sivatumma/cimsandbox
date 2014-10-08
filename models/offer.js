module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var OfferSchema = Schema({
        thumb: String,
        coupon: String,
        radius:Number,
        frequency:Number,
        title: String,
        location: String,
        latlng:{ lat: String, lng : String },
        description: String,
        category: String,
        date: Date,
        crowd_level:{type:String ,enum :['LOW','MEDIUM','HIGH'],default:'LOW'},
        parking_available:{type:String ,enum :['LOW','MEDIUM','HIGH'],default:'LOW'},
        featured:{type:Boolean, default:false},
        model:{type:String, default:'OFFER',enum :['OFFER','EVENT','LOCATION']}
    },{ strict: false });
    var Offer = mongoose.model('offer', OfferSchema);
    return Offer;
}