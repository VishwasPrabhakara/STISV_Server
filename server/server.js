require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const { updateGoogleSheet } = require("./controllers/googleSheets");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: "smtp.office365.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const app = express();
const PORT = process.env.PORT || 5000;

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });
// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only PDF and Word documents
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',              // local dev
    'https://materials.iisc.ac.in',       // IISc domain
    'https://stisv-1.onrender.com',       // old Render app (if used)
    'https://stisv.vercel.app'            // current frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const verifyAdminToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Not an Admin" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String },
  fullName: { type: String, required: true },
  country: { type: String, required: true },
  affiliation: { type: String, required: true },
  abstractSubmissions: [{
    title: String,
    scope: String,
    abstractCode: String,
    presentingType: String,
    firstAuthorName: String,
    firstAuthorAffiliation: String,
    secondAuthorName: String,
    secondAuthorAffiliation: String,
    otherAuthors: String,
    presentingAuthorName: String,
    presentingAuthorAffiliation: String,
    abstractFile: String,
    mainBody: String,
    status: { type: String, default: "Pending" },
    isFinalized: { type: Boolean, default: false },
    remarks: String,
    timestamp: String,
  }]
});

const User = mongoose.model("User", userSchema);
app.post("/register", async (req, res) => {
  try {
    const { email, password, phone, givenName, familyName, fullName, country, affiliation } = req.body;

    if (!email || !password || !phone || !givenName || !fullName || !country || !affiliation) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      uid: uuidv4(),
      email,
      password: hashedPassword,
      phone,
      givenName,
      familyName,
      fullName,
      country,
      affiliation,
    });

    await newUser.save(); // ✅ Save user first

    // ✅ Send response before long operations like Google Sheets update
    res.status(201).json({ message: "User registered successfully" });

    // ✅ Call `updateGoogleSheet()` only once (after response is sent)
    console.log("🔄 Attempting to update Google Sheets...");
    await updateGoogleSheet(newUser);
    console.log("✅ Google Sheets update was successful!");

    // ✅ Send emails after response is sent
    sendRegistrationEmails(email, givenName, fullName, familyName, phone, country, affiliation);

  } catch (error) {
    console.error("❌ Error registering user:", error);

    if (!res.headersSent) { // ✅ Prevent multiple responses
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
});

// ✅ Function to send emails asynchronously (prevents API slowdowns)
async function sendRegistrationEmails(email, givenName, fullName, familyName, phone, country, affiliation) {
  try {
    // ✅ Send email to user
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to STIS-V 2025 Conference!",
      text: `Dear ${givenName},\n\nThank you for registering for STIS-V 2025.\nYour account has been successfully created.\nWe look forward to your participation.\n\nBest regards,\nSTIS-V 2025 Organizing Team`,
    };
    await transporter.sendMail(mailOptions);
    console.log("✅ Acknowledgement email sent to user:", email);

    // ✅ Send registration details to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "stis.mte@iisc.ac.in",
      subject: "New User Registration - STIS-V 2025",
      text: `A new user has registered:\n\nFull Name: ${fullName}\nGiven Name: ${givenName}\nFamily Name: ${familyName || "N/A"}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\nAffiliation: ${affiliation}\n\nRegards,\nSTIS-V Registration System`,
    };
    await transporter.sendMail(adminMailOptions);
    console.log("✅ Registration details sent to admin");

  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
}




// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, uid: user.uid }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      message: "Login successful", 
      token, 
      uid: user.uid, 
      givenName: user.givenName, // Include first name
      fullName: user.fullName // Include full name if needed
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Reset Password Route
app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful. You can now log in with your new password." });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/submit-abstract", verifyToken, upload.single("abstractFile"), async (req, res) => {
  console.log("🔥 /submit-abstract endpoint hit");

  try {
    const {
      uid,
      title,
      theme,
      presentingType,
      firstAuthorName,
      firstAuthorAffiliation,
      otherAuthors,
      presentingAuthorName,
      presentingAuthorAffiliation,
      mainBody
    } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Abstract file is required" });
    }

    console.log("🧾 Request Body:", req.body);
    console.log("📎 File received:", req.file.originalname);

    const generateAbstractCode = () => {
      return `STIS_${Math.floor(1000 + Math.random() * 9000)}`;
    };

    const abstractCode = generateAbstractCode();

    // Upload to Cloudinary
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "abstracts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const cloudinaryResult = await uploadToCloudinary();

    // Update user's abstractSubmission in DB
    const user = await User.findOne({ uid });

if (!user) {
  return res.status(404).json({ message: "User not found" });
}

// Create new abstract object
const newAbstract = {
  title,
  scope: theme,
  presentingType,
  firstAuthorName,
  firstAuthorAffiliation,
  otherAuthors,
  presentingAuthorName,
  presentingAuthorAffiliation,
  abstractFile: cloudinaryResult.secure_url,
  mainBody,
  abstractCode,
  isFinalized: false,
  status: "Pending",
  timestamp: new Date().toLocaleString()
};

// Push into abstractSubmissions array
user.abstractSubmissions.push(newAbstract);
await user.save();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     // ✅ Update Google Sheets with Abstract details
     console.log("🔄 Attempting to update Google Sheets for Abstract Submission...");
     const latestAbstract = user.abstractSubmissions[user.abstractSubmissions.length - 1];
     
// ✅ Add this log here:
console.log("🧾 Sending to Sheets:", latestAbstract);
await updateGoogleSheet(user, latestAbstract);
     console.log("✅ Google Sheets updated with Abstract details!");
 

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: ' Abstract Submission Received Confirmation - STIS-V 2025 Conference',
      text: `Dear ${user.givenName || user.fullName || "Author"},

We are pleased to confirm that we have received your submission successfully.This is the abstract code for your submission: **${abstractCode}**.
This code will be used for all future corresponence regarding your submission.Please note that all submissions will be carefully reviewed, 
and you can expect to hear from us by 31st May 2025.We truly appreciate your contribution and look forward to your active participation in 
the Conference.

Thanking you and with best regards,

STIS-V 2025 Organizing Team

`,
    };

    console.log("📨 Sending confirmation email to:", user.email);

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Abstract confirmation email sent:", info.response);

      // Send abstract details to admin
const adminAbstractMail = {
  from: process.env.EMAIL_USER,
  to: "stis.mte@iisc.ac.in",
  subject: `New Abstract Submission from ${user.fullName}`,
  text: `A new abstract has been submitted.
Abstract Code: ${abstractCode}
Full Name: ${user.fullName}
Email: ${user.email}
Phone: ${user.phone}
Affiliation: ${user.affiliation}
Title: ${title}
Scope/Theme: ${theme}
Presenting Type: ${presentingType}
First Author: ${firstAuthorName} (${firstAuthorAffiliation})
Other Authors: ${otherAuthors}
Presenting Author: ${presentingAuthorName} (${presentingAuthorAffiliation})
Abstract Link: ${cloudinaryResult.secure_url}

Main Body:
${mainBody}

Regards,  
STIS-V 2025 Submission System`
};

try {
  await transporter.sendMail(adminAbstractMail);
  console.log("✅ Abstract details sent to stis.mte@iisc.ac.in");
} catch (error) {
  console.error("❌ Error sending abstract info to admin:", error);
}


    } catch (error) {
      console.error("❌ Error sending abstract confirmation email:", error);
    }

    res.status(200).json({
      message: "Abstract submitted successfully!",
      abstract: latestAbstract

    });

  } catch (error) {
    console.error("Error submitting abstract:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/submit-query", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // ✅ Send email to Conference Secretariat
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "stis.mte@iisc.ac.in", // Admin Email
      subject: `New Query from ${name}`,
      text: `A new query has been submitted:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nPlease respond to the user soon.`,
    };

    await transporter.sendMail(adminMailOptions);
    console.log("✅ Query email sent to admin");

    // ✅ Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Query Received - STIS-V 2025",
      text: `Dear ${name},\n\nThank you for reaching out to us!\n\nWe have received your query and will get back to you shortly.\n\nBest regards,\nSTIS-V 2025 Team`,
    };

    await transporter.sendMail(userMailOptions);
    console.log("✅ Confirmation email sent to user:", email);

    res.status(200).json({ message: "Query submitted successfully!" });

  } catch (error) {
    console.error("❌ Error submitting query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get-all-abstracts", async (req, res) => {
  try {
    const abstracts = await User.find({}, "uid fullName email abstractSubmission");
    res.json({ abstracts });
  } catch (error) {
    console.error("Error fetching abstracts:", error);
    res.status(500).json({ message: "Server error" });
  }
});



app.put("/update-abstract", verifyToken, upload.single("abstractFile"), async (req, res) => {
  try {
    const { uid, abstractCode } = req.body;

    if (!uid) return res.status(400).json({ message: "User ID is required" });

    console.log(`🔹 Updating abstract for UID: ${uid}`);

    let updateData = {};
    let googleSheetUpdateRequired = false; // ✅ Prevent unnecessary Google Sheets updates

    // ✅ Update Only Provided Fields
    ["title", "scope", "presentingType", "firstAuthorName", "firstAuthorAffiliation",
     "otherAuthors", "presentingAuthorName", "presentingAuthorAffiliation", "mainBody"]
    .forEach(field => {
      if (req.body[field]) {
        updateData[`abstractSubmission.${field}`] = req.body[field];
        googleSheetUpdateRequired = true;
      }
    });

    // ✅ Handle File Upload
    if (req.file) {
      console.log("📎 Uploading new abstract file...");

      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "abstracts" },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          stream.end(req.file.buffer);
        });
      };

      const cloudinaryResult = await uploadToCloudinary();
      updateData["abstractSubmission.abstractFile"] = cloudinaryResult.secure_url;
      console.log(`✅ New File Uploaded: ${cloudinaryResult.secure_url}`);
      googleSheetUpdateRequired = true;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update." });
    }

    // ✅ Update MongoDB


