
/** @type {import('tailwindcss').Config} */
export default {
    content: [
            "./index.html", 
            "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {

            },
            backgroundImage: () => ({
            }),
            fontFamily: {

            },
            content: {
                evolvetext: "url('./assets/EvolveText.png')",
                abstractwaves: "url('./assets/AbstractWaves.png')",
                sparkles: "url('./assets/Sparkles.png')",
                circles: "url('./assets/Circles.png')",
            },
        },
        screens: {

        },
    },
    plugins: [
    ],
};
