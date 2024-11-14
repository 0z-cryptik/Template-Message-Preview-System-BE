import { Request, Response } from "express";

export const serverResponse = async (req: Request, res: Response) => {
    const { template, payloadObj } = req.body;
  
    if (!template || !payloadObj) {
      res
        .status(400)
        .json({ ok: false, message: "Template or variable(s) is missing" });
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
  }