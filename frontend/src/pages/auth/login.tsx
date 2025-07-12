import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = ({ onSwitchToRegister }: { onSwitchToRegister: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                email,
                password,
            });

            const { tokens, user } = response.data;

            if (!tokens?.access || !tokens?.refresh) {
                setError("No token received. Please try again.");
                return;
            }
            localStorage.setItem("accessToken", tokens.access);
            localStorage.setItem("refreshToken", tokens.refresh);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.detail || "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded-md"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-md"
            />

            <div className="flex justify-between items-center text-sm text-gray-700">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-600" />
                    Remember me
                </label>
                <button
                    type="button"
                    className="text-blue-600 hover:underline focus:outline-none"
                >
                    Forgot password?
                </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Submit"}
            </Button>

            {error && (
                <p className="text-center text-sm text-red-600 font-medium">{error}</p>
            )}

            <p className="text-center text-sm text-gray-700 mt-2">
                Don’t have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-blue-600 hover:underline font-medium"
                >
                    Create one here
                </button>
            </p>
        </form>
    );
};

export default Login;
