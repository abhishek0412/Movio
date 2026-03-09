import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Spinner } from "./components/common/Spinner";

const HomePage = lazy(() => import("./components/pages/HomePage"));
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage"));

export const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
