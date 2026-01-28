import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@store/typehook';
import {
  Ecommerce,
  Orders,
  Kanban,
  Employees,
  Editor,
  Calendar,
  Customers,
} from './root/page/index';
import { Area, Line, Bar, Pie } from './root/page/Charts/index';
import Sidebar from './components/shared/ui/Sidebar';
import Navbar from '@components/shared/ui/Navbar';
import { useEffect } from 'react';

function App() {
  const { isDarkMode } = useAppSelector((state) => state.themeSlice);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return (
    <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        {/* Sidebar - always rendered, visibility controlled by CSS */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1 min-h-screen bg-main-bg dark:bg-main-dark-bg w-full lg:w-auto">
          {/* Navbar */}
          <div className="fixed top-0 right-0 left-0 lg:left-72 bg-main-bg dark:bg-main-dark-bg navbar z-30">
            <Navbar />
          </div>

          {/* Page content */}
          <div className="mt-20 px-4 lg:px-8">
            <Routes>
              {/* dashboard */}
              <Route path="/" element={<Ecommerce />} />
              <Route path="/ecommerce" element={<Ecommerce />} />

              {/* pages */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />

              {/* apps */}
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/calendar" element={<Calendar />} />

              {/* charts */}
              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
