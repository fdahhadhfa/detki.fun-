"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors"));
var axios_1 = __importDefault(require("axios"));
var mongodb_1 = require("mongodb");
var helmet_1 = __importDefault(require("helmet"));
var getIpData_1 = __importDefault(require("./utils/getIpData"));
var config_1 = require("./config");
var mongoDbUrl = config_1.config.db.uri || "";
var mongoDbName = "site";
var mongoClient = new mongodb_1.MongoClient(mongoDbUrl);
var mongoDb;
function connectDb() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoClient.connect()];
                case 1:
                    _a.sent();
                    console.log("MongoDB succesfully connected");
                    mongoDb = mongoClient.db(mongoDbName);
                    return [2 /*return*/];
            }
        });
    });
}
connectDb();
var tgApi = axios_1["default"].create({ baseURL: config_1.config.telegram.token });
var app = (0, express_1["default"])();
var router = (0, express_1.Router)();
router.get("/getProductCategories", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoDb
                        .collection("categories")
                        .find({})
                        .toArray()];
            case 1:
                categories = _a.sent();
                res.json(categories);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/getWholesaleDiscounts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var discounts, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoDb.collection("discounts").find({}).toArray()];
            case 1:
                discounts = _a.sent();
                res.json(discounts);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/getProducts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, productsDict, _i, products_1, product, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoDb.collection("products").find({}).toArray()];
            case 1:
                products = _a.sent();
                productsDict = {};
                for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                    product = products_1[_i];
                    productsDict[product.id] = product;
                }
                res.json(productsDict);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                console.log(e_3);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/getProductSets", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productSets, productSetsDict, _i, productSets_1, product, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoDb
                        .collection("productSets")
                        .find({})
                        .toArray()];
            case 1:
                productSets = _a.sent();
                productSetsDict = {};
                for (_i = 0, productSets_1 = productSets; _i < productSets_1.length; _i++) {
                    product = productSets_1[_i];
                    productSetsDict[product.id] = product;
                }
                res.json(productSetsDict);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/getReviews", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviews, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoDb.collection("reviews").find({}).toArray()];
            case 1:
                reviews = _a.sent();
                res.json(reviews);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                console.log(e_5);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ip, country, countryEmoji, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = (0, getIpData_1["default"])(req), ip = _a.ip, country = _a.country, countryEmoji = _a.countryEmoji;
                return [4 /*yield*/, tgApi.post("/sendMessage", {
                        chat_id: config_1.config.telegram.adminId,
                        text: "\uD83E\uDDA3 \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u043E\u0432\u044B\u0439 \u043C\u0430\u043C\u043E\u043D\u0442:\n\uD83C\uDF0E IP: <code>".concat(ip, "</code> (").concat(countryEmoji, " - ").concat(country, ")"),
                        parse_mode: "HTML"
                    })];
            case 1:
                _b.sent();
                res.json();
                return [3 /*break*/, 3];
            case 2:
                e_6 = _b.sent();
                console.log(e_6);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/new_payment", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ip, country, countryEmoji, productIds, products, productsDict, _i, products_2, product, productsNames, i, e_7, e_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = (0, getIpData_1["default"])(req), ip = _a.ip, country = _a.country, countryEmoji = _a.countryEmoji;
                console.log(req.body);
                productIds = req.body.productIds.split(":");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, mongoDb.collection("products").find({}).toArray()];
            case 2:
                products = _b.sent();
                productsDict = {};
                for (_i = 0, products_2 = products; _i < products_2.length; _i++) {
                    product = products_2[_i];
                    productsDict[product.id] = product;
                }
                productsNames = [];
                for (i = 0; i < productIds.length; i++) {
                    productsNames.push(productsDict[productIds[i]].name);
                }
                return [4 /*yield*/, tgApi.post("/sendMessage", {
                        chat_id: config_1.config.telegram.adminId,
                        text: "\uD83E\uDDA3 \u041C\u0430\u043C\u043E\u043D\u0442 \uD83C\uDF0E IP: <code>".concat(ip, "</code> (").concat(countryEmoji, " - ").concat(country, "), \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043A\u0443\u043F\u0438\u0442: ").concat(productsNames.join(", "), " (<code>").concat(req.body.price, "</code>\u20BD)"),
                        parse_mode: "HTML"
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                e_7 = _b.sent();
                console.log(e_7);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5:
                res.json();
                return [3 /*break*/, 7];
            case 6:
                e_8 = _b.sent();
                console.log(e_8);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.post("/new_deposit", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ip, country, countryEmoji, e_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = (0, getIpData_1["default"])(req), ip = _a.ip, country = _a.country, countryEmoji = _a.countryEmoji;
                return [4 /*yield*/, tgApi.post("/sendMessage", {
                        chat_id: config_1.config.telegram.adminId,
                        text: "\uD83D\uDCB8 \u041C\u0430\u043C\u043E\u043D\u0442 \uD83C\uDF0E IP: <code>".concat(ip, "</code> (").concat(countryEmoji, " - ").concat(country, ") \u0432\u0431\u0438\u043B \u043A\u0430\u0440\u0442\u0443: \uD83D\uDCB0 \u0421\u0443\u043C\u043C\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430: <code>").concat(req.body.amount, "</code>\u20BD"),
                        parse_mode: "HTML"
                    })];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                e_9 = _b.sent();
                console.log(e_9);
                res.status(500).json({ msg: "Internal Server Error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var DOMAINS = ["http://localhost:5173", "https://detki.fun"];
app.use(express_1["default"].json());
app.use((0, cors_1["default"])({ origin: DOMAINS, credentials: true }));
app.use((0, helmet_1["default"])());
app.use("/api", router);
app.use("/static", express_1["default"].static("public"));
app.listen(process.env.PORT || 8080, function () { return console.log("App is running"); });
