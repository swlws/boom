import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("src/views/home/index"));

export default function AppRouters() {
  return (
    <Suspense fallback={<div> </div>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
