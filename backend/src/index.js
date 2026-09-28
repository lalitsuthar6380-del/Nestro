import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./confing/db.js";

import categoryRouter from "./routers/category.Router.js";
import roomRouter from "./routers/room.Router.js";
import productRouter from "./routers/product.Router.js";
import userRouter from "./routers/user.Router.js";
import cartRouter from "./routers/cart.router.js";
import orderRouter from "./routers/order.router.js";

dotenv.config();

const app = express();

// =========================
// DATABASE
// =========================
connectDB();

// =========================
// MIDDLEWARE
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.status(200).send("Backend is Running...");
});

// =========================
// API ROUTES
// =========================
app.use("/api/category", categoryRouter);
app.use("/api/room-type", roomRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// =========================
// GLOBAL ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err?.message || err);

  res.status(err?.http_code || 500).json({
    success: false,
    message: err?.message || "Internal server error",
  });
});

// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on Port ${PORT}`);
});