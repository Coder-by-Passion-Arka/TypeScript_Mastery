import {connect, model, Schema} from "mongoose";

// 1. Create an interface representing a document in MongoDB
interface User {
    name: string,
    email: string,
    avatar?: string // path to image
}

// 2. Create a Schema corresponding to the document interface
const userSchema: Schema<User> = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

// 3. Create the MongoDB Model
const userModel = model<User>('User', userSchema);

export default {
    User,
    userModel
}