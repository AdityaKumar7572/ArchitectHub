require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { BrevoClient } = require("@getbrevo/brevo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ArchitectHub")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Model
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  projectType: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

// API

app.get("/", (req, res) => {
  res.send(__dirname + "/index.html");
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      projectType,
      message,
    });

    await contact.save();

    // =========================
    // Send Email
    // =========================
    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "ArchitectHub",
        email: "adityaramkumar10@gmail.com",
      },

      to: [
        {
          email: "sumanprajapati12.123@gmail.com",
          name: "ArchitectHub",
        },
      ],

      replyTo: {
        email: email,
        name: name,
      },

      subject: `🔔 New ArchitectHub Enquiry from ${name}`,

      htmlContent: `
    <h2>🔔 New ArchitectHub Enquiry</h2>

    <hr>

    <h3>Customer Details</h3>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

    <p><strong>Project Type:</strong> ${projectType || "Not provided"}</p>

    <h3>Message</h3>

    <p>${message}</p>

    <hr>

    <p>
      This enquiry was submitted through the ArchitectHub website.
    </p>
  `,
    });
    // =========================
    // Response
    // =========================

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
    });
  } catch (error) {
    console.error("ENQUIRY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save enquiry",
    });
  }
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
