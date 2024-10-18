import mongoose  from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/healthApp");

const patientSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    patientType: { type: String, required: true },
    testType: { type: String, required: true },
    file: { type: String, required: true } 
});

export default mongoose.model("patient", patientSchema);