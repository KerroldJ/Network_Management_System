import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Wifi, Zap, Info } from "lucide-react";

// Simulated frontend progress log steps
const simulatedSteps = [
    "⏳ Starting network optimization process...",
    "🤖 Connecting to AI optimization models...",
    "📁 AI models accessed successfully.",
    "🧠 AI diagnostic: Proceed with optimization.",
    "🚀 Running speed test...",
    "📡 Collecting ping sample 1...",
    "📡 Collecting ping sample 2...",
    "📡 Collecting ping sample 3...",
    "🔧 Applying virtual DNS flush...",
    "🔌 Simulating router refresh...",
    "🌐 Reconnecting to optimal network route...",
    "📊 Analyzing connection performance..."
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Optimizer = () => {
    const [loading, setLoading] = useState(false);
    const [efficiency, setEfficiency] = useState<number | null>(null);
    const [stability, setStability] = useState<string | null>(null);
    const [signal, setSignal] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [optimizationLog, setOptimizationLog] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [realtimeStatus, setRealtimeStatus] = useState<string>("Loading...");
    const [realtimeColor, setRealtimeColor] = useState<string>("text-gray-500");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Good":
                return "text-green-600";
            case "Moderate":
                return "text-yellow-600";
            case "Poor":
                return "text-red-600";
            default:
                return "text-gray-500";
        }
    };

    useEffect(() => {
        const fetchRealtimeNetworkStatus = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/network-stats/");
                const { status } = res.data;
                setRealtimeStatus(status);
                setRealtimeColor(getStatusColor(status));
            } catch (err) {
                console.error("Failed to fetch real-time status:", err);
                setRealtimeStatus("Unknown");
                setRealtimeColor("text-gray-500");
            }
        };

        fetchRealtimeNetworkStatus();
    }, []);

    const handleOptimize = async () => {
        setLoading(true);
        setError(null);
        setSuggestions([]);
        setOptimizationLog([]);
        setEfficiency(null);
        setStability(null);
        setSignal(null);

        try {
            // Step-by-step simulated frontend logs
            for (let step of simulatedSteps) {
                setOptimizationLog(prev => [...prev, step]);
                await sleep(1000);
            }

            // Backend request only after steps
            const res = await axios.post("http://127.0.0.1:8000/api/optimize-network/");
            const {
                efficiency,
                stability,
                signal,
                suggestions,
                optimization_log
            } = res.data;

            setEfficiency(efficiency);
            setStability(stability);
            setSignal(signal);
            setSuggestions(suggestions || []);

            // Append only "✅ Optimization complete."
            const finalStep = optimization_log?.find((log: string | string[]) => log.includes("✅"));
            if (finalStep) {
                setOptimizationLog(prev => [...prev, finalStep]);
            }
        } catch (err: any) {
            console.error(err);
            setError("Failed to optimize the network.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center px-4 py-8 w-full">
            <div className="w-[1280px]">
                {/* Cards Row */}
                <div className="flex flex-wrap gap-4">
                    {/* Real-Time Network Status Card */}
                    <Card className="w-[300px] shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                            <Info className={realtimeColor} />
                            <p className="text-sm font-medium">
                                Network Status:{" "}
                                <span className={`font-bold ${realtimeColor}`}>
                                    {realtimeStatus}
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

                {/* Suggestions + Optimization Log (Unified Box) */}
                {(suggestions.length > 0 || optimizationLog.length > 0) && (
                    <div className="mt-6 bg-gray-100 rounded-md p-4 border border-gray-300">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Info className="w-4 h-4 text-blue-500" />
                            Network Optimization Summary
                        </div>

                        {suggestions.length > 0 && (
                            <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-600">Suggestions:</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                    {suggestions.map((tip, idx) => (
                                        <li key={`suggestion-${idx}`}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {optimizationLog.length > 0 && (
                            <div>
                                <p className="text-sm font-semibold text-gray-600">Optimization Log:</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                    {optimizationLog.map((log, idx) => (
                                        <li key={`log-${idx}`}>{log}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
