import { eq } from "drizzle-orm";
import { Router } from "express";
import { StatusCodes as status } from "http-status-codes";
import db, { postAnalyticsTable, postsTable } from "../db/index.js";
import { authorize } from "./auth.js";
import { stringifySafe } from "../utils.js";

const router = Router();

router.get("/", authorize, async (req, res) => {
    const posts = await db.select().from(postsTable).limit(50);
    res.send(stringifySafe(posts));
});

router.get("/:postId/analytics", authorize, async (req, res) => {
    const all_analytics = await db.select().from(postAnalyticsTable).limit(1).where(eq(postAnalyticsTable.post, req.params.postId));
    const analytics = all_analytics[0];
    if (analytics === undefined) {
        return res.sendStatus(status.NOT_FOUND);
    }

    res.json({
        likes_count: analytics.likes_count
    });
});

router.get("/:userId", authorize, async (req, res) => {
    const posts = await db.select().from(postsTable).limit(50).where(eq(postsTable.user, req.params.userId));
    res.send(stringifySafe(posts));
});

router.post("/", authorize, async (req, res) => {
    const { text } = req.body;

    if (!text)
        return res.send({
            type: "err",
            err: "incomplete form"
        });

    const post = await db.insert(postsTable).values({
        text: text,
        user: req.session.user
    });

    res.sendStatus(status.OK);
});

export default router;