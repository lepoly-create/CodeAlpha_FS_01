import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import swaggerUi from "swagger-ui-express";
import favoriteRoutes from "./routes/favorite.routes";

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "MarketElectro API Documentation",
        version: "1.0.0"
    }
};

const app = express();

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
        customSiteTitle: "MarketElectro API Documentation"
    })
);

app.use(cors());

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {

    res.json({
        message: "API fonctionnelle"
    });

});


export default app;