import mongoose from "mongoose";
import { ROLES } from "../constants/role.constant.js";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        token: {
            type: mongoose.SchemaTypes.String,
            required: false
        },
        email: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        password: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        role: {
            type: mongoose.SchemaTypes.String,
            enum: [ROLES.VIEWER, ROLES.OWNER, ROLES.SUPER_ADMIN],
            default: ROLES.VIEWER,
          },
        jobId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Job",
        },
    },
    {
        collection: "users",
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", UserSchema);