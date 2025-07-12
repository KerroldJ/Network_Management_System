import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import Login from "./auth/login";
import Registration from "./auth/register";
import CanvasBackground from "../components/CanvasBackground";

const Home = () => {
    const [view, setView] = useState<"login" | "register">("login");
    const [aboutOpen, setAboutOpen] = useState(false); // New state for About modal

    const handleSwitchToRegister = () => setView("register");
    const handleSwitchToLogin = () => setView("login");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
            <CanvasBackground />
            {/* Top Navbar */}
            <header className="w-full flex justify-between items-center p-6">
                <h1
                    className="text-3xl font-bold tracking-wide text-cyan-400"
                    style={{
                        textShadow: "0 0 2px #00ffff, 0 0 8px #00ffff",
                    }}
                >
                    NETCAP
                </h1>

                {/* Login / Register Modal */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-30 h-10 text-xl">Login</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black rounded-xl max-h-[80vh] overflow-y-auto">
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
                    A collaborative innovation by BSIT students of AMA Makati—engineered
                    for speed, built for excellence.
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* About Button to trigger modal */}
                    <Button
                        className="text-lg px-8 py-5"
                        onClick={() => setAboutOpen(true)}
                    >
                        About
                    </Button>

                    {/* YouTube Link Button */}
                    <Button
                        variant="secondary"
                        className="text-lg px-8 py-5"
                        onClick={() =>
                            window.open(
                                "https://youtube.com/@netcap2025?si=X_3cYzCa3niIHsLV",
                                "_blank"
                            )
                        }
                    >
                        Watch Tutorial
                    </Button>
                </div>
            </main>

            {/* About Modal */}
            <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
                <DialogContent className="bg-white text-black max-h-[80vh] overflow-y-auto rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-center">
                            About NETCAP
                        </DialogTitle>
                    </DialogHeader>
                    <div className="prose prose-invert prose-lg text-black max-w-4xl mx-auto mt-4">
                        <p>
                            We are proud to introduce <strong>NETCAP</strong> — a customized
                            Network Traffic Control System developed exclusively for{" "}
                            <strong>San Lorenzo School</strong> in San Pedro, Laguna.
                        </p>

                        <p>
                            As digital education becomes increasingly vital, San Lorenzo
                            School recognizes the importance of a robust, reliable network.
                            With more tools and platforms moving online, seamless connectivity
                            isn’t just helpful — it’s essential. NETCAP was created in direct
                            response to this need.
                        </p>

                        <h3 className="font-bold mt-8">Our Goal</h3>
                        <p>
                            NETCAP is an intelligent, AI-powered system designed to monitor,
                            analyze, and optimize the school’s network traffic in real time.
                            Our goal is to ensure that students and teachers enjoy
                            uninterrupted access to online resources, keeping learning smooth,
                            efficient, and secure.
                        </p>

                        <h3 className="font-bold mt-8">What NETCAP Provides</h3>
                        <p>
                            Unlike traditional solutions, NETCAP uses advanced Artificial
                            Intelligence and Machine Learning techniques to dynamically adjust
                            bandwidth and prioritize traffic. Whether it's a live class,
                            sensitive data, or school software, NETCAP automatically directs
                            resources to where they’re needed most.
                        </p>

                        <h3 className="font-bold mt-8">Key Features</h3>
                        <ul className="list-disc pl-6">
                            <li>
                                <strong>Real-time Traffic Monitoring:</strong> Constant tracking
                                of network activity to spot congestion early.
                            </li>
                            <li>
                                <strong>AI-Based Forecasting:</strong> Predicts traffic surges
                                and adjusts usage ahead of time.
                            </li>
                            <li>
                                <strong>Automated Anomaly Detection:</strong> Instantly detects
                                threats and unusual behavior on the network.
                            </li>
                            <li>
                                <strong>Dynamic Policy Enforcement:</strong> Automatically
                                adapts rules and permissions based on real-time needs.
                            </li>
                            <li>
                                <strong>Comprehensive Reporting:</strong> Clear, up-to-date
                                reports on network health and performance.
                            </li>
                        </ul>

                        <h3 className="font-bold mt-8">Our Vision</h3>
                        <p>
                            We believe in a future where internet issues never interrupt
                            learning. NETCAP is our step toward creating a smart,
                            self-regulating school network that empowers San Lorenzo School to
                            thrive in the digital era — building a stronger, more connected
                            learning community.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Home;
