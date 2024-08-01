"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var locationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        // ref:"users"
        ref: "Profiles"
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // GeoJSON type
            required: true,
        },
        coordinates: {
            type: [Number], // Array of numbers [longitude, latitude]
            required: true,
        },
    },
    // radius:{
    //     type:Number,
    //     required:true
    // }
}, {
    timestamps: true
});
locationSchema.index({ location: "2dsphere" });
var locationModel = (0, mongoose_1.model)("locations", locationSchema);
exports.default = locationModel;
locationModel.on('index', function (error) {
    if (error) {
        console.error('Index creation failed:', error);
    }
    else {
        console.log('Indexes created successfullyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    }
});
