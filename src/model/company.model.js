import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    location:{
        type: mongoose.SchemaTypes.String,
        required:true,
    },
    imageUrl: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    Jobs: [
    {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Job" 
    }
    ]
}, {
    collection: "companies",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Company", CompanySchema);