import { eq } from "drizzle-orm";
import { Router } from "express";
import { StatusCodes as status } from "http-status-codes";
import db, { likesTable, postAnalyticsTable } from "../db/index.js";
import { stringifySafe } from "../utils.js";
import { authorize } from "./auth.js";

const router = Router();

router.get("/:postId", authorize, async (req, res) => {
    // TODO: select only user id
    const likes = await db.select().from(likesTable).limit(50).where(eq(likesTable.post, req.params.postId));
    res.send(stringifySafe(likes));
});

router.get("/from/:userId", authorize, async (req, res) => {
    // TODO: select only post id
    const likes = await db.select().from(likesTable).limit(50).where(eq(likesTable.user, req.params.userId));
    res.send(stringifySafe(likes));
});

// TODO: dislike system
router.post("/:postId", authorize, async (req, res) => {
    // Check if the user has already liked the post
    const all_likes = await db.select().from(likesTable).limit(1).where(eq(likesTable.post, req.params.postId)).where(eq(likesTable.user, req.session.user));
    const like = all_likes[0];

    // TODO: start transaction
    if (like === undefined) {
        await db.insert(likesTable).values({
            post: req.params.postId,
            user: req.session.user
        });
    } else {
        await db.delete(likesTable).where(eq(likesTable.post, req.params.postId))
            .where(eq(likesTable.user, req.session.user));
    }

    const all_analytics = await db.select().from(postAnalyticsTable).limit(1).where(eq(postAnalyticsTable.post, req.params.postId));
    const analytics = all_analytics[0];

    if (analytics === undefined) {
        await db.insert(postAnalyticsTable).values({
            post: req.params.postId,
            likes_count: 1
        });
    } else {
        await db.update(postAnalyticsTable).set({
            likes_count: analytics.likes_count + (like ? -1 : 1),
        }).where(eq(postAnalyticsTable.post, req.params.postId));
    }

    // end transaction here

    res.sendStatus(status.OK)
});

export default router;