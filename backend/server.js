import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { OAuth2Client } from "google-auth-library";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

app.use(
  cors({
    origin: ['https://my-taskmanager-app.vercel.app',"http://localhost:3000"], // your frontend origin
    credentials: true, // allow cookies to be sent
  })
);

// Google client ID from Google Developer Console
const CLIENT_ID = "GOOGLE_CLIENT_ID";
const client = new OAuth2Client(CLIENT_ID);

app.post("/api/auth/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Verify the token with the Google Client ID
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Here you can create the user in your database or check if the user exists
    // For now, let's return the user data
    res.json({ name, email, picture });
  } catch (error) {
    res.status(400).send("Invalid token");
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// API routes (auth, tasks)

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
