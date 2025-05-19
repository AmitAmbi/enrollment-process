// server.js or app.js
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
// const connectDB = require("./config/db");
const offerLetterRoutes = require('./routes/offerLetterRoutes');
const  enrollmentRoutes= require('./routes/enrollmentRoutes')
const db = require("./config/db"); // ✅ pool imported
const socketIO = require("socket.io"); // ✅ import socket.io
const path = require('path');
const scheduleRoutes = require('./routes/scheduleRoutes'); // Add this line


require("dotenv").config();
const http = require("http"); // ✅ for creating HTTP server

const app = express();
app.use(express.json()); // ⬅️ This is required
// Optional: Test DB connection
(async () => {
    try {
      const [rows] = await db.query("SELECT 1"); // simple test query
      console.log("✅ MySQL connected");
    } catch (error) {
      console.error("❌ DB connection failed:", error);
      process.exit(1); // exit if connection fails
    }
  })();
// Session setup if needed
app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized: true,
}));

const server = http.createServer(app); // ✅ wrap app in http server
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// ✅ CORRECT ORDER
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/offer', offerLetterRoutes);

// ✅ Register passport strategies BEFORE routes
require("./config/passport"); // Make sure this file contains the GoogleStrategy registration

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));





app.use('/pdfs', express.static(path.join(__dirname, 'public/pdfs')));
app.use('/api/offer', offerLetterRoutes);

// app.use('/api/meeting', meetingRoutes);

app.get("/api/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: req.user,
    });
  } else {
    return res.status(401).json({
      authenticated: false,
    });
  }
});


app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));


// ✅ Add this middleware function BEFORE any protected route
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); // Or you can send a 401 JSON response
  }
  
  // ✅ Protect this route
  app.get("/", isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.name}`);
  });
  // Routes
  app.use("/api", enrollmentRoutes);
  

  // require("./cronJobs/approveEnrollments");
// Start the server

app.use('/api/schedule', scheduleRoutes);
app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
