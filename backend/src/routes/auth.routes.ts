import { Router } from "express";
import { register, login } from "../controllers/auth.controllers";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();


router.post("/register", register);
router.post("/login", login);

router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.json({

            success: true,

            user: req.user

        });

    }
);

router.get(
    "/admin-test",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Bienvenue administrateur",
            user: req.user
        });
    }
);

router.get(
    "/customer-test",
    authMiddleware,
    authorizeRoles("customer"),
    (req, res) => {
        res.json({
            success: true,
            message: "Bienvenue client",
            user: req.user
        });
    }
);

export default router;