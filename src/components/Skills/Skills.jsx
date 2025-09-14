import "./Skills.sass";
import {useEffect} from "react";
import {useHighlightAnimation} from "../../hooks/useHighlightAnimation.js";

const CATEGORIES = [
    {
        title: "Languages & Technologies",
        items: [
            "JavaScript (ES6+)",
            "TypeScript",
            "Python",
            "HTML5",
            "CSS3",
            "SCSS/SASS",
            "SQL",
            "TailwindCSS",
        ],
    },
    {
        title: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB"],
    },
    {
        title: "Frameworks & Libraries",
        items: [
            "React",
            "React Native",
            "Next.js",
            "Node.js",
            "NestJS",
            "FastAPI",
            "Django",
            "Redux",
            "Strapi (Headless CMS)",
        ],
    },
    {
        title: "Tools & DevOps",
        items: [
            "GitHub/GitLab",
            "Docker",
            "CI/CD pipelines",
            "VPS deployment",
            "Postman",
            "REST API",
        ],
    },
    {
        title: "CMS Development",
        items: ["WordPress", "Wix"],
    },
    {
        title: "Automation & Support",
        items: ["Microsoft SharePoint", "PowerApps", "PowerAutomate"],
    },
];

export default function Skills({ onHighlightReady }) {
    const [ref, isHighlighted, triggerHighlight] = useHighlightAnimation();

    useEffect(() => {
        if (onHighlightReady) {
            onHighlightReady(triggerHighlight);
        }
    }, [onHighlightReady, triggerHighlight]);


    return (
        <div ref={ref} className={`skills ${isHighlighted ? "highlight" : ""}`} id="skills">
            <div className="skills__header">
                <h1 className="skills__title">Skills</h1>
            </div>

            <div className="skills__grid">
                {CATEGORIES.map((cat) => (
                    <div className="skills__card" key={cat.title}>
                        <h3 className="skills__card-title">{cat.title}</h3>
                        <ul className="skills__list">
                            {cat.items.map((item) => (
                                <li key={item} className="skills__item">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
