"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var geoip_lite_1 = require("geoip-lite");
var country_code_emoji_1 = __importDefault(require("country-code-emoji"));
exports["default"] = (function (req) {
    try {
        var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        var ipData = (0, geoip_lite_1.lookup)(ip);
        var country = ipData && ipData.country;
        var countryEmoji = country && (0, country_code_emoji_1["default"])(country);
        return {
            ip: ip || "Unknown",
            country: country || "Unknown",
            countryEmoji: countryEmoji || "🏳️"
        };
    }
    catch (_a) {
        return { ip: "Unknown", country: "Unknown", countryEmoji: "🏳️" };
    }
});
