import { useState } from 'react';

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="bg-gray-900 text-white py-4">
            <div className=" border-gray-800 text-center text-sm">
                &copy; 2023 Company Name. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer;