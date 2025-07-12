import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import Login from "./auth/login";
import Registration from "./auth/register";

const Home = () => {
    const [view, setView] = useState<"login" | "register">("login");

    const handleSwitchToRegister = () => setView("register");
    const handleSwitchToLogin = () => setView("login");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
            {/* Top Navbar */}
            <header className="w-full flex justify-between items-center p-6">
                <h1 className="text-3xl font-bold tracking-wide">NETCAP</h1>

                {/* Login / Register Modal */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-30 h-10 text-xl">Login</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                {view === "login" ? "Login" : "Register"}
                            </DialogTitle>
                            <DialogDescription>
                                {view === "login"
                                    ? "Please enter your credentials to continue."
                                    : "Create a new account below."}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Conditional Render */}
                        {view === "login" ? (
                            <Login onSwitchToRegister={handleSwitchToRegister} />
                        ) : (
                            <>
                                <Registration />
                                <p className="text-center text-sm text-gray-700 mt-4">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={handleSwitchToLogin}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Login here
                                    </button>
                                </p>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Faster Network<br />Superior Performance
                </h2>
                <p className="text-lg md:text-xl max-w-2xl text-gray-300 mb-8">
                    A collaborative innovation by BSIT students of AMA Makati—engineered for speed, built for excellence.
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    <Button className="text-lg px-8 py-5">About</Button>
                    <Button variant="secondary" className="text-lg px-8 py-5">
                        Watch Tutorial
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Home;
