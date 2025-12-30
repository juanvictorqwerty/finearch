'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { inputStyle, buttonStyle} from "@/lib/styles";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form submission for login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Make POST request to the login API
            const response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            // Parse the response JSON
            const data = await response.json();
            console.log('Login response:', data);

            if (data.success) {
                if (data.role === 'staff') {
                    router.push('/admin');
                } else {
                    alert(data.message);
                }
            }
        } catch (error) {
            // Log any errors that occur during the login request
            console.error('Login error:', error);
        } finally {
            setIsSubmitting(false);
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
            className={buttonStyle}
            disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
};

export default Login;