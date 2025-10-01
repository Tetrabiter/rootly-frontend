import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { EmptyPage } from "./pages/EmptyPage.tsx";
import { LogPage } from "./pages/LogPage.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <StrictMode>
            <Routes>
                <Route element={<App />}>
                    <Route path=":logName" element={<LogPage />} />
                    <Route path="*" element={<EmptyPage />} />
                </Route>
            </Routes>
        </StrictMode>
    </BrowserRouter>
);
