import express from "express";

const router = express.Router();

import {
    read,
    readById,
    readBySlug,
    create,
    deleteById,
    updateStatus,
    edit,
    updateFlag,
    addImages,
} from "../controllers/product.controller.js";

import upload from "../middleware/upload.js";
import { authorized, protect } from "../middleware/auth.js";


// =====================
// PUBLIC ROUTES
// =====================

// Get all products
router.get("/", read);

// Get product by ID
router.get("/slug/:slug", readBySlug);
router.get("/:id", readById);


// =====================
// ADMIN / SUPERADMIN ROUTES
// =====================

// Create product
router.post(
    "/create",
    protect,
    authorized(["admin", "superAdmin"]),
    upload.single("thumbnail"),
    create
);

// Update product status
router.patch(
    "/status-update/:id",
    protect,
    authorized(["admin", "superAdmin"]),
    updateStatus
);

// Edit product
router.put(
    "/edit/:id",
    protect,
    authorized(["admin", "superAdmin"]),
    upload.single("thumbnail"),
    edit
);

// Delete product
router.delete(
    "/delete/:id",
    protect,
    authorized(["admin", "superAdmin"]),
    deleteById
);

// Update product flag
router.patch(
    "/update-flag/:id",
    protect,
    authorized(["admin", "superAdmin"]),
    updateFlag
);

// Add product images
router.patch(
    "/add-Images/:id",
    protect,
    authorized(["admin", "superAdmin"]),
    upload.array("images", 2),
    addImages
);


export default router;
