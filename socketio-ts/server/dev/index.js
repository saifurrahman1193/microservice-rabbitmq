"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.get('/', (req, res) => {
    res.json({ message: 'Hello saifur' });
});
app.listen(process.env.APP_PORT, () => {
    console.log('Server is listening on port ' + process.env.APP_PORT);
});
