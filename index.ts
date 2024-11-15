import express, { Express } from "express";
import { serverResponse } from "./controllers/serverResponse";
import cors from "cors";
import { config } from "dotenv";

config();

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

// cors setup for preflight
app.options("/server", cors());

app.use(express.json());

app.post("/server", serverResponse);

app.get("/server", (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
