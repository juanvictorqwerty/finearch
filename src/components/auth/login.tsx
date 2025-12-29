'use client';
import { useState } from "react";
import { inputStyle, buttonStyle} from "@/lib/styles";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission for login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Make GET request to the login API with email and password as query parameters
            const response = await fetch(`/api/auth/login?email=${email}&password=${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Parse the response JSON
            const data = await response.json();
            console.log('Login response:', data);
        } catch (error) {
            // Log any errors that occur during the login request
            console.error('Login error:', error);
        }
    }

    return (
        <div  className="w-[60%] min-w-75 rounded-2xl bg-gray-200 dark:bg-gray-800 p-2 flex flex-col gap-4">
            <h1 className="text-center text-3xl text-card-foreground">Login</h1>
            
            <input type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className={inputStyle}
            placeholder="Email"
            autoComplete="off"
            required />

            <input type="password"
            name="password"
            className={inputStyle} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required />

            <button onClick={handleSubmit} 
            type="submit" 
            className={buttonStyle}>
                Login
            </button>
        </div>
    );
};

export default Login;