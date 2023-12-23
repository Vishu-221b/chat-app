import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from "react-router-dom";
import App from './App.jsx'
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <ChatProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChatProvider>
    </ChakraProvider>
  </BrowserRouter>
);
