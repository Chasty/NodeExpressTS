"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const PORT = process.env.PORT || 4300;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(routes_1.default);
const MONGO_USER = process.env.MONGO_USER || "Chasty";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "Chascos0";
const MONGO_DB = process.env.MONGO_DB || "mibd";
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.zchzm.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch(error => {
    throw error;
});
