import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const swaggerDocument = yaml.load(
    fs.readFileSync(
        path.join(__dirname, "../../dist/openapi.bundle.yaml"),
        "utf8"
    )
);

export default swaggerDocument;