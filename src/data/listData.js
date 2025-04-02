import astro from "/astro_cover.png";
import bot from "/bot_cover.jpg";
import hub from "/hub_cover.jpg";
import valli from "/valli_cover.png";
import profile from "/profile_cover.png";

const listData = [
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
    }
];

export default listData;
