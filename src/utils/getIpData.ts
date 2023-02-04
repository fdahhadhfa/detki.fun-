import { Request } from "express";
import { lookup } from "geoip-lite";
import countryCodeEmoji from "country-code-emoji";

export default (req: Request) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ipData = lookup(ip);
    const country = ipData && ipData.country;
    const countryEmoji = country && countryCodeEmoji(country);

    return {
      ip: ip || "Unknown",
      country: country || "Unknown",
      countryEmoji: countryEmoji || "🏳️",
    };
  } catch {
    return { ip: "Unknown", country: "Unknown", countryEmoji: "🏳️" };
  }
};
