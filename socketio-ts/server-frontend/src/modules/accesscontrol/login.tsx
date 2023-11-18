import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h2>
                <form className="space-y-4">
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">Forgot your Password? <a href="/forgot-password" className="text-blue-500">Reset Password</a></p>
                
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <a href="/admin/dashboard">
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 float-right">Dashboard</button>
                    </a>
                </div>
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <Link to="/admin/dashboard">
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 float-right">Dashboard</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login