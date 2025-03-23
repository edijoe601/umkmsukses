import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, Package, Truck } from "lucide-react";

interface OrderStatus {
  value: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  label: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: OrderStatus;
  items: number;
}

interface RecentOrdersProps {
  orders?: Order[];
  title?: string;
  subtitle?: string;
}

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  delivered: "bg-green-100 text-green-800 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
};

const statusIcons = {
  pending: null,
  processing: <Package className="h-3 w-3 mr-1" />,
  shipped: <Truck className="h-3 w-3 mr-1" />,
  delivered: null,
  cancelled: null,
};

const RecentOrders = ({
  orders = [
    {
      id: "ORD-001",
      customer: "Budi Santoso",
      date: "2023-06-15",
      amount: 450000,
      status: { value: "delivered", label: "Terkirim" },
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Siti Rahayu",
      date: "2023-06-14",
      amount: 275000,
      status: { value: "shipped", label: "Dikirim" },
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Ahmad Hidayat",
      date: "2023-06-14",
      amount: 125000,
      status: { value: "processing", label: "Diproses" },
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "Dewi Lestari",
      date: "2023-06-13",
      amount: 560000,
      status: { value: "pending", label: "Menunggu" },
      items: 4,
    },
    {
      id: "ORD-005",
      customer: "Eko Prasetyo",
      date: "2023-06-12",
      amount: 320000,
      status: { value: "cancelled", label: "Dibatalkan" },
      items: 2,
    },
  ],
  title = "Pesanan Terbaru",
  subtitle = "Daftar 5 pesanan terbaru dari pelanggan",
}: RecentOrdersProps) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID Pesanan</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(order.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusStyles[order.status.value]} border-0 font-normal`}
                    >
                      {statusIcons[order.status.value]}
                      {order.status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
