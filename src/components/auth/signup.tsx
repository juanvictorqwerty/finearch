'use client'
import { inputStyle } from "@/lib/styles";

const SignUp = () => {
    return (
        <>
            <div  className="w-[60%] rounded-2xl bg-gray-200 dark:bg-gray-800 p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2 p-8">
                    <p className="text-center text-3xl text-card-foreground mb-4">Register</p>
                    <input className={inputStyle} placeholder="Email" />
                    <input className={inputStyle} placeholder="Password" />
                    <input className={inputStyle} placeholder="Confirm password" />
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
export default SignUp;