"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var dbConnection_1 = __importDefault(require("./frameWorks/mongodb/dbConnection"));
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var profileRoute_1 = __importDefault(require("./routes/profileRoute"));
var adminRoute_1 = __importDefault(require("./routes/adminRoute"));
var conversation_1 = __importDefault(require("./routes/conversation"));
require("reflect-metadata");
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var location_1 = __importDefault(require("./frameWorks/webSocket/location"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dbConnection_1.default)();
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8000;
app.use((0, cookie_parser_1.default)());
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, location_1.default)(io);
// app.use(cors({
//     origin: 'http://localhost:5173',
//     origin: 'http://localhost:5174' // Allow this origin
//   }));
var allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
var corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        }
        else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/sample', function (req, res) {
    return res.json("messaegte");
});
app.use(userRoute_1.default);
app.use(profileRoute_1.default);
app.use(adminRoute_1.default);
app.use(conversation_1.default);
// app.listen(port)
console.log("server start on ".concat(port));
server.listen(port);
exports.default = app;