if (!abstractCode) {
  return res.status(400).json({ message: "Abstract code is required for update." });
}

const user = await User.findOne({ uid });
if (!user) return res.status(404).json({ message: "User not found" });

const abstractIndex = user.abstractSubmissions.findIndex(abs => abs.abstractCode === abstractCode);
if (abstractIndex === -1) {
  return res.status(404).json({ message: "Abstract not found for given code." });
}

// Update fields
Object.entries(updateData).forEach(([key, value]) => {
  const field = key.replace("abstractSubmission.", "");
  user.abstractSubmissions[abstractIndex][field] = value;
});

// Save updated abstract
await user.save();

console.log("✅ Abstract updated successfully in MongoDB!");

// ✅ Update Google Sheets Only If Data Changed
if (googleSheetUpdateRequired) {
  console.log("🔄 Updating Google Sheets...");
  const updatedAbstract = user.abstractSubmissions[abstractIndex];
await updateGoogleSheet(user, updatedAbstract);
  console.log("✅ Google Sheets updated successfully!");
}

res.json({ message: "Abstract updated successfully", abstract: user.abstractSubmissions[abstractIndex] });

// ✅ Send update confirmation email to user
const updateMailOptions = {
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: 'Abstract Update Confirmation - STIS-V 2025',
  text: `Dear ${user.givenName || user.fullName || "Participant"},

Your abstract has been successfully updated in the STIS-V 2025 system.

You can download your updated abstract from the following link:
${user.abstractSubmissions[abstractIndex].abstractFile}

If you did not request this update or have any concerns, please contact the organizing team at stis.mte@iisc.ac.in.

Best regards,  
STIS-V 2025 Organizing Committee`,
};


try {
  await transporter.sendMail(updateMailOptions);
  console.log("✅ Abstract update confirmation sent to user:", user.email);
} catch (emailErr) {
  console.error("❌ Failed to send user abstract update email:", emailErr.message);
}

// ✅ Also notify admin
const adminUpdateMail = {
  from: process.env.EMAIL_USER,
  to: "stis.mte@iisc.ac.in",
  subject: `Abstract Updated by ${user.fullName}`,
  text: `The following participant has updated their abstract:

Name: ${user.fullName}
Email: ${user.email}
Abstract Code: ${user.abstractSubmissions[abstractIndex].abstractCode}
Abstract Title: ${user.abstractSubmissions[abstractIndex].title}

Updated Abstract Link:
${user.abstractSubmissions[abstractIndex].abstractFile}



Please verify and review the submission in the admin panel.

Regards,  
STIS-V Submission System`,
};

