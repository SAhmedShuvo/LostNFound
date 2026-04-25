require("dotenv").config();   // MUST be first

const express = require("express");
const connectDB = require("./config/db");
const applyMiddleware= require("./middlewares/app.middleware");
const userRouter= require("./routes/user.router");
const reportRouter = require("./routes/report.router");
const itemRouter = require("./routes/item.router");
const adminRouter= require("./routes/admin.router");
const app = express();
applyMiddleware(app);

// Serve static files from uploads directory
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to lost N found app",
  });
});

//users
app.use("/user",userRouter);
app.use("/report", reportRouter);
app.use("/item", itemRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
