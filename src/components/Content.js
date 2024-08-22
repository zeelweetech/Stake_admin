import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes";

function Content() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes?.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Content;
