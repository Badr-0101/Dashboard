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
import { Input } from '@components/shared/ui/input';
import { Checkbox } from '@components/shared/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/shared/ui/select';
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Search,
} from 'lucide-react';
import { customersData } from '@data/dummy';

type Customer = (typeof customersData)[number];

type SortConfig = {
  key: keyof Customer | null;
  direction: 'asc' | 'desc';
};

const customersGrid: { field: keyof Customer; headerText: string }[] = [
  { field: 'CustomerID', headerText: 'ID' },
  { field: 'CustomerName', headerText: 'Name' },
  { field: 'CustomerEmail', headerText: 'Email' },
  { field: 'ProjectName', headerText: 'Project' },
  { field: 'Status', headerText: 'Status' },
  { field: 'Weeks', headerText: 'Weeks' },
  { field: 'Budget', headerText: 'Budget' },
  { field: 'Location', headerText: 'Location' },
];

const Customers = () => {
  const [data, setData] = useState<Customer[]>(customersData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: keyof Customer) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedRows(new Set(paginatedData.map((i) => i.CustomerID)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: number, checked: boolean | 'indeterminate') => {
    const updated = new Set(selectedRows);
    if (checked === true) {
      updated.add(id);
    } else {
      updated.delete(id);
    }
    setSelectedRows(updated);
  };

  const handleDelete = () => {
    setData((prev) =>
      prev.filter((item) => !selectedRows.has(item.CustomerID)),
    );
    setSelectedRows(new Set());
    setCurrentPage(1);
  };

  const getStatusColor = (status: Customer['Status']) => {
    const colors: Record<string, string> = {
      Active:
        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      Pending:
        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      Completed:
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      Cancel: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
      colors[status] ||
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    );
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl transition-colors">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Customers
        </h3>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 dark:bg-main-dark-bg dark:border-gray-700"
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            disabled={selectedRows.size === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto dark:border-gray-700">
        <Table className="min-w-[1000px]">
          <TableHeader className="bg-gray-50 dark:bg-main-dark-bg">
            <TableRow className="dark:border-gray-700">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginatedData.length > 0 &&
                    selectedRows.size === paginatedData.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {customersGrid.map((col) => (
                <TableHead
                  key={col.field}
                  onClick={() => handleSort(col.field)}
                  className="cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    {col.headerText}
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((customer) => (
                <TableRow
                  key={customer.CustomerID}
                  className="dark:border-gray-700 dark:hover:bg-gray-800/50"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(customer.CustomerID)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(customer.CustomerID, checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-500 dark:text-gray-400">
                    {customer.CustomerID}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.CustomerImage}
                        alt={customer.CustomerName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-900 dark:text-gray-200">
                        {customer.CustomerName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.CustomerEmail}</TableCell>
                  <TableCell>{customer.ProjectName}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        customer.Status,
                      )}`}
                    >
                      {customer.Status}
                    </span>
                  </TableCell>
                  <TableCell>{customer.Weeks}</TableCell>
                  <TableCell>{customer.Budget}</TableCell>
                  <TableCell>{customer.Location}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-gray-500"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Rows per page:
          </span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(v) => {
              setItemsPerPage(Number(v));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20 dark:bg-main-dark-bg dark:border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="dark:border-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="dark:border-gray-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
