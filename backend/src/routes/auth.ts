import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!; 

router.post("/register", async (req, res) => {
  console.log("beaners");
  const { email, password, firstName, lastName, roles, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({ 
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        createdBy: process.env.CREATED_BY!,
        roles: roles, // "REFEREE" or "ASSIGNER"
        phone: phone,
      },
    });
    res.json({ message: "User registered", user: { id: user.userId, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.userId, role: user.roles },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;
