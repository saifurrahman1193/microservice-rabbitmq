import React, { useState } from 'react';
type Props = {}

const ForgotPasswordCodeVerify = (props: Props) => {
    const [pin, setPin] = useState(['', '', '', '', '', '']);

    const handleInputChange = (e, index) => {
        const value = e.target.value;

        if (value.length <= 1) {
            // Update the specific index of the PIN array
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Move focus to the next input if a digit is entered
            if (value && index < 5) {
                document.getElementById(`pin-input-${index + 1}`).focus();
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Forgot Password Code Verification</h2>
                <form className="space-y-4">
                    <div className="flex justify-center">
                        {pin.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                id={`pin-input-${index}`}
                                value={digit}
                                onChange={(e) => handleInputChange(e, index)}
                                maxLength="1"
                                className="w-12 h-12 text-center border rounded-lg focus:ring focus:ring-blue-200 mx-2"
                                placeholder='-'
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200"
                    >
                        Verify
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    <a href="#">Resend code</a>
                </p>
            </div>
        </div>
    )
}

export default ForgotPasswordCodeVerify