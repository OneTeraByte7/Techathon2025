const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const nodemailer = require('nodemailer');

const app = express();
const PORT =  5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --------------------
// User Schema & Routes
// --------------------

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/Signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// Appointment Schema & Routes
// -----------------------------


const appointmentSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your App Password (NOT your email password)
  },
});

// API to Schedule Appointment and Send Email
app.post("/schedule-appointment", async (req, res) => {
  try {
    const { name, number, date } = req.body;
    if (!name || !number || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to MongoDB
    const newAppointment = new Appointment({ name, number, date });
    await newAppointment.save();

    // Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "suryawanshisoham7@gmail.com", // Receiver email
      subject: "New Appointment Scheduled",
      text: `Appointment Details:\n\nName: ${name}\nNumber: ${number}\nDate: ${date}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Appointment scheduled and email sent!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Fetch Latest Appointment
app.get("/schedule-appointment", async (req, res) => {
  try {
    const latestAppointment = await Appointment.findOne().sort({ createdAt: -1 });

    if (!latestAppointment) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.json(latestAppointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Route to handle form submissions from the React component
const formSchema = new mongoose.Schema({
  no_year_of_experience: String,
  certificate: String,
  degree: String,
  field_practice: String,
  working_hospital: String,
});

const Form = mongoose.model("Form", formSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for image uploads only
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to handle form submission
app.post("/Form", upload.single("certificate"), async (req, res) => {
  try {
    const { no_year_of_experience, degree, field_practice, working_hospital } = req.body;
    const certificate = req.file ? req.file.filename : null;

    if (!no_year_of_experience || !degree || !field_practice || !working_hospital || !certificate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const formData = new Form({
      no_year_of_experience,
      certificate,
      degree,
      field_practice,
      working_hospital,
    });

    await formData.save();
    res.status(200).json({ message: "Form submitted successfully", data: formData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
const form3Schema = new mongoose.Schema({
  date: String,
  timing: String,
  mobile: String,
  town: String,
  district: String,
  state: String,
});

const Form3 = mongoose.model("Form3", form3Schema);

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle form submission
const postSchema = new mongoose.Schema({
  date: String,
  timing: String,
  mobile: String,
  town: String,
  district: String,
  state: String,
});
const Post = mongoose.model("Post", postSchema);

// GET route to fetch the latest post data
app.get("/Form3", async (req, res) => {
  try {
    const postData = await Post.findOne().sort({ _id: -1 }); // Get the latest document
    if (!postData) {
      return res.status(404).json({ message: "No post data found" });
    }
    res.json(postData);
  } catch (error) {
    console.error("Error fetching post data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST route to store new form data
app.post("/Form3", async (req, res) => {
  try {
    const { date, timing, mobile, town, district, state } = req.body;

    // Validate input
    if (!date || !timing || !mobile || !town || !district || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to MongoDB
    const newPost = new Post({ date, timing, mobile, town, district, state });
    await newPost.save();

    res.status(201).json({ message: "Data stored successfully", newPost });
  } catch (error) {
    console.error("Error saving post data:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Model


// API Route to fetch post dat


// Route to handle form submission
app.post("/add-patient", async (req, res) => {
  try {
    const { name, age, weight, nextCheckup, symptoms } = req.body;

    if (!name || !age || !weight || !nextCheckup || !symptoms) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newPatient = new Patient({
      name,
      age,
      weight,
      nextCheckup,
      symptoms,
    });

    await newPatient.save();
    res.status(200).json({ message: "Patient details added successfully", patientId: newPatient._id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