try {
  await transporter.sendMail(adminUpdateMail);
  console.log("✅ Abstract update notification sent to admin.");
} catch (adminErr) {
  console.error("❌ Failed to send admin update email:", adminErr.message);
}


  } catch (error) {
    console.error("❌ Error updating abstract:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

// Admin Login Endpoint
app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/admin/update-abstract-status", verifyAdminToken, async (req, res) => {
  try {
    const { uid, abstractCode, status, remarks } = req.body;

    if (!uid || !abstractCode || !status) {
      return res.status(400).json({ message: "UID, Abstract Code, and Status are required." });
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const abstractIndex = user.abstractSubmissions.findIndex(abs => abs.abstractCode === abstractCode);
    if (abstractIndex === -1) {
      return res.status(404).json({ message: "Abstract not found for given code." });
    }

    user.abstractSubmissions[abstractIndex].status = status;
    user.abstractSubmissions[abstractIndex].remarks = remarks || "";
    await user.save();

    // ✅ Compose email message
    let emailText = `Dear ${user.fullName},\n\nYour abstract submission (${abstractCode}) has been **${status}**.\n`;

    if (status === "Rejected" && remarks) {
      emailText += `\nRemarks from reviewers:\n"${remarks}"\n`;
    }

    emailText += `\nThank you for your participation!\n\nBest Regards,\nSTIS-V 2025 Team`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Abstract Submission Status - STIS-V 2025`,
      text: emailText,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${user.email} for abstract code ${abstractCode} status update: ${status}`);

    res.json({ message: `Abstract ${status} successfully`, user });

  } catch (error) {
    console.error("❌ Error updating abstract status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});





app.post("/finalize-abstract", verifyToken, async (req, res) => {
  try {
    const { uid, abstractCode } = req.body;

    if (!uid || !abstractCode) {
      return res.status(400).json({ message: "User ID and Abstract Code are required." });
    }

    console.log(`✅ Finalizing abstract for UID: ${uid}, Code: ${abstractCode}`);

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const abstractIndex = user.abstractSubmissions.findIndex(abs => abs.abstractCode === abstractCode);
    if (abstractIndex === -1) {
      return res.status(404).json({ message: "Abstract not found for given code." });
    }

    user.abstractSubmissions[abstractIndex].isFinalized = true;
    await user.save();

    // ✅ Update Google Sheets
    console.log("🔄 Updating Google Sheets...");
    const updatedAbstract = user.abstractSubmissions[abstractIndex];
await updateGoogleSheet(user, updatedAbstract);
    console.log("✅ Google Sheets updated successfully!");

    res.status(200).json({
      message: "Abstract finalized successfully",
      abstract: user.abstractSubmissions[abstractIndex],
    });

  } catch (error) {
    console.error("❌ Error finalizing abstract:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.delete("/delete-abstract-file", verifyToken, async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findOne({ uid });
    if (!user || !user.abstractSubmission.abstractFile) {
      return res.status(404).json({ message: "Abstract file not found" });
    }

    const publicId = user.abstractSubmission.abstractFile.split("/").pop().split(".")[0];
    cloudinary.uploader.destroy(publicId, async (error, result) => {
      if (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return res.status(500).json({ message: "Error deleting file" });
      }
      user.abstractSubmission.abstractFile = null;
      await user.save();
      res.json({ message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get User Abstract
app.get("/get-abstract/:uid", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ abstracts: user.abstractSubmissions });  // ✅ return abstracts (plural)
  } catch (error) {
    console.error("Error fetching abstract:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// Delete Abstract File
app.delete("/delete-abstract-file/:uid", verifyToken, async (req, res) => {
  try {
    const { abstractCode } = req.body;
    const abstract = user.abstractSubmissions.find(abs => abs.abstractCode === abstractCode);
      if (!abstract || !abstract.abstractFile) {
        return res.status(404).json({ message: "Abstract file not found" });
      }


    // Delete file from filesystem
    fs.unlink(user.abstractSubmission.abstractFile, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }

      // Update database to remove file reference
      user.abstractSubmission.abstractFile = null;
      await user.save();
      res.json({ message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting abstract file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: error.message });
  }
  next(error);
});

// ✅ FIX: Get all abstracts submitted by a user
app.get("/get-abstracts-by-user/:uid", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ abstracts: user.abstractSubmissions || [] });
  } catch (error) {
    console.error("❌ Error fetching user abstracts:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get abstract by UID + Abstract Code
app.get("/get-abstract-by-code/:uid/:code", verifyToken, async (req, res) => {
  const { uid, code } = req.params;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const abstract = user.abstractSubmissions.find(abs => abs.abstractCode === code);
    if (!abstract) return res.status(404).json({ message: "Abstract not found" });

    res.status(200).json({ abstract });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));