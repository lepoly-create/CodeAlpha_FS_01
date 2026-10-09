import crypto from "crypto";

export const generateOpaqueToken = () => {
    const rawToken =
        crypto.randomBytes(32).toString("hex");

    const tokenHash =
        crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");

    return {
        rawToken,
        tokenHash,
    };
};

export const hashOpaqueToken = (
    rawToken: string,
) => {
    return crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
};

export const createExpiration = (
    minutes: number,
) => {
    return new Date(
        Date.now() +
        minutes * 60 * 1000,
    );
};