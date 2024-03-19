// TypingAnimation.js
import React, { useState, useEffect } from 'react';

function TypingAnimation() {
    const textOptions = ["Share with Friends",  "Earn Rewards", "Withdraw Instantly"];
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100; // Adjust typing speed

        const interval = setInterval(() => {
            if (isDeleting) {
                setCharIndex(prevCharIndex => prevCharIndex - 1);
            } else {
                setCharIndex(prevCharIndex => prevCharIndex + 1);
            }

            const currentText = textOptions[index];
            if (isDeleting) {
                setCurrentText(currentText.substring(0, charIndex - 1));
            } else {
                setCurrentText(currentText.substring(0, charIndex + 1));
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    setIsDeleting(true);
                }, 1000); // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [charIndex, index, isDeleting]);

    return (
        <h3>
            {currentText}
            <span className="cursor" style={{ visibility: charIndex === textOptions[index].length ? 'hidden' : 'visible' }}>|</span>
        </h3>
    );
}

export default TypingAnimation;
