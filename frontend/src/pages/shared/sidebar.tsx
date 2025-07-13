import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, BarChart, Zap, User } from "lucide-react";

const Sidebar = () => {
    const navigate = useNavigate();

    // Get logged-in user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const username = user.fullname || "Guest";

    const handleLogout = () => {
        // Clear tokens and user info
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Redirect to login/home
        navigate("/");
    };

    return (
        <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
            {/* Top Navigation Links */}
            <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold mb-6">NETCAP</h2>

                <nav className="flex flex-col gap-3">
                    <Button
                        asChild
                        variant="ghost"
                        className="justify-start gap-2 text-white hover:bg-gray-800"
                    >
                        <Link to="/dashboard">
                            <Home size={18} />
                            Dashboard
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        className="justify-start gap-2 text-white hover:bg-gray-800"
                    >
                        <Link to="/network-statistics">
                            <BarChart size={18} />
                            Network Statistics
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        className="justify-start gap-2 text-white hover:bg-gray-800"
                    >
                        <Link to="/network-optimizer">
                            <Zap size={18} />
                            Network Optimizer
                        </Link>
                    </Button>
                </nav>
            </div>

            {/* Bottom User Dropdown */}
            <div className="p-4 border-t border-gray-800">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-white hover:bg-gray-800"
                        >
                            <span className="flex items-center gap-2">
                                <User size={16} />
                                {username}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-white text-black w-full mt-2">
                        <DropdownMenuLabel className="text-xs text-gray-500">Account</DropdownMenuLabel>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 font-semibold cursor-pointer"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
};

export default Sidebar;
