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
const allowedOrigins = new Set(
  [
    "http://localhost:3000",
    "https://nestro2.vercel.app",
    "https://nestro-gules.vercel.app",
    "https://nestro-i4l1.vercel.app",
    ...(process.env.FRONTEND_URL || "").split(","),
  ]
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean)
);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header (health checks, curl, etc.).
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
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
