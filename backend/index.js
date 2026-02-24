require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// ─── Middleware ────────────────────────────────────────────────
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "nextrade_secret_key_2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// ─── Passport ──────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// ─── Auth Middleware ────────────────────────────────────────────
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: "Not authenticated. Please log in." });
};

// ─── Auth Routes ────────────────────────────────────────────────

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new UserModel({ username, email });
    const registeredUser = await UserModel.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Registered successfully!", user: { username: registeredUser.username } });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: info?.message || "Invalid credentials." });
    req.login(user, (loginErr) => {
      if (loginErr) return res.status(500).json({ error: loginErr.message });
      res.json({ success: true, message: "Logged in!", user: { username: user.username } });
    });
  })(req, res, next);
});

// Logout
app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Logged out successfully." });
  });
});

// Check auth status
app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: { username: req.user.username } });
  } else {
    res.json({ loggedIn: false });
  }
});

// ─── Protected API Routes ───────────────────────────────────────

app.get("/allHoldings", isLoggedIn, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", isLoggedIn, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", isLoggedIn, async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post("/newOrder", isLoggedIn, async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  await newOrder.save();
  res.json({ success: true, message: "Order saved!" });
});

// ─── Start Server ───────────────────────────────────────────────
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () => {
      console.log(`NexTrade backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
    process.exit(1);
  });
