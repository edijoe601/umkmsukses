import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Truck,
  Package,
  Search,
  Printer,
  MapPin,
  Eye,
  AlertCircle,
} from "lucide-react";

interface Shipment {
  id: string;
  orderId: string;
  customer: string;
  address: string;
  courier: string;
  trackingNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  items: number;
}

const Pengiriman = () => {
  const [activeTab, setActiveTab] = useState("shipments");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample shipments data
  const shipments: Shipment[] = [
    {
      id: "SHP-001",
      orderId: "ORD-001",
      customer: "Budi Santoso",
      address: "Jl. Merdeka No. 123, Jakarta Selatan",
      courier: "JNE",
      trackingNumber: "JNE12345678",
      status: "delivered",
      date: "2023-06-15",
      items: 3,
    },
    {
      id: "SHP-002",
      orderId: "ORD-002",
      customer: "Siti Rahayu",
      address: "Jl. Pahlawan No. 45, Bandung",
      courier: "SiCepat",
      trackingNumber: "SC87654321",
      status: "shipped",
      date: "2023-06-14",
      items: 2,
    },
    {
      id: "SHP-003",
      orderId: "ORD-003",
      customer: "Ahmad Hidayat",
      address: "Jl. Diponegoro No. 78, Surabaya",
      courier: "JNT",
      trackingNumber: "JNT56781234",
      status: "processing",
      date: "2023-06-14",
      items: 1,
    },
    {
      id: "SHP-004",
      orderId: "ORD-004",
      customer: "Dewi Lestari",
      address: "Jl. Sudirman No. 90, Jakarta Pusat",
      courier: "Pos Indonesia",
      trackingNumber: "POS43218765",
      status: "pending",
      date: "2023-06-13",
      items: 4,
    },
    {
      id: "SHP-005",
      orderId: "ORD-005",
      customer: "Eko Prasetyo",
      address: "Jl. Gatot Subroto No. 55, Semarang",
      courier: "AnterAja",
      trackingNumber: "AA98761234",
      status: "cancelled",
      date: "2023-06-12",
      items: 2,
    },
  ];

  // Filter shipments based on search term
  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Status badge styles
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    delivered: "bg-green-100 text-green-800 hover:bg-green-100",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  // Status labels
  const statusLabels = {
    pending: "Menunggu",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Terkirim",
    cancelled: "Dibatalkan",
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sistem Pengiriman
          </h1>
          <p className="text-gray-500">
            Kelola pengiriman dan lacak status pesanan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Cetak Label
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Truck className="h-4 w-4 mr-2" />
            Pengiriman Baru
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
          <TabsTrigger value="shipments">
            <Truck className="h-4 w-4 mr-2" />
            Pengiriman
          </TabsTrigger>
          <TabsTrigger value="tracking">
            <Package className="h-4 w-4 mr-2" />
            Lacak Pesanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Daftar Pengiriman</CardTitle>
                <div className="w-64 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari pengiriman..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pengiriman</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Kurir</TableHead>
                    <TableHead>No. Resi</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">
                        {shipment.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{shipment.customer}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[200px]">
                            {shipment.address}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{shipment.courier}</TableCell>
                      <TableCell>{shipment.trackingNumber}</TableCell>
                      <TableCell>{shipment.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${statusStyles[shipment.status]} border-0`}
                        >
                          {statusLabels[shipment.status]}
                        </Badge>
                      </TableCell>
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
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                  Menunggu Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {shipments.filter((s) => s.status === "pending").length}
                </div>
                <p className="text-sm text-gray-500">Pesanan perlu dikirim</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-blue-500" />
                  Dalam Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {shipments.filter((s) => s.status === "shipped").length}
                </div>
                <p className="text-sm text-gray-500">Pesanan sedang dikirim</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-500" />
                  Terkirim Hari Ini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {
                    shipments.filter(
                      (s) =>
                        s.status === "delivered" && s.date === "2023-06-15",
                    ).length
                  }
                </div>
                <p className="text-sm text-gray-500">Pesanan telah diterima</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lacak Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Masukkan nomor resi" />
                  </div>
                  <Select defaultValue="jne">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih kurir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jne">JNE</SelectItem>
                      <SelectItem value="jnt">J&T</SelectItem>
                      <SelectItem value="sicepat">SiCepat</SelectItem>
                      <SelectItem value="pos">Pos Indonesia</SelectItem>
                      <SelectItem value="anteraja">AnterAja</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Lacak
                  </Button>
                </div>

                <Card className="border-dashed">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <MapPin className="h-12 w-12 text-gray-400" />
                      <div>
                        <h3 className="text-lg font-medium">
                          Lacak Status Pengiriman
                        </h3>
                        <p className="text-gray-500 mt-1">
                          Masukkan nomor resi dan pilih kurir untuk melacak
                          status pengiriman Anda
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pelacakan</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Resi</TableHead>
                    <TableHead>Kurir</TableHead>
                    <TableHead>Tanggal Pelacakan</TableHead>
                    <TableHead>Status Terakhir</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">JNE12345678</TableCell>
                    <TableCell>JNE</TableCell>
                    <TableCell>2023-06-15 14:30</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-0">
                        Terkirim
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SC87654321</TableCell>
                    <TableCell>SiCepat</TableCell>
                    <TableCell>2023-06-14 10:15</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800 border-0">
                        Dalam Pengiriman
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pengiriman;
