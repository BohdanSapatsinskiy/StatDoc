export const getUserId = () => {
    let id = sessionStorage.getItem("user_id");
    if (!id) {
        id = Math.floor(Math.random() * 1000) + 1 + "";
        sessionStorage.setItem("user_id", id);
    }
    return id;
};


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import {StartPage} from "./pages/StartPage/StartPage";
import {GamePage} from "./pages/GamePage/GamePage";
import {ResultsPage} from "./pages/ResultsPage/ResultsPage";
import {SettingsPage} from "./pages/SettingsPage/SettingsPage";

import {CookieConsentBanner} from "./components/CookieConsentBanner";

function App() {
    const userId = getUserId();

    return (
        <Router>
            <Routes>

                <Route path="/" element={<Navigate to={`/${userId}`} />} />

                <Route path="/:userId" element={<StartPage />} />

                <Route path="/:userId/game" element={<GamePage />} />

                <Route path="/:userId/results" element={<ResultsPage />} />

                <Route path="/:userId/settings" element={<SettingsPage />} />

            </Routes>

            <CookieConsentBanner />
        </Router>
    );
}

export default App;

