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
import { AlertCircle, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  category: string;
  status: "critical" | "low" | "normal";
  lastUpdated: string;
}

interface LowStockAlertProps {
  items?: StockItem[];
  onRestock?: (itemId: string) => void;
  className?: string;
}

const LowStockAlert = ({
  items = defaultItems,
  onRestock = () => {},
  className,
}: LowStockAlertProps) => {
  return (
    <Card className={cn("h-full bg-white", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Low Stock Alert</CardTitle>
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>
              {items.filter((item) => item.status === "critical").length}{" "}
              Critical
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="max-h-[280px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {item.currentStock} / {item.minStock}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "critical"
                          ? "destructive"
                          : item.status === "low"
                            ? "warning"
                            : "outline"
                      }
                      className={cn(
                        "capitalize",
                        item.status === "critical"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : item.status === "low"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "",
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onRestock(item.id)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Restock</span>
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

const defaultItems: StockItem[] = [
  {
    id: "1",
    name: "Kopi Arabica",
    currentStock: 5,
    minStock: 20,
    category: "Bahan Baku",
    status: "critical",
    lastUpdated: "2023-06-15",
  },
  {
    id: "2",
    name: "Gula Aren",
    currentStock: 8,
    minStock: 15,
    category: "Bahan Baku",
    status: "critical",
    lastUpdated: "2023-06-14",
  },
  {
    id: "3",
    name: "Kemasan Botol 250ml",
    currentStock: 25,
    minStock: 50,
    category: "Packaging",
    status: "low",
    lastUpdated: "2023-06-13",
  },
  {
    id: "4",
    name: "Label Stiker",
    currentStock: 120,
    minStock: 200,
    category: "Packaging",
    status: "low",
    lastUpdated: "2023-06-12",
  },
  {
    id: "5",
    name: "Susu Kental Manis",
    currentStock: 18,
    minStock: 20,
    category: "Bahan Baku",
    status: "normal",
    lastUpdated: "2023-06-11",
  },
];

export default LowStockAlert;
