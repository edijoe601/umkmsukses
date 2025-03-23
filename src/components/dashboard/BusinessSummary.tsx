import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

interface BusinessMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  description: string;
}

interface BusinessSummaryProps {
  metrics?: BusinessMetric[];
}

const BusinessSummary = ({ metrics }: BusinessSummaryProps) => {
  const defaultMetrics: BusinessMetric[] = [
    {
      title: "Total Penjualan",
      value: "Rp 12.500.000",
      change: 12.5,
      icon: <DollarSign className="h-5 w-5" />,
      description: "Dibandingkan bulan lalu",
    },
    {
      title: "Profit",
      value: "Rp 4.250.000",
      change: 8.2,
      icon: <DollarSign className="h-5 w-5" />,
      description: "Dibandingkan bulan lalu",
    },
    {
      title: "Pesanan",
      value: "145",
      change: -3.5,
      icon: <ShoppingCart className="h-5 w-5" />,
      description: "Dibandingkan bulan lalu",
    },
    {
      title: "Pelanggan",
      value: "78",
      change: 15.3,
      icon: <Users className="h-5 w-5" />,
      description: "Dibandingkan bulan lalu",
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {displayMetrics.map((metric, index) => (
          <Card key={index} className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-700">
                {metric.title}
              </CardTitle>
              <div className="p-2 bg-gray-100 rounded-full">{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center mt-1 text-xs">
                <span
                  className={cn(
                    "flex items-center",
                    metric.change > 0 ? "text-green-600" : "text-red-600",
                  )}
                >
                  {metric.change > 0 ? (
                    <ArrowUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </span>
                <span className="ml-2 text-gray-500">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessSummary;
