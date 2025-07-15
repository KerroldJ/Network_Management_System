import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const MAX_POINTS = 20;

type StatPoint = {
    time: string;
    speed: number;
};

const NetworkStats = () => {
    const [data, setData] = useState<StatPoint[]>([]);
    const [pingData, setPingData] = useState<StatPoint[]>([]);
    const [currentSpeed, setCurrentSpeed] = useState<number>(0);
    const [uploadSpeed, setUploadSpeed] = useState<number>(0);
    const [ping, setPing] = useState<number | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [maxSpeed, setMaxSpeed] = useState<number>(0);

    useEffect(() => {
        let cancelSource = axios.CancelToken.source();
        let isMounted = true;

        const fetchStats = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/network-stats/", {
                    cancelToken: cancelSource.token,
                });

                if (!isMounted) return;

                const {
                    download_speed,
                    upload_speed,
                    ping,
                    status,
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
                setStatus(status || null);
                setMaxSpeed(prev => Math.max(prev, download_speed || 0));

            } catch (err: any) {
                if (axios.isCancel(err)) {
                    console.log("Request canceled", err.message);
                } else {
                    console.error("Failed to fetch network stats", err);
                }
            } finally {
                if (isMounted) {
                    setTimeout(fetchStats, 3000); // Wait 3s after finishing before next request
                }
            }
        };

        fetchStats(); // Initial fetch

        return () => {
            isMounted = false;
            cancelSource.cancel("Component unmounted");
        };
    }, []);

    // Color for current speed quality
    const getSpeedColor = () => {
        if (currentSpeed > 20) return "#22c55e"; // green
        if (currentSpeed > 5) return "#facc15";  // yellow
        return "#ef4444"; // red
    };

    return (
        <div className="space-y-4 px-2 pb-6">
            {/* Download Speed Chart */}
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
                                <YAxis
                                    domain={[0, Math.max(50, maxSpeed + 10)]}
                                    unit=" Mbps"
                                    tick={{ fontSize: 8 }}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="speed"
                                    stroke={getSpeedColor()}
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Ping Chart */}
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
                                <YAxis
                                    domain={[0, 2000]}
                                    unit=" ms"
                                    tick={{ fontSize: 8 }}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="speed"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
                {[
                    { label: "Download Speed", value: `${currentSpeed} Mbps` },
                    { label: "Upload Speed", value: `${uploadSpeed} Mbps` },
                    { label: "Ping", value: ping !== null ? `${ping} ms` : "N/A" },
                    { label: "Max Download Speed", value: `${maxSpeed} Mbps` },
                    { label: "Status", value: status || "N/A" },
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
