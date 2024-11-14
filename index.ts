import express, { Express } from "express";
import { serverResponse } from "./controllers/serverResponse";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/server", serverResponse);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
