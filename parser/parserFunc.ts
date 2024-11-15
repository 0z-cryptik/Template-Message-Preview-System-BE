import { VariablesObj } from "../types/types";

export const parse = (obj: VariablesObj, template: string): string => {
  let responseMessage = template;

  Object.keys(obj).forEach((key) => {
    const keyPattern = new RegExp(`{{${key}}}`, "g");

    responseMessage = responseMessage.replace(
      keyPattern,
      obj[key] // e.g replaces {{name}} with the name user put in the form
    );
  });

  return responseMessage;
};
