'use client'

import { buttonStyle, inputStyle } from '@/lib/styles';
import { useState } from 'react';


const SignUpStaff = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        else{
            console.log('Submitting signup form:', { email, username, password, acceptTerms });
            setIsSubmitting(true);
            // Make POST request to the signup API
            const response=await fetch('/api/auth/signUpStaff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password, confirmPassword, code, acceptTerms }),
            });
            // Parse the response
            const data = await response.json();
            console.log('Signup response:', data);
            setIsSubmitting(false);
        }

    }


    return (
        <>
            <div className=" flex items-center justify-center h-screen bg-white dark:bg-gray-900">
                <div className="flex flex-col gap-2 p-2 w-[70%] min-w-7 bg-amber-600 dark:bg-amber-800 rounded">
                    <p className="text-center text-3xl text-card-foreground mb-4">Register Staff</p>
                    <input className={inputStyle} 
                        type="text"
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <input className={inputStyle} 
                        type="text"
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required

                    />

                    <input className={inputStyle}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input className={inputStyle} 
                        type="password"
                        placeholder="Confirm password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                    <input className={inputStyle} 
                    type="password"
                    placeholder="Admin Code" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    />

                    <label className="flex cursor-pointer items-center justify-between p-1 text-muted-foreground">
                    Accept terms of use
                    <div className="relative inline-block">
                        <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-border bg-input checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-muted-foreground transition-all duration-200 peer-checked:left-7 peer-checked:bg-primary" />
                    </div>
                    </label>
                    <button className={buttonStyle}
                    type="submit"
                    onClick={handleSubmit}>
                        Register
                    </button>
                </div>
            </div>
        </>
    );
};
export default SignUpStaff;