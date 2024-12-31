import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import crypto from "crypto";
import { router as auth }  from "./api/auth.js";
import posts from "./api/posts.js";
import likes from "./api/likes.js";
import user from "./api/user.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: crypto.randomBytes(64),
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60,
        },
    })
);

app.use("/auth", auth);
app.use("/posts", posts);
app.use("/likes", likes);
app.use("/user", user);

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});