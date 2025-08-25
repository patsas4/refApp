import express from "express";
import authRoutes from "./routes/auth";
import { authenticate } from "./middleware/auth";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.path);
  console.log("body", req.body);
  next();
});

// Public routes
app.use("/auth", authRoutes);

// Require auth for everything else
app.use(authenticate);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
