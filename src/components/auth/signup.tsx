'use client'
import { buttonStyle, inputStyle } from "@/lib/styles";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter

const SignUp = () => {
    const router = useRouter(); // 2. Initialize router
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/auth/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password, acceptTerms }),
            });
            
            // 3. Handle the transition
            if (response.ok) {
                // If your API returns JSON, you can check data.success
                // If it returns a redirect, response.ok will still be true
                router.push('/auth/login'); 
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsSubmitting(false);
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