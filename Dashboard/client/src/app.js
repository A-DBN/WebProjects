import WidgetGrid from './grid';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInScreen from './firebase';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<SignInScreen />} />
                <Route path="/dashboard" element={<WidgetGrid />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;