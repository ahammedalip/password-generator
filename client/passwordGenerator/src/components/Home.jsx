import React, { useEffect, useState } from 'react'
import api from '../axios/axiosConfig';
export default function Home({ notify }) {
    const [options, setOptions] = useState({
        specialChars: true,
        numbers: true,
        alphabets: true,
        length: 12,
    });
    const [password, setPassword] = useState('')
    const [passwords, setPasswords] = useState([]);

    const handleChange = (e) => {
        const { name, checked, type, value } = e.target;
        setOptions(prevOptions => ({
            ...prevOptions,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const generatePassword = () => {
        const { specialChars, numbers, alphabets, length } = options;
        const specialCharSet = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        const numberSet = '0123456789';
        const alphabetSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charSet = '';
        if (!specialChars && !numbers && !alphabets) {
            notify('please select any one stream', 'warning')
            return
        }
        if (specialChars) charSet += specialCharSet;
        if (numbers) charSet += numberSet;
        if (alphabets) charSet += alphabetSet;

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            password += charSet[randomIndex];
        }
        setPassword(password)
        notify('password generated', 'warning')

    };

    useEffect(() => {
        // Fetch passwords and labels from the backend
        const fetchPasswords = async () => {
            const email = localStorage.getItem('email')
            try {
                const response = await api('/auth/passwords',email ); // Replace with your actual API endpoint
                const data = await response.json();
                setPasswords(data);
            } catch (error) {
                console.error('Error fetching passwords:', error);
                // notify('Error fetching passwords', 'error');
            }
        };

        fetchPasswords();
    }, []);
    return (
        <div className="h-screen bg-[url('../../public/home3.jpeg')] bg-cover">
            <div className="flex h-full p-20 bg-gray-400/20" style={{ backdropFilter: 'blur(40px)' }}>
                <div className="flex  w-full pt-10 space-x-10">
                    <div className="flex-1 border rounded-md border-gray-500 hover:bg-white/10 transition-colors duration-200 ease-in-out p-4">
                        <h1>Left Side</h1>
                        <h2 className="text-white text-xl mb-4">Saved Passwords:</h2>
                            <ul>
                                {passwords.map((item, index) => (
                                    <li key={index} className="bg-gray-700 text-white p-2 rounded mb-2">
                                        <strong>Label:</strong> {item.label} <br />
                                        <strong>Password:</strong> {item.password}
                                    </li>
                                ))}
                            </ul>
                    </div>
                    <div className="flex-1 flex flex-col border rounded-md border-gray-500 p-4 items-center justify-center space-y-4">
                            <h1 className='text-white'>Generated Password </h1>
                        <div className='space-y-3 space-x-3 text-center'>
                            <input type="text" className='rounded-lg p-2' value={password} />
                            <button className='p-2 bg-gray-400 rounded-md hover:bg-white transition-colors ease-in-out duration-200'>Save</button>
                        </div>

                        <div className="mt-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="specialChars"
                                    checked={options.specialChars}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                <span className='text-white'>Include Special Characters</span>
                            </label>
                            <label className="flex items-center space-x-2 mt-2">
                                <input
                                    type="checkbox"
                                    name="numbers"
                                    checked={options.numbers}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                <span className='text-white'>Include Numbers</span>
                            </label>
                            <label className="flex items-center space-x-2 mt-2">
                                <input
                                    type="checkbox"
                                    name="alphabets"
                                    checked={options.alphabets}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                <span className='text-white'>Include Alphabets</span>
                            </label>
                            <label className="flex items-center space-x-2 mt-4">
                                <span className='text-white'>Number of Characters</span>
                                <input
                                    type="number"
                                    name="length"
                                    value={options.length}
                                    onChange={handleChange}
                                    className="form-input w-16 ml-2 p-2 rounded-md bg-gray-300 "
                                    min="1"
                                    max="20"
                                />
                            </label>
                            <button
                                onClick={generatePassword}
                                className="mt-4 bg-green-500 text-black py-2 px-4 rounded hover:bg-blue-700 hover:text-white transition-colors duration-200"
                            >
                                Generate Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
