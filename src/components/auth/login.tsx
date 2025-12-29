'use client';

const Login = () => {
    return (
        <div  className="w-[60%] rounded-2xl bg-gray-200 dark:bg-gray-800 p-6 flex flex-col gap-4">
            <h1 className="text-center text-3xl text-card-foreground">Login</h1>
            <input type="email" name="email" className="bg-input w-full rounded-lg border border-border px-4 py-3 text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" placeholder="Email" required />
            <input type="password" name="password" className="bg-input w-full rounded-lg border border-border px-4 py-3 text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" placeholder="Password" required />
            <button type="submit" className="inline-block cursor-pointer rounded-md bg-primary px-4 py-3.5 text-center text-sm font-semibold uppercase text-primary-foreground transition duration-200 ease-in-out hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95">
                Login
            </button>
        </div>
    );
};

export default Login;