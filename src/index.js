import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routes/routes";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebase-config";
import { AuthProvider } from "./Utils/Auth";

ReactDOM.render(
  <AuthProvider>
    <React.StrictMode>
      <Suspense fallback={<div>Loading... </div>}>
        <Routes />
      </Suspense>
    </React.StrictMode>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
