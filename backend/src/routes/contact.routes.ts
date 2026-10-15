import { Router } from "express";
import { submitContactMessage } from "../controllers/contact.controllers";
import { validate } from "../middleware/validate.middleware";
import { contactSchema } from "../schemas/contact.schemas";

const router = Router();

router.post("/", validate(contactSchema), submitContactMessage);

export default router;
