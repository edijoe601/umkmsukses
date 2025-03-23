import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Package, FileText, DollarSign } from "lucide-react";

const Produksi = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modul Produksi</h1>
          <p className="text-gray-500">
            Kelola bahan baku, kalkulasi HPP, dan laporan laba rugi
          </p>
        </div>
        <div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Tambah Produksi Baru
          </Button>
        </div>
      </div>

      <Tabs defaultValue="bahan-baku" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="bahan-baku">Bahan Baku</TabsTrigger>
          <TabsTrigger value="kalkulasi-hpp">Kalkulasi HPP</TabsTrigger>
          <TabsTrigger value="laporan">Laporan Laba Rugi</TabsTrigger>
        </TabsList>

        <TabsContent value="bahan-baku" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Input Bahan Baku
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">
                Kelola stok bahan baku untuk produksi
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Placeholder for bahan baku content */}
                <Card className="bg-gray-100 p-4 h-40 flex items-center justify-center">
                  <p className="text-gray-400">Form Input Bahan Baku</p>
                </Card>
                <Card className="bg-gray-100 p-4 h-40 flex items-center justify-center">
                  <p className="text-gray-400">Daftar Bahan Baku</p>
                </Card>
                <Card className="bg-gray-100 p-4 h-40 flex items-center justify-center">
                  <p className="text-gray-400">Riwayat Penggunaan</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kalkulasi-hpp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Kalkulasi Harga Pokok Produksi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">
                Hitung HPP dan tentukan harga jual produk
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Placeholder for HPP content */}
                <Card className="bg-gray-100 p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-400">Kalkulator HPP</p>
                </Card>
                <Card className="bg-gray-100 p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-400">Daftar Produk & Harga</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="laporan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Laporan Laba Rugi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">
                Analisis laba rugi dari produksi
              </p>
              <div className="w-full">
                {/* Placeholder for laporan content */}
                <Card className="bg-gray-100 p-4 h-80 flex items-center justify-center">
                  <p className="text-gray-400">
                    Grafik & Tabel Laporan Laba Rugi
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Produksi;
