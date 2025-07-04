"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./frameWorks/mongodb/dbConnection"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const conversation_1 = __importDefault(require("./routes/conversation"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const location_1 = __importDefault(require("./frameWorks/webSocket/location"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dbConnection_1.default)();
const errorHandle_1 = __importDefault(require("./errorHandle"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cookie_parser_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, location_1.default)(io);
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://siof.site",
    "https://near-by-chat-frontend-six.vercel.app",
    "https://anonymous10.cloud",
    "https://near-by-chat-frontend-livid.vercel.app",
    "https://near-by-chat-admin-side.vercel.app",
    "https://near-by-chat-neon.vercel.app"
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        }
        else {
            callback(new Error("Not allowed by CORS")); // Block the request
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/sample", (req, res) => {
    return res.json("messaegte");
});
app.use(userRoute_1.default);
app.use(profileRoute_1.default);
app.use(adminRoute_1.default);
app.use(conversation_1.default);
app.use(errorHandle_1.default);
console.log(`server start on ${port}`);
server.listen(port);
exports.default = app;
