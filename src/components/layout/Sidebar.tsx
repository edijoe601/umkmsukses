import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Store,
  Truck,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Package, label: "Produksi", path: "/produksi" },
    { icon: ShoppingCart, label: "Point of Sale", path: "/pos" },
    { icon: Store, label: "Katalog Online", path: "/katalog" },
    { icon: Truck, label: "Pengiriman", path: "/pengiriman" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Pengaturan", path: "/pengaturan" },
    { icon: HelpCircle, label: "Bantuan", path: "/bantuan" },
    { icon: LogOut, label: "Keluar", path: "/logout" },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col justify-between h-full w-[280px] bg-white border-r border-gray-200 p-4",
        className,
      )}
    >
      <div>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold">US</span>
          </div>
          <h1 className="text-xl font-bold">UMKM Sukses</h1>
        </div>

        <Separator className="my-4" />

        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100",
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <Separator className="my-4" />
        <nav className="space-y-1">
          {bottomNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100",
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 px-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=umkm"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Budi Santoso</p>
                <p className="text-xs text-gray-500">Toko Makmur Jaya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
