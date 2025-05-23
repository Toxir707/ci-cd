import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        salary: {
            type: mongoose.SchemaTypes.Number,
            required: true,
            min: 0,
        },
        companyId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"Company",
        }
        },{
            collection: "jobs",
            timestamps: true,
            versionKey: false,
        }
    )

export default mongoose.model("Job",JobSchema);