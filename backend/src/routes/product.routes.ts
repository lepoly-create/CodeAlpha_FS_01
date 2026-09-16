import { Router } from "express";

import {
    create,
    getAll,
    getOne,
    update,
    remove
} from "../controllers/product.controllers";

import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import {
    createProductSchema,
    productIdSchema,
    updateProductSchema,
} from "../schemas/product.schemas";

const router = Router();

router.get("/", getAll);
router.get("/:id", validate(productIdSchema), getOne);

router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    validate(createProductSchema),
    create
);

router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    validate(updateProductSchema),
    update
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    validate(productIdSchema),
    remove
);

export default router;