import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Bell, Menu, Search, Settings, User, ArrowRight } from "lucide-react";
import BusinessSummary from "./dashboard/BusinessSummary";
import SalesChart from "./dashboard/SalesChart";
import LowStockAlert from "./dashboard/LowStockAlert";
import RecentOrders from "./dashboard/RecentOrders";
import { Link } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <Sidebar className={sidebarOpen ? "" : "hidden"} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header userName="Budi Santoso" notificationCount={3} />

          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-gray-500">
                    Selamat datang kembali, lihat ringkasan bisnis Anda
                  </p>
                </div>
                <div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Laporan Lengkap
                  </Button>
                </div>
              </div>

              <BusinessSummary />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SalesChart />
                </div>
                <div>
                  <LowStockAlert />
                </div>
              </div>

              <RecentOrders />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <Link to="/produksi">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            Modul Produksi
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Kelola bahan baku dan HPP
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/pos">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Point of Sale</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Kelola transaksi penjualan
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/katalog">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            Katalog Online
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Kelola produk dan promosi
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/pengiriman">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            Sistem Pengiriman
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Kelola pengiriman pesanan
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/laporan">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Laporan</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Analisis bisnis dan profit
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
