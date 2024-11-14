import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/server", async (req: Request, res: Response) => {
  const { template, payloadObj } = req.body;

  if (!template || !payloadObj) {
    res
      .status(400)
      .json({ ok: false, message: "Template or variable is missing" });
    return;
  }

  try {
    let responseMessage: string = template;

    Object.keys(payloadObj).forEach((key) => {
      const keyPattern = new RegExp(`{{${key}}}`, "g");

      responseMessage = responseMessage.replace(
        keyPattern,
        payloadObj[key] // e.g replaces {{name}} with the name user put in the form
      );
    });

    res.status(200).json({ ok: true, message: responseMessage });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
});

app.listen(8080, () => {
  console.log("listening on 8080");
});
