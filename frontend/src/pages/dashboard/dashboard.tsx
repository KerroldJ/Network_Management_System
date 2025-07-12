import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Mon", speed: 20 },
    { name: "Tue", speed: 40 },
    { name: "Wed", speed: 30 },
    { name: "Thu", speed: 50 },
    { name: "Fri", speed: 60 },
    { name: "Sat", speed: 55 },
    { name: "Sun", speed: 70 },
];

const Dashboard = () => {
    return (
        <div className="space-y-6">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Network Speed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">70 Mbps</p>
                        <p className="text-sm text-muted-foreground">+15% this week</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">143</p>
                        <p className="text-sm text-muted-foreground">+5 users today</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Network Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-muted-foreground">in the last 24 hours</p>
                    </CardContent>
                </Card>
            </div>

            {/* Line Graph */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Weekly Network Speed</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="speed"
                                    stroke="#3b82f6"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
