import { useRef, useState } from "react";

export function useHighlightAnimation(duration = 1000) {
    const ref = useRef();
    const [isHighlighted, setIsHighlighted] = useState(false);

    const triggerHighlight = () => {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), duration);
    };

    return [ref, isHighlighted, triggerHighlight];
}
