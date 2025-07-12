import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Wifi, Zap, Info } from "lucide-react";

const Optimizer = () => {
    const [loading, setLoading] = useState(false);
    const [efficiency, setEfficiency] = useState<number | null>(null);
    const [stability, setStability] = useState<string | null>(null);
    const [signal, setSignal] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

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
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Network Optimization Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Gauge className="text-green-500" />
                        <p className="text-lg font-medium">
                            System Efficiency:{" "}
                            <span className="font-bold text-green-600">
                                {efficiency !== null ? `${efficiency}%` : "N/A"}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Zap className="text-yellow-500" />
                        <p className="text-lg font-medium">
                            Ping Stability:{" "}
                            <span className="font-bold text-yellow-600">
                                {stability || "N/A"}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Wifi className="text-blue-500" />
                        <p className="text-lg font-medium">
                            Signal Strength:{" "}
                            <span className="font-bold text-blue-600">
                                {signal || "N/A"}
                            </span>
                        </p>
                    </div>

                    {/* Suggestions Box */}
                    {suggestions.length > 0 && (
                        <div className="p-4 mt-4 bg-gray-100 rounded-md space-y-2">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Info className="w-4 h-4 text-blue-500" />
                                Optimization Suggestions
                            </div>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                {suggestions.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <Button
                        className="mt-6 w-full text-lg"
                        variant="default"
                        onClick={handleOptimize}
                        disabled={loading}
                    >
                        {loading ? "Optimizing..." : "Run Network Optimizer"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Optimizer;
