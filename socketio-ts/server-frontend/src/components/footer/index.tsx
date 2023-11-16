import { useState } from 'react';

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="bottom-0 left-0 z-20 w-full bg-white border-t border-gray-100 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <div className="w-full max-w-screen-xl p-3 md:py-8">
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="https://github.com/saifurrahman1193" className="hover:underline">Open Source</a>. No Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer;