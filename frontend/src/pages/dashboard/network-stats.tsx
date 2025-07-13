import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, } from "recharts";

const MAX_POINTS = 20;

type StatPoint = {
    time: string;
    speed: number;
};

const NetworkStats = () => {
    const [data, setData] = useState<StatPoint[]>([]);
    const [pingData, setPingData] = useState<StatPoint[]>([]);
    const [currentSpeed, setCurrentSpeed] = useState<number>(0);
    const [maxSpeed, setMaxSpeed] = useState<number>(0);
    const [uploadSpeed, setUploadSpeed] = useState<number>(0);
    const [ping, setPing] = useState<number | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/network-stats/");
                const {
                    download_speed,
                    upload_speed,
                    ping,
                } = res.data;

                const time = new Date().toLocaleTimeString();
                const downloadPoint = { time, speed: download_speed || 0 };
                const pingPoint = { time, speed: ping || 0 };

                setData(prev => {
                    const updated = [...prev, downloadPoint];
                    return updated.length > MAX_POINTS ? updated.slice(-MAX_POINTS) : updated;
                });

                setPingData(prev => {
                    const updated = [...prev, pingPoint];
                    return updated.length > MAX_POINTS ? updated.slice(-MAX_POINTS) : updated;
                });

                setCurrentSpeed(download_speed || 0);
                setUploadSpeed(upload_speed || 0);
                setPing(ping ?? null);
                setMaxSpeed(prevMax => Math.max(prevMax, download_speed || 0));
            } catch (err) {
                console.error("Failed to fetch network stats", err);
            }
        };

        const interval = setInterval(fetchStats, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4 px-2 pb-6">
            {/* Download Speed Graph */}
            <Card className="w-full">
                <CardHeader className="pb-1">
                    <CardTitle className="text-sm">Real-Time Download Speed</CardTitle>
                </CardHeader>
                <CardContent className="p-1">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" tick={{ fontSize: 8 }} />
                                <YAxis domain={[0, 'auto']} unit=" Mbps" tick={{ fontSize: 8 }} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="speed"
                                    stroke="#3b82f6"
                                    strokeWidth={1.5}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Ping Graph */}
            <Card className="w-full">
                <CardHeader className="pb-1">
                    <CardTitle className="text-sm">Real-Time Connection Delay (Ping)</CardTitle>
                </CardHeader>
                <CardContent className="p-1">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" tick={{ fontSize: 8 }} />
                                <YAxis domain={[0, 2000]} unit=" ms" tick={{ fontSize: 8 }} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="speed"
                                    stroke="#10b981"
                                    strokeWidth={1.5}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
                {[
                    { label: "Download Speed", value: `${currentSpeed} Mbps` },
                    { label: "Upload Speed", value: `${uploadSpeed} Mbps` },
                    { label: "Ping", value: ping !== null ? `${ping} ms` : "N/A" },
                    { label: "Max Download Speed", value: `${maxSpeed} Mbps` },
                ].map((stat, idx) => (
                    <Card key={idx}>
                        <CardHeader className="pb-1">
                            <CardTitle className="text-xs">{stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-base font-semibold">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NetworkStats;
