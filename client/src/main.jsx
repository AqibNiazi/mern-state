import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
 import { ToastContainer } from "react-toastify";
 import { store } from "./store";
 import { Provider } from "react-redux";
 createRoot(document.getElementById("root")).render(
   <Provider store={store}>
     <ToastContainer />
     <App />
   </Provider>
 );
