import { lazy } from "react";

export const Application = lazy(() => import("./Application"));
export const Home = lazy(() => import("./Home/Home"));
export const Pricing = lazy(() => import("./Pricing/Pricing"));
export const About = lazy(() => import("./About/About"));
export const Contact = lazy(() => import("./Contact/Contact"));
export const Blog = lazy(() => import("./Blog/Blog"));
export const FAQ = lazy(() => import("./FAQ/FAQ"));
export const Profile = lazy(() => import("./Profile/Profile"));
export const AddEditCard = lazy(() => import("./AddEditCard/AddEditCard"));
export const PreviewCard = lazy(() => import("./PreviewCard/PreviewCard"));
export const HeaderComponent = lazy(() => import("../components/Header/Header"));
export const FooterComponent = lazy(() => import("../components/Footer/Footer"));
