const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);

// Routes
const generalRoutes = require("./routes/general");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviews");

app.use("/api", generalRoutes);
app.use("/auth", authRoutes);
app.use("/api", reviewRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
