import express from "express";
import { hire } from "../controllers/hire";
const router = express.Router();

router.get("/hire", hire);

module.exports = router;
