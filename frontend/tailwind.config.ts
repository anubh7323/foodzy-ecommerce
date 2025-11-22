import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#00B207',
                    50: '#E6F9E7',
                    100: '#CCF3CE',
                    200: '#99E79D',
                    300: '#66DB6C',
                    400: '#33CF3B',
                    500: '#00B207',
                    600: '#008E06',
                    700: '#006B04',
                    800: '#004703',
                    900: '#002401',
                },
                secondary: {
                    DEFAULT: '#FF6B6B',
                    light: '#FFE5E5',
                },
                warning: '#FFA500',
                success: '#00B207',
                error: '#FF4444',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-poppins)', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
