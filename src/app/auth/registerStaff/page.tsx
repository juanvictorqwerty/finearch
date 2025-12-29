'use client'

import { inputStyle } from '@/lib/styles';

const SignUpStaff = () => {
    return (
        <>
            <div className=" flex items-center justify-center h-screen">
                <div className="flex flex-col gap-2 p-8">
                    <p className="text-center text-3xl text-card-foreground mb-4">Register Staff</p>
                    <input className={inputStyle} 
                        type="text"
                        placeholder="Email" 
                    />
                    <input className={inputStyle}
                        type="password"
                        placeholder="Password"
                    />
                    <input className={inputStyle} 
                    type="password"
                    placeholder="Confirm password" 
                    />
                    <input className={inputStyle} 
                    type="password"
                    placeholder="Admin Code" 
                    />
                    <label className="flex cursor-pointer items-center justify-between p-1 text-muted-foreground">
                    Accept terms of use
                    <div className="relative inline-block">
                        <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-border bg-input checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" type="checkbox" />
                        <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-muted-foreground transition-all duration-200 peer-checked:left-7 peer-checked:bg-primary" />
                    </div>
                    </label>
                    <button className="inline-block cursor-pointer rounded-md bg-primary px-4 py-3.5 text-center text-sm font-semibold uppercase text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95">Register</button>
                </div>
            </div>
        </>
    );
};
export default SignUpStaff;