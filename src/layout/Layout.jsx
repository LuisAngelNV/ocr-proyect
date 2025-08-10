import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/common/Header";
import { ToastProvider } from "../components/ui/ToastProvider";

const Layout = () => {
  return (
    <ToastProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              <Outlet />
            </div>
          </main>
          <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-center text-xs text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero fuga consequatur nulla explicabo accusamus fugiat consectetur ducimus sapiente. Iste laborum, exercitationem culpa ipsam nobis quae quaerat optio quisquam voluptates nam?
          </footer>
        </div>
      </div>
    </ToastProvider>
  );
};

export default Layout;
