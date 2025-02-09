import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
    const [length, Setlength] = useState(8); // Password length state
    const [numbersallowed, Setnumberallowed] = useState(false); // Whether numbers are allowed in the password
    const [charallowed, Setcharallowed] = useState(false); // Whether special characters are allowed in the password
    const [password, SetPassword] = useState(""); // Generated password state
    const passwordRef = useRef(null); // Ref to the password input

    // Password generation logic
    const passwordgenerator = useCallback(() => {
        let password = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Base string with alphabets

        if (numbersallowed) {
            str += "0123456789"; // Append numbers if allowed
        }

        if (charallowed) {
            str += "!@#$%^&*()_+{}|:?><"; // Append special characters if allowed
        }

        for (let i = 0; i < length; i++) { // Loop to generate password of given length
            let char = Math.floor(Math.random() * str.length); // Random index in the string
            password += str.charAt(char); // Append random character to password
        } 

        SetPassword(password); // Set the generated password
    }, [length, numbersallowed, charallowed]);

    // Automatically generate password when dependencies change
    useEffect(() => {
        passwordgenerator();
    }, [length, numbersallowed, charallowed, passwordgenerator]);

    // Function to copy the password to the clipboard
    const handleCopy = () => {
        if (passwordRef.current) {
            passwordRef.current.select(); // Select the text
            document.execCommand('copy'); // Copy the selected text
            navigator.clipboard.writeText(passwordRef.current.value); // Copy using clipboard API
            alert('Password copied to clipboard!'); // Alert user
        }
    };

    return (
        <>
            <div className="w-full max-w-lg mx-auto shadow-lg rounded-2xl px-6 py-6 my-12 bg-gray-900 text-orange-500">
                <h1 className="text-white text-center text-3xl font-bold mb-8">Password Generator</h1>

                <div className='flex shadow-lg rounded-xl overflow-hidden mb-6'>
                    <input 
                        type="text" 
                        value={password}
                        ref={passwordRef} // Attach the ref to the input
                        className='bg-cyan-800 outline-none w-full py-3 px-4 text-lg text-amber-50 rounded-l-xl'
                        placeholder='Your Password'
                        readOnly
                    />
                    <button 
                        className='outline-none bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition duration-300 px-3 py-1 rounded-r-xl'
                        onClick={handleCopy} // Call handleCopy when clicked
                    >
                        <b>Copy</b>
                    </button>
                </div>

                {/* Flex container for Length, Numbers, and Characters */}
                <div className='flex items-center justify-between mb-6 gap-x-4'>
                    {/* Length slider and label */}
                    <div className='flex items-center gap-x-2 w-1/2'>
                        <input 
                            type="range" 
                            min={6}
                            max={100}
                            value={length}
                            className='cursor-pointer bg-gray-700 appearance-none h-2 rounded-lg w-full'
                            onChange={(e) => {
                                Setlength(e.target.value);
                            }} 
                        />
                        <label className="text-amber-50 whitespace-nowrap">Length: {length}</label>
                    </div>

                    {/* Numbers checkbox */}
                    <div className='flex items-center gap-x-1'>
                        <input 
                            type="checkbox" 
                            defaultChecked={numbersallowed}
                            id="numbersInput"
                            onChange={() => {
                                Setnumberallowed((prev) => !prev);
                            }}
                        />
                        <label htmlFor="numbersInput" className="text-amber-50">Numbers</label>
                    </div>

                    {/* Characters checkbox */}
                    <div className='flex items-center gap-x-1'>
                        <input 
                            type="checkbox" 
                            defaultChecked={charallowed}
                            id="charactersInput"
                            onChange={() => {
                                Setcharallowed((prev) => !prev);
                            }}    
                        />
                        <label htmlFor="charactersInput" className="text-amber-50">Characters</label>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button 
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
                        onClick={passwordgenerator}
                    >
                        Generate Password   
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
