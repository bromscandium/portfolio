import astro from "/astro_cover.png";
import bot from "/bot_cover.jpg";
import hub from "/hub_cover.jpg";
import valli from "/valli_cover.png";
import profile from "/profile_cover.png";
import weatherai from "/weather-ai.png";
import digitalkraj from "/digitalkraj.png";
import whelm from "/whelm.png";
import jigsawsudoku from "/jigsawsudoku.png";

const listData = [
    {
        id: 9,
        image: whelm,
        title: "Whelm",
        description: [
            "Whelm is a project created for the Cassini Hackathon — a disaster response simulator powered by Copernicus data.",
            "It features an interactive React frontend and a Python backend with AI integration via the OpenAI API.",
            "The app is fully containerized with Docker, showcasing real-time map interactions, decision-making, and gamified UX."
        ],
        technologies: ["React", "Python", "OpenAI", "MapLibre", "Docker", "SCSS"],
        live: null,
        github: "https://github.com/bromscandium/cassini-hackathon-komorebi"
    },
    {
        id: 8,
        image: jigsawsudoku,
        title: "Jigsaw Sudoku",
        description: [
            "This is my second university project, creating a game in Java, Spring, and part of the frontend.",
            "I chose Angular as the frontend because I wanted to kill two birds with one stone (Learn Java and Typescript)",
            "The game is small, but the biggest focus was the design."
        ],
        technologies: ["Java", "Spring Boot", "Angular", "REST", "SCSS", "NodeJS", "Railway"],
        live: "https://jigsawsudoku-brsc.up.railway.app",
        github: "https://github.com/bromscandium/jigsawsudoku"
    },
    {
        id: 7,
        image: digitalkraj,
        title: "DigitalnyKraj (DigitalLand)",
        description: [
            "At a hackathon in Žilina, Slovakia, my team and I developed a prototype of a web portal for community residents.",
            "We used the most available technologies and libraries to develop our project.",
            "My task was to create the front-end part together with my friend, where I took the main responsibility."
        ],
        technologies: ["React", "SCSS", "JSON-Server", "Leaflet", "Gemini API", "FastAPI"],
        live: null,
        github: "https://github.com/bromscandium/digitalny-kraj"
    },
    {
        id: 6,
        image: weatherai,
        title: "WeatherAI",
        description: [
            "A playful weather app that shows current conditions and a random tip based on your city.",
            "More of a developer sandbox: focused on API usage, data handling, and project structure rather than content relevance.",
            "Built to explore frontend–backend interaction and how external services integrate into modern web projects."
        ],
        technologies: ["React", "SASS", "Node.js", "OpenWeatherMap API", "OpenAI API"],
        live: null,
        github: "https://github.com/bromscandium/weather-ai"
    },
    {
        id: 4,
        image: valli,
        title: "Valli",
        description: [
            "An experimental project exploring visual design and user flow.",
            "Focuses on animated interfaces and modular components.",
            "This project was made in cooperation with backender, my role is frontend",
        ],
        technologies: ["React", "SASS", "Python", "Docker", "OpenAI API"],
        live: null,
        github: "https://github.com/bromscandium/BioGrow/tree/main"
    },
    {
        id: 5,
        image: profile,
        title: "Own Profile",
        description: [
            "Personal website to showcase my projects, experiences, and skills.",
            "Fully built with React and smooth UX in mind."
        ],
        technologies: ["React", "SASS", "Vite", "UX/UI", "Web Design"],
        live: null,
        github: "https://github.com/bromscandium/portfolio/tree/main"
    },
    {
        id: 2,
        image: bot,
        title: "Telegram Bot",
        description: [
            "A Telegram bot that helps students stay organized and assists group moderation.",
            "Simple but effective — tailored to our academic needs."
        ],
        technologies: ["Python", "Telegram API", "PostgreSQL"],
        live: null,
        github: "https://github.com/bromscandium/telegram-bot"
    },
    {
        id: 1,
        image: astro,
        title: "Astro",
        description: [
            "Astro Game was my first serious project during university.",
            "A runner-style game where a spaceship dodges comets and survives as long as possible.",
            "It also features an in-game economic system."
        ],
        technologies: ["C", "NCurses"],
        live: null,
        github: "https://github.com/bromscandium/astro"
    },
    {
        id: 3,
        image: hub,
        title: "Ukrainian Hub",
        description: [
            "A site for Promote Ukraine to showcase projects, cultural events, and advocacy efforts.",
            "Supports communication and outreach for an NGO."
        ],
        technologies: ["Wix Studio", "Figma", "Web Design"],
        live: "https://ukrainianhub.com",
        github: null
    },
];

export default listData;
