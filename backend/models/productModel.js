const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter Product Name .."],
        trim : true
    },
    description : {
        type : String,
        required : [true, "Please Enter Product Description.."]
    },
    price : {
        type : Number,
        required : [true, "Please Enter Product Price.."],
        maxLength : [8, "Price can't be longer than 7 character.."]
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [{
        pic_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    }],
    category : {
        type : String,
        required : [true, "Please Enter Product Category.."]
    },
    stock : {
        type : Number,
        required : [true, "Please Enter Product Stock.."],
        maxLength : [5, "Stock can't be longer than 4 characters"],
        default : 1
    },
    numofreviews : {
        type : Number,
        default : 0
    },
    reviews : [{
        user : {
            type : mongoose.Schema.ObjectId,
            ref : "user",
            required : true
        },
        name : {
            type : String,
            required : true
        },
        rating : {
            type : Number,
            required : true
        },
        comment : {
            type : String,
            required : true
        }
    }],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);