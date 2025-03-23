import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Bell, Menu, Search, Settings, User } from "lucide-react";
import BusinessSummary from "./dashboard/BusinessSummary";
import SalesChart from "./dashboard/SalesChart";
import LowStockAlert from "./dashboard/LowStockAlert";
import RecentOrders from "./dashboard/RecentOrders";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ isOpen = true, onToggle = () => {} }: SidebarProps) => {
  const menuItems = [
    { name: "Dashboard", icon: "home", active: true },
    { name: "Produksi", icon: "package" },
    { name: "Point of Sale", icon: "shopping-cart" },
    { name: "Katalog Online", icon: "shopping-bag" },
    { name: "Pengiriman", icon: "truck" },
    { name: "Laporan", icon: "bar-chart-2" },
    { name: "Pengaturan", icon: "settings" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-2">
            US
          </div>
          <h1 className="text-lg font-bold">UMKM Sukses</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="py-4 px-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${item.active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span
                className={`mr-3 ${item.active ? "text-blue-600" : "text-gray-500"}`}
              >
                <i className={`lucide lucide-${item.icon}`}></i>
              </span>
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle = () => {} }: HeaderProps) => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative ml-4 md:ml-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium mr-2">
            <User className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <Header onMenuToggle={toggleSidebar} />

      <main
        className={`pt-16 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
        </div>
      </main>
    </div>
  );
};

export default Home;
