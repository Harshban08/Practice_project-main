const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const multer = require('multer');
const File = require('./model/File'); // Import the File model

dotenv.config();
connectDb(); // Connect to the database

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Working');
});

// Configure Multer storage with unique filenames
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage: storage });

// Home route to render the page
app.get("/home", async (req, res) => {
    // Fetch all uploaded files from MongoDB
    const files = await File.find();
    res.render("home", {
        username: "Harsh",
        users: [{ name: "John Doe", age: 30 }, { name: "Jane Smith", age: 25 }],
        files: files 
    });
});

// Route to handle file upload and save metadata in MongoDB
app.post('/profile', upload.single('avatar'), async (req, res) => {
    try {
        // Create a new file record in MongoDB
        const fileData = new File({
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
        });

        await fileData.save(); // Save metadata to MongoDB
        console.log("File metadata saved:", fileData);

        return res.redirect("/home");
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file.");
    }
});



// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});