import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { quizReducer } from "./store/reducers/quizReducer";
import { createQuizReducer } from "./store/reducers/createQuizReducer";

const Store = configureStore({
  reducer: { quiz: quizReducer, createQuiz: createQuizReducer },
  devTools: true,
  middleware: [thunk],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const app = (
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
