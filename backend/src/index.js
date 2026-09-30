import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./confing/db.js";
import categoryRouter from "./routers/category.Router.js";
import roomRouter from "./routers/room.Router.js";
import productRouter from "./routers/product.Router.js";
import userRouter from "./routers/user.Router.js";
import cartRouter from "./routers/cart.router.js";
import orderRouter from "./routers/order.router.js";

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.status(200).send("Backend is Running...");
});

// API Routes
app.use("/api/category", categoryRouter);
app.use("/api/room-type", roomRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err?.message || err);

  res.status(err?.http_code || 500).json({
    success: false,
    message: err?.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error.message);
    process.exit(1);
  }
};

startServer();
