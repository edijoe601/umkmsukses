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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Store,
  Package,
  Tag,
  ShoppingBag,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;
  image: string;
  status: "published" | "draft";
  featured: boolean;
}

const Katalog = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Kopi Arabica Premium",
      price: 85000,
      stock: 25,
      category: "Kopi",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
      status: "published",
      featured: true,
    },
    {
      id: "2",
      name: "Kopi Robusta Pilihan",
      price: 65000,
      discountPrice: 55000,
      stock: 18,
      category: "Kopi",
      image:
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&q=80",
      status: "published",
      featured: false,
    },
    {
      id: "3",
      name: "Teh Hijau Organik",
      price: 45000,
      stock: 32,
      category: "Teh",
      image:
        "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=200&q=80",
      status: "published",
      featured: false,
    },
    {
      id: "4",
      name: "Brownies Coklat",
      price: 55000,
      stock: 15,
      category: "Kue",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&q=80",
      status: "draft",
      featured: false,
    },
    {
      id: "5",
      name: "Roti Gandum",
      price: 35000,
      stock: 20,
      category: "Roti",
      image:
        "https://images.unsplash.com/photo-1600352712371-15fd49ca42d4?w=200&q=80",
      status: "published",
      featured: true,
    },
    {
      id: "6",
      name: "Croissant Butter",
      price: 25000,
      stock: 28,
      category: "Roti",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80",
      status: "published",
      featured: false,
    },
  ];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Katalog Online</h1>
          <p className="text-gray-500">
            Kelola produk dan promosi untuk toko online Anda
          </p>
        </div>
        <div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Produk
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="products">
            <Package className="h-4 w-4 mr-2" />
            Produk
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Tag className="h-4 w-4 mr-2" />
            Kategori
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Pesanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Daftar Produk</CardTitle>
                <div className="w-64">
                  <Input
                    placeholder="Cari produk..."
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
                    <TableHead>Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className="h-10 w-10 rounded bg-cover bg-center mr-3"
                            style={{ backgroundImage: `url(${product.image})` }}
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            {product.featured && (
                              <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800 border-0 mt-1"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <div>
                          {product.discountPrice ? (
                            <>
                              <span className="text-gray-500 line-through text-sm">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }).format(product.price)}
                              </span>
                              <br />
                              <span className="font-medium">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }).format(product.discountPrice)}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(product.price)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${product.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} border-0`}
                        >
                          {product.status === "published"
                            ? "Dipublikasikan"
                            : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Promosi Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">Diskon 10%</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Untuk semua produk kopi
                    </p>
                    <Badge className="bg-white text-blue-700">
                      Aktif hingga 30 Juni
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">Beli 2 Gratis 1</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Untuk semua produk roti
                    </p>
                    <Badge className="bg-white text-purple-700">
                      Aktif hingga 15 Juni
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4">
                  <Button variant="ghost">
                    <Plus className="h-5 w-5 mr-2" />
                    Tambah Promosi
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kategori Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Kopi</h3>
                      <Badge>12 produk</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Teh</h3>
                      <Badge>8 produk</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Roti</h3>
                      <Badge>15 produk</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Kue</h3>
                      <Badge>10 produk</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4">
                  <Button variant="ghost">
                    <Plus className="h-5 w-5 mr-2" />
                    Tambah Kategori
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pesanan Online</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pesanan</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">ORD-001</TableCell>
                    <TableCell>Budi Santoso</TableCell>
                    <TableCell>2023-06-15</TableCell>
                    <TableCell>Rp 450.000</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-0">
                        Selesai
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
                    <TableCell className="font-medium">ORD-002</TableCell>
                    <TableCell>Siti Rahayu</TableCell>
                    <TableCell>2023-06-14</TableCell>
                    <TableCell>Rp 275.000</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800 border-0">
                        Dikirim
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
                    <TableCell className="font-medium">ORD-003</TableCell>
                    <TableCell>Ahmad Hidayat</TableCell>
                    <TableCell>2023-06-14</TableCell>
                    <TableCell>Rp 125.000</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800 border-0">
                        Diproses
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

export default Katalog;
