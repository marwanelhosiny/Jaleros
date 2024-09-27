import { customAlphabet } from "nanoid";

export const generateUniqueString = ({
  signature = "123456789asdfgh",
  length = 8,
}) => {
  const nanoid = customAlphabet(signature, length);
  return `jemy${nanoid()}`;
};

export const Categories = [
  {
    name: "Front End Developer",
    value: "Front_End_Developer",
  },
  {
    name: "Back End Developer",
    value: "Back_End_Developer",
  },
  {
    name: "Editor",
    value: "Editor",
  },
  {
    name: "Cars",
    value: "Cars",
  },
  {
    name: "Restaurants",
    value: "Restaurants",
  },
  {
    name: "Food",
    value: "Food",
  },
  {
    name: "Communication",
    value: "communication",
  },
  {
    name: "Network",
    value: "Network",
  },
  {
    name: "Content Creator",
    value: "Content_Creator",
  },
  {
    name: "Coding",
    value: "Coding",
  },
  {
    name: "UI/UX",
    value: "UI/UX",
  },
  {
    name: "Photography",
    value: "Photography",
  },
  {
    name: "Video Editors",
    value: "Video_Editors",
  },
];


export const getUserData = ()=> {
  const {user} = localStorage
  return user ? JSON.parse(user) : "noObject"
}
