import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Registration = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/register/", formData);
            setSuccess("User registered successfully!");
            setError(null);
            setFormData({ fullname: "", email: "", password: "" });
        } catch (err: any) {
            setError(err.response?.data?.detail || "Registration failed.");
            setSuccess(null);
        }
    };

    return (
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                required
            />
            <Button type="submit" className="w-full">Register</Button>

            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
};

export default Registration;
