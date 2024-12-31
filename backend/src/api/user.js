import { eq } from "drizzle-orm";
import { Router } from "express";
import { StatusCodes as status } from "http-status-codes";
import db, { usersTable } from "../db/index.js";
import { authorize } from "./auth.js";

const router = Router();

router.get("/", authorize, async (req, res) => {
    const user = (await db
        .select({ id: usersTable.id, username: usersTable.username, email: usersTable.email })
        .from(usersTable)
        .limit(1)
        .where(eq(usersTable.id, req.session.user)))[0];

    if (user === undefined) {
        // TODO: report to admin
        return res.sendStatus(status.CONFLICT);
    }

    const { id, username, email } = user;

    res.json({
        id: id,
        username: username,
        email: email,
    });
});

export default router;