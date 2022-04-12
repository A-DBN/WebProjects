import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/loginPage";
import HomePage from "./pages/homepage";
import SignupForm from "./pages/signupPage";
import './index.css';
import YoutubePage from "./pages/Services/Youtube";
import TwitchPage from "./pages/Services/Twitch";
import TranslatePage from "./pages/Services/Google";
import IntraPage from "./pages/Services/Intra";
import NewsPage from "./pages/Services/News";
import WeatherPage from "./pages/Services/Weather";
import CovidPage from "./pages/Services/Covid";
import DiscordPage from "./pages/Services/Discord";
import SpotifyPage from "./pages/Services/Spotify";
import ApkPage from "./pages/Apk";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />
                <Route exact path="/services/youtube" element={<YoutubePage />} />
                <Route exact path="/services/twitch" element={<TwitchPage />} />
                <Route exact path="/services/news" element={<NewsPage />} />
                <Route exact path="/services/translate" element={<TranslatePage />} />
                <Route exact path="/services/intra" element={<IntraPage />} />
                <Route exact path="/services/weather" element={<WeatherPage />} />
                <Route exact path="/services/covid" element={<CovidPage />} />
                <Route exact path="/services/discord" element={<DiscordPage />} />
                <Route exact path="/services/spotify" element={<SpotifyPage />} />
                <Route exact path="/client.apk" element={<ApkPage />} />
                <Route path="*" element={<div className="text-8xl bg-red-600 text-center">404</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;