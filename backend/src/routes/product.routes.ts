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

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    create
);

router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    update
);
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    remove
);


export default router;