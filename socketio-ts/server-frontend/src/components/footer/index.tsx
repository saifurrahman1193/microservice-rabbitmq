import { useState } from 'react';

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="bg-gray-100 rounded-lg shadow dark:bg-gray-100">
            <div className="w-full max-w-screen-xl p-4 md:py-8">
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Open Source</a>. No Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer;