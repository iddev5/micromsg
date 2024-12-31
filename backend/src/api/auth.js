import { eq } from "drizzle-orm";
import Router from "express";
import db, { usersTable } from "../db/index.js";
import { StatusCodes as status } from "http-status-codes";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const router = Router();

function authorize(req, res, next) {
    if (req.session.user)
        next()
    else
        res.sendStatus(status.UNAUTHORIZED);
}

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.json({
            type: "err",
            err: "incomplete form"
        });

    const user = (await db.select().from(usersTable).where(eq(usersTable.username, username)))[0];
    if (user === undefined)
        return res.json({
            type: "err",
            err: "user not found"
        });

    req.session.regenerate((err) => {
        if (err) {
            res.sendStatus(status.INTERNAL_SERVER_ERROR);
            return err;
        }

        req.session.user = user.id;
        res.sendStatus(status.OK)
    })
});

router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email)
        return res.json({
            type: "err",
            err: "incomplete form"
        });

    const users = await db.select().from(usersTable).where(eq(usersTable.username, username));
    if (users.length > 0)
        return res.json({
            type: "err",
            err: "user exists"
        });

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    await db.insert(usersTable).values({
        username: username,
        salt: salt,
        hash: hash,
        email: email
    });
    
    res.sendStatus(status.OK);
});

export { router, authorize };