import { customAlphabet } from "nanoid";

export const generateUniqueString = ({
  signature = "123456789asdfgh",
  length = 8,
}) => {
  const nanoid = customAlphabet(signature, length);
  return nanoid();
};





