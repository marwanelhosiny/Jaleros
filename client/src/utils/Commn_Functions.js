import { customAlphabet } from "nanoid";

export const generateUniqueString = ({
  signature = "123456789asdfgh",
  length = 8,
}) => {
  const nanoid = customAlphabet(signature, length);
  return nanoid();
};

export const getUser = () => {
  const { user } = localStorage;
  if (user) {
    const data = JSON.parse(localStorage?.user);
    return data;
  } else {
    return "No Data";
  }
};
