import { useState } from 'react';

type Props = {}

const NavBar = (props: Props) => {
    return (
        <div className="bg-gray-800 text-white w-64 flex-shrink-0 p-4">
            <ul>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
            </ul>
        </div>
    )
}

export default NavBar;