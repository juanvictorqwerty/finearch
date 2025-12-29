'use client';
import { useState } from "react";
import { inputStyle, buttonStyle} from "@/lib/styles";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
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
            required />

            <input type="password"
            name="password"
            className={buttonStyle} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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