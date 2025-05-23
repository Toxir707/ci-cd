import mongoose from "mongoose";

const CVSchema = new mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        unique: true,
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: true,
        min: 0,
    },
    },{
        collection: "CVes",
        timestamps: true,
        versionKey: false,
    })

export default mongoose.model("CV",CVSchema);