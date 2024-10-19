import express from 'express';
import multer from 'multer'
const app = express();
import cors from 'cors';
app.use(cors());
import userModel from "./models/user.js"
import patientModel from "./models/patient.js"
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("/");
});

app.post("/register", async (req, res) => {
    let { name, email, password, license } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(401).json("Somethong went wrong");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                name,
                email,
                password: hash,
                license
            });

            let token = jwt.sign({ email: email, userid: user._id }, "Sayantan");
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: "Registration Successful" });
        });
    });
});

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(401).json("Somethong went wrong");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "Sayantan");
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: "Login Successful" });
        }
        else res.status(401).json({ message: "Something went wrong" });
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post("/patients", upload.single('file'), async (req, res) => {
    console.log(req.file)
    const { name, email, contact, age, gender, patientType, testType } = req.body;
    const file = req.file ? req.file.filename : null;

    const token = req.cookies.token; // Get the token from cookies
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    let doctorEmail;
    try {
        const decoded = jwt.verify(token, "Sayantan"); // Verify the token
        doctorEmail = decoded.email; // Get the doctor's email from the token
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", error: error });
    }

    // Find the doctor using the extracted email
    const doctor = await userModel.findOne({ email: doctorEmail });
    console.log(doctor);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    try {
        const newPatient = await patientModel.create({
            name,
            email,
            contact,
            age,
            gender,
            patientType,
            testType,
            file,
            doctor: doctor._id
        });
        doctor.patients.push(newPatient._id);
        await doctor.save();
        res.status(201).json({ message: "Patient details saved successfully", patient: newPatient });
    }
    catch (error) {
        res.status(500).json({ message: "Error saving patient details", error });
    }
});

app.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.redirect("/");
});

app.get("/dashboard", isLoggedIn, async (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

function isLoggedIn(req, res, next) {
    if (res.cookie.token === "") res.redirect("/");
    else {
        let data = jwt.verify(req.cookies.token, "Sayantan");
        req.user = data;
        next();
    }
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log("Server started"));