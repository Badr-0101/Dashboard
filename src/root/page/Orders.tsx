import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/shared/ui/table';
import { Button } from '@components/shared/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/shared/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ordersData } from '@data/dummy';

const Orders = () => {
  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 2. Pagination Logic
  const totalPages = Math.ceil(ordersData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return ordersData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="m-2 md:m-10 mt-24 p-3 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Orders
        </h3>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table className="min-w-[900px] text-sm md:text-base">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="md:table-cell">Items</TableHead>
              <TableHead className="md:table-cell">Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((order) => (
              <TableRow key={order.OrderID}>
                <TableCell className="font-medium">{order.OrderID}</TableCell>
                <TableCell>{order.CustomerName}</TableCell>
                <TableCell>${order.TotalAmount.toFixed(2)}</TableCell>
                <TableCell className="md:table-cell">
                  {order.OrderItems}
                </TableCell>
                <TableCell className="md:table-cell">
                  {order.Location}
                </TableCell>
                <TableCell>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
                    style={{ backgroundColor: order.StatusBg }}
                  >
                    {order.Status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3. Pagination Controls */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Rows per page:
          </span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
