import Product from "../models/Product";

interface CreateProductData {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

export const createProduct = async (
    data: CreateProductData
) => {

    const existingProduct = await Product.findOne({
        name: data.name
    });

    if (existingProduct) {
        throw new Error("Ce produit existe déjà");
    }

    const product = await Product.create(data);

    return product;
};

export const getAllProducts = async () => {

    return await Product.find({
        isActive: true
    }).sort({
        createdAt: -1
    });

};

export const getProductById = async (
    id: string
) => {

    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Produit introuvable");
    }

    return product;

};

export const updateProduct = async (
    id: string,
    data: Partial<CreateProductData>
) => {

    const product = await Product.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        throw new Error("Produit introuvable");
    }

    return product;

};

export const deleteProduct = async (
    id: string
) => {

    const product = await Product.findByIdAndUpdate(
        id,
        {
            isActive: false
        },
        {
            new: true
        }
    );

    if (!product) {
        throw new Error("Produit introuvable");
    }

    return product;

};

