import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import {
  About,
  AddEditCard,
  Application,
  Blog,
  Contact,
  FAQ,
  Home,
  PreviewCard,
  Pricing,
  Profile,
} from "../pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Application />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/plans",
        element: (
          <Suspense fallback={<Loader />}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/FAQ",
        element: (
          <Suspense fallback={<Loader />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/Create_Card",
        element: (
          <Suspense fallback={<Loader />}>
            <AddEditCard typePage={"Create"} />
          </Suspense>
        ),
      },
      {
        path: "/Edit_Card/:userName/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <AddEditCard typePage={"Edit"} />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/:userName",
    element: (
      <Suspense fallback={<Loader />}>
        <PreviewCard />
      </Suspense>
    ),
  },
]);
