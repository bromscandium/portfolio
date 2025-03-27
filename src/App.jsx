import {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';

function App() {
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const direction = currentScrollY > lastScrollY ? "down" : "up";

            if (direction === "down") {
                document.body.style.background = "#000";
            } else {
                document.body.style.background = "#121212";
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <Router>
            <Routes>
                <Route path="/portfolio/" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App