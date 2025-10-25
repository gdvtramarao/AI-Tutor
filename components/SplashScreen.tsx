import React, { useState, useEffect } from 'react';

const SplashScreen: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (window.innerWidth < 768) return; // Disable parallax on mobile for performance
            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const parallaxStyle = (factor: number) => ({
        transform: `translate(${mousePos.x * factor}px, ${mousePos.y * factor}px)`,
        transition: 'transform 0.1s ease-out'
    });

    return (
        <div className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-center z-[100] animate-fadeOut overflow-hidden">
            <style>
                {`
                    @keyframes fadeOut {
                        0% { opacity: 1; }
                        80% { opacity: 1; }
                        100% { opacity: 0; pointer-events: none; }
                    }
                    .animate-fadeOut {
                        animation: fadeOut 3.5s forwards;
                    }

                    .symbol {
                        position: absolute;
                        font-family: 'monospace', monospace;
                        font-size: 1.75rem;
                        font-weight: bold;
                        opacity: 0;
                        animation-duration: 1.8s;
                        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335);
                        animation-fill-mode: forwards;
                    }
                     @media (min-width: 768px) {
                        .symbol { font-size: 2.5rem; }
                    }
                     @media (min-width: 1024px) {
                        .symbol { font-size: 3rem; }
                    }

                    @keyframes swirl-in-1 {
                        0% { transform: translate(-120px, -80px) scale(1.2) rotate(-90deg); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translate(0, 0) scale(0) rotate(360deg); opacity: 0; }
                    }
                    .s1 { animation-name: swirl-in-1; color: #388BFD; } /* cyan-400 */

                    @keyframes swirl-in-2 {
                        0% { transform: translate(120px, 80px) scale(1.2) rotate(90deg); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translate(0, 0) scale(0) rotate(360deg); opacity: 0; }
                    }
                    .s2 { animation-name: swirl-in-2; animation-delay: 0.1s; color: #34D399; } /* emerald-400 */

                     @keyframes swirl-in-3 {
                        0% { transform: translate(-120px, 80px) scale(1.2) rotate(90deg); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translate(0, 0) scale(0) rotate(360deg); opacity: 0; }
                    }
                    .s3 { animation-name: swirl-in-3; animation-delay: 0.2s; color: #f59e0b; } /* amber-500 */

                     @keyframes swirl-in-4 {
                        0% { transform: translate(120px, -80px) scale(1.2) rotate(-90deg); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translate(0, 0) scale(0) rotate(360deg); opacity: 0; }
                    }
                    .s4 { animation-name: swirl-in-4; animation-delay: 0.3s; color: #8b5cf6; } /* violet-500 */

                     @keyframes swirl-in-5 {
                        0% { transform: translate(0, 100px) scale(1.2) rotate(0deg); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translate(0, 0) scale(0) rotate(360deg); opacity: 0; }
                    }
                    .s5 { animation-name: swirl-in-5; animation-delay: 0.4s; color: #ec4899; } /* pink-500 */

                    .title-container {
                        opacity: 0;
                        animation: fadeInTitle 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) 1.2s forwards;
                    }
                    @keyframes fadeInTitle {
                        from { opacity: 0; transform: scale(0.9); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    
                    .subtitle {
                        opacity: 0;
                        animation: fadeInSubtitle 1s ease-in-out 1.8s forwards;
                    }
                    @keyframes fadeInSubtitle {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
            
            <div 
                className="relative w-64 h-32 md:w-96 md:h-48 lg:w-[32rem] lg:h-64 flex items-center justify-center"
                style={parallaxStyle(10)}
            >
                <span className="symbol s1" style={parallaxStyle(30)}>&lt;/&gt;</span>
                <span className="symbol s2" style={parallaxStyle(25)}>{`{ }`}</span>
                <span className="symbol s3" style={parallaxStyle(40)}>{`()`}</span>
                <span className="symbol s4" style={parallaxStyle(20)}>[ ]</span>
                <span className="symbol s5" style={parallaxStyle(35)}>_</span>

                <div className="title-container text-center" style={parallaxStyle(5)}>
                    <h1 className="text-4xl md:text-6xl font-bold text-white">AI Tutor</h1>
                    <p className="subtitle text-md md:text-lg text-dark-text-secondary mt-2">by gdvtramarao</p>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;