import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Kopi Arabica",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
      category: "Minuman",
    },
    {
      id: "2",
      name: "Kopi Robusta",
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&q=80",
      category: "Minuman",
    },
    {
      id: "3",
      name: "Teh Hijau",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=200&q=80",
      category: "Minuman",
    },
    {
      id: "4",
      name: "Brownies",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&q=80",
      category: "Makanan",
    },
    {
      id: "5",
      name: "Roti Bakar",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1600352712371-15fd49ca42d4?w=200&q=80",
      category: "Makanan",
    },
    {
      id: "6",
      name: "Croissant",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80",
      category: "Makanan",
    },
  ];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Add product to cart
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    }
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Point of Sale</h1>
            <p className="text-gray-500">
              Kelola transaksi penjualan dengan mudah
            </p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari produk..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => addToCart(product)}
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <CardContent className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <span className="font-bold text-blue-600">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
            <h2 className="text-lg font-bold">Keranjang Belanja</h2>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Keranjang kosong</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div
                    className="h-12 w-12 bg-cover bg-center rounded"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="ml-3 flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, item.quantity - 1);
                      }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 w-6 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, item.quantity + 1);
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-2 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pajak (10%)</span>
              <span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(total * 0.1)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-blue-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(total * 1.1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full">
                Simpan
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Printer className="h-4 w-4 mr-2" />
                Bayar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
