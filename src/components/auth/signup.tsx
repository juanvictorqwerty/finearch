'use client'
import { buttonStyle, inputStyle } from "@/lib/styles";
import { useState } from "react";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form submission for registration
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check if the passwords match
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        else{
            setIsSubmitting(true);
            // Log the form data before sending
            console.log('Submitting signup form:', { email, username, password, acceptTerms });
            
            try {
                // Make POST request to the signup API
                const response = await fetch('/api/auth/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, username, password, confirmPassword, acceptTerms }),
                });
                
                // Parse the response
                const data = await response.json();
                console.log('Signup response:', data);
            } catch (error) {
                // Log any errors that occur during the signup request
                console.error('Signup error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        
        <>
            <div  className="w-[60%] min-w-75 rounded-2xl bg-gray-200 dark:bg-gray-800 p-2 flex flex-col gap-4">
                
                    <p className="text-center text-3xl text-card-foreground mb-4">Register</p>

                    <input className={inputStyle}
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="off"
                    required />

                    <input className={inputStyle} 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required />

                    <input className={inputStyle}
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="off"
                    required />

                    <input className={inputStyle} 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    autoComplete="off"
                    required />
                    
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
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Register'}
                    </button>
                
            </div>
        </>
    );
};
export default SignUp;