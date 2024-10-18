import mongoose  from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/healthApp");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String, 
    license: String
});

export default mongoose.model("user", userSchema);