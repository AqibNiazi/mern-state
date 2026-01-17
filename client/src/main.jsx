import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
 import { ToastContainer } from "react-toastify";
 import { persistor, store } from "./store";
 import { Provider } from "react-redux";
 import { PersistGate } from "redux-persist/integration/react";
 createRoot(document.getElementById("root")).render(
   <Provider store={store}>
     <ToastContainer />
     <PersistGate loading={null} persistor={persistor}>
       <App />
     </PersistGate>
   </Provider>
 );
