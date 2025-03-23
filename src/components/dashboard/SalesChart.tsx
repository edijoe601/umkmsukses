import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { cn } from "../../lib/utils";

interface SalesChartProps {
  data?: {
    date: string;
    sales: number;
    orders: number;
  }[];
  title?: string;
  description?: string;
}

const defaultData = [
  { date: "1 Jun", sales: 1200000, orders: 12 },
  { date: "2 Jun", sales: 900000, orders: 8 },
  { date: "3 Jun", sales: 1500000, orders: 15 },
  { date: "4 Jun", sales: 800000, orders: 7 },
  { date: "5 Jun", sales: 1700000, orders: 18 },
  { date: "6 Jun", sales: 2000000, orders: 22 },
  { date: "7 Jun", sales: 1800000, orders: 20 },
  { date: "8 Jun", sales: 1600000, orders: 17 },
  { date: "9 Jun", sales: 1400000, orders: 14 },
  { date: "10 Jun", sales: 1900000, orders: 21 },
  { date: "11 Jun", sales: 2100000, orders: 24 },
  { date: "12 Jun", sales: 1300000, orders: 13 },
  { date: "13 Jun", sales: 1100000, orders: 11 },
  { date: "14 Jun", sales: 1000000, orders: 10 },
];

const SalesChart = ({
  data = defaultData,
  title = "Grafik Penjualan",
  description = "Analisis penjualan dan pesanan dalam periode tertentu",
}: SalesChartProps) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("bar");

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    if (timeRange === "7d") return data.slice(-7);
    if (timeRange === "14d") return data.slice(-14);
    return data; // 30d or all
  }, [data, timeRange]);

  // Format number to IDR currency
  const formatToIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-green-600">
            Penjualan: {formatToIDR(payload[0].value)}
          </p>
          <p className="text-sm text-blue-600">
            Pesanan: {payload[1]?.value} order
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Hari</SelectItem>
              <SelectItem value="14d">14 Hari</SelectItem>
              <SelectItem value="30d">30 Hari</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs value={chartType} onValueChange={setChartType} className="w-full">
          <TabsList className="grid w-[200px] grid-cols-2 mb-4">
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(value) => `${value / 1000000}jt`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  yAxisId="left"
                  dataKey="sales"
                  name="Penjualan"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="orders"
                  name="Pesanan"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="line" className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(value) => `${value / 1000000}jt`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  name="Penjualan"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Pesanan"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
