import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  BarChart2,
  Download,
  FileText,
  PieChart as PieChartIcon,
  TrendingUp,
} from "lucide-react";

const Laporan = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [reportType, setReportType] = useState("penjualan");

  // Sample sales data
  const salesData = [
    { month: "Jan", penjualan: 12500000, biaya: 8000000, profit: 4500000 },
    { month: "Feb", penjualan: 15000000, biaya: 9500000, profit: 5500000 },
    { month: "Mar", penjualan: 18000000, biaya: 11000000, profit: 7000000 },
    { month: "Apr", penjualan: 16500000, biaya: 10200000, profit: 6300000 },
    { month: "Mei", penjualan: 19500000, biaya: 12000000, profit: 7500000 },
    { month: "Jun", penjualan: 22000000, biaya: 13500000, profit: 8500000 },
  ];

  // Sample product category data
  const categoryData = [
    { name: "Kopi", value: 45 },
    { name: "Teh", value: 20 },
    { name: "Roti", value: 25 },
    { name: "Kue", value: 10 },
  ];

  // Sample top products data
  const topProductsData = [
    {
      id: "1",
      name: "Kopi Arabica Premium",
      sold: 120,
      revenue: 10200000,
      profit: 4080000,
    },
    {
      id: "2",
      name: "Kopi Robusta Pilihan",
      sold: 95,
      revenue: 6175000,
      profit: 2470000,
    },
    {
      id: "3",
      name: "Teh Hijau Organik",
      sold: 85,
      revenue: 3825000,
      profit: 1530000,
    },
    {
      id: "4",
      name: "Brownies Coklat",
      sold: 75,
      revenue: 4125000,
      profit: 1650000,
    },
    {
      id: "5",
      name: "Roti Gandum",
      sold: 65,
      revenue: 2275000,
      profit: 910000,
    },
  ];

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          {payload.map((entry: any, index: number) => (
            <p
              key={`item-${index}`}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {formatToIDR(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-500">
            Analisis penjualan, biaya, dan profit bisnis Anda
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <FileText className="h-4 w-4 mr-2" />
            Laporan Lengkap
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Laporan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="penjualan">Penjualan</SelectItem>
            <SelectItem value="produk">Produk</SelectItem>
            <SelectItem value="keuangan">Keuangan</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Minggu Ini</SelectItem>
            <SelectItem value="month">Bulan Ini</SelectItem>
            <SelectItem value="quarter">Kuartal Ini</SelectItem>
            <SelectItem value="year">Tahun Ini</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="overview">
            <BarChart2 className="h-4 w-4 mr-2" />
            Ikhtisar
          </TabsTrigger>
          <TabsTrigger value="products">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Produk
          </TabsTrigger>
          <TabsTrigger value="trends">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tren
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Penjualan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {formatToIDR(
                    salesData.reduce((sum, item) => sum + item.penjualan, 0),
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Periode:{" "}
                  {timeRange === "month"
                    ? "Bulan Ini"
                    : timeRange === "week"
                      ? "Minggu Ini"
                      : timeRange === "quarter"
                        ? "Kuartal Ini"
                        : "Tahun Ini"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Biaya</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {formatToIDR(
                    salesData.reduce((sum, item) => sum + item.biaya, 0),
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Periode:{" "}
                  {timeRange === "month"
                    ? "Bulan Ini"
                    : timeRange === "week"
                      ? "Minggu Ini"
                      : timeRange === "quarter"
                        ? "Kuartal Ini"
                        : "Tahun Ini"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {formatToIDR(
                    salesData.reduce((sum, item) => sum + item.profit, 0),
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Periode:{" "}
                  {timeRange === "month"
                    ? "Bulan Ini"
                    : timeRange === "week"
                      ? "Minggu Ini"
                      : timeRange === "quarter"
                        ? "Kuartal Ini"
                        : "Tahun Ini"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grafik Penjualan dan Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000000}jt`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="penjualan"
                      name="Penjualan"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="biaya"
                      name="Biaya"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="profit"
                      name="Profit"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Penjualan per Kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produk Terlaris</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead>Terjual</TableHead>
                      <TableHead>Pendapatan</TableHead>
                      <TableHead>Profit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProductsData.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.sold} unit</TableCell>
                        <TableCell>{formatToIDR(product.revenue)}</TableCell>
                        <TableCell>{formatToIDR(product.profit)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tren Penjualan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000000}jt`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="penjualan"
                      name="Penjualan"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      name="Profit"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analisis Pertumbuhan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">
                      Pertumbuhan Penjualan
                    </h3>
                    <div className="text-3xl font-bold text-blue-600">
                      +15.8%
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Dibandingkan bulan lalu
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">
                      Pertumbuhan Pelanggan
                    </h3>
                    <div className="text-3xl font-bold text-purple-600">
                      +8.2%
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Dibandingkan bulan lalu
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1">
                      Pertumbuhan Profit
                    </h3>
                    <div className="text-3xl font-bold text-green-600">
                      +12.5%
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Dibandingkan bulan lalu
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Laporan;
