/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--bg-color)',
                textprimary: 'var(--text-primary)',
                textsecondary: 'var(--text-secondary)',
                h1color: 'var(--h1-color)',
                'h2color': 'var(--h2-color)',
                'pcolor': 'var(--p-color)',
                navfoot: 'var(--navfoot-bg)',
                primary: 'var(--primary)',
                'primary-muted': 'var(--primary-muted)',
                'textbox': 'var(--textbox)',
                secondary: 'var(--secondary)',
                'secondary-muted': 'var(--navfoot-bg)',
                tertiary: 'var(--tertiary)',
                error: 'var(--error)',

            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
