import { Request, Response } from "express";
import { VariablesObj } from "../types/types";
import { parse } from "../parser/parserFunc";

// checks if the user didn't submit an empty string
const hasNoEmptyStringValues = (obj: VariablesObj): boolean => {
  return Object.values(obj).every((value) => value !== "");
};

export const serverResponse = async (req: Request, res: Response) => {
  const { template, payloadObj } = req.body;
  console.log(req.body);

  if (!template || !payloadObj || !hasNoEmptyStringValues(payloadObj)) {
    res
      .status(400)
      .json({ ok: false, message: "Template or variable(s) is missing" });
    return;
  }

  try {
    const responseMessage = parse(payloadObj, template);
    res.status(200).json({ ok: true, message: responseMessage });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};
