import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Wifi, Zap, Info } from "lucide-react";

const Optimizer = () => {
    const [loading, setLoading] = useState(false);
    const [efficiency, setEfficiency] = useState<number | null>(null);
    const [stability, setStability] = useState<string | null>(null);
    const [signal, setSignal] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Function to determine network status
    const getNetworkStatus = (eff: number | null): { status: string; color: string } => {
        if (eff === null) return { status: "Unknown", color: "text-gray-500" };
        if (eff < 40) return { status: "Poor", color: "text-red-600" };
        if (eff < 75) return { status: "Moderate", color: "text-yellow-600" };
        return { status: "Good", color: "text-green-600" };
    };

    const networkStatus = getNetworkStatus(efficiency);

    const handleOptimize = async () => {
        setLoading(true);
        setError(null);
        setSuggestions([]);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/optimize-network/");
            const { efficiency, stability, signal, suggestions } = res.data;

            setEfficiency(efficiency);
            setStability(stability);
            setSignal(signal);
            setSuggestions(suggestions || []);
        } catch (err: any) {
            setError("Failed to optimize the network.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center px-4 py-8 w-full">
            <div className="w-[1280px]">
                {/* Cards Row */}
                <div className="flex flex-wrap gap-4">
                    {/* Network Status Card */}
                    <Card className="w-[300px] shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                            <Info className={networkStatus.color} />
                            <p className="text-sm font-medium">
                                Network Status:{" "}
                                <span className={`font-bold ${networkStatus.color}`}>
                                    {networkStatus.status}
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Efficiency */}
                    <Card className="w-[300px] shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                            <Gauge className="text-green-500" />
                            <p className="text-sm font-medium">
                                System Efficiency:{" "}
                                <span className="font-bold text-green-600">
                                    {efficiency !== null ? `${efficiency}%` : "N/A"}
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Ping Stability */}
                    <Card className="w-[300px] shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                            <Zap className="text-yellow-500" />
                            <p className="text-sm font-medium">
                                Ping Stability:{" "}
                                <span className="font-bold text-yellow-600">
                                    {stability || "N/A"}
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Signal Strength */}
                    <Card className="w-[300px] shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                            <Wifi className="text-blue-500" />
                            <p className="text-sm font-medium">
                                Signal Strength:{" "}
                                <span className="font-bold text-blue-600">
                                    {signal || "N/A"}
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <div className="mt-6 bg-gray-100 rounded-md p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Info className="w-4 h-4 text-blue-500" />
                            Optimization Suggestions
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                            {suggestions.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Error */}
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                {/* Button aligned to bottom right */}
                <div className="flex justify-end mt-6">
                    <Button
                        className="w-[200px] text-sm"
                        onClick={handleOptimize}
                        disabled={loading}
                    >
                        {loading ? "Optimizing..." : "Run Network Optimizer"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Optimizer;
