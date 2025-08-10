import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UI } from "../config/ui";
import ErrorBoundary from "../components/errors/ErrorBoundary";
import NiceFallback from "../components/errors/NiceFallback";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const { SIDEBAR_ENABLED } = UI;

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sidebarCollapsed") || "false");
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (SIDEBAR_ENABLED) {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    }
  }, [collapsed, SIDEBAR_ENABLED]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      <div className="flex">
        {/* Sidebar (condicional) */}
        {SIDEBAR_ENABLED && (
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        )}

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <Header
            // pasa si el sidebar está habilitado o no, para ocultar botones
            sidebarEnabled={SIDEBAR_ENABLED}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            openMobile={() => setMobileOpen(true)}
          />

          <main className="px-4 md:px-6 lg:px-10 py-6">
            <ErrorBoundary fallback={<NiceFallback />}>
              <Outlet />
            </ErrorBoundary>
          </main>

          <footer className="px-4 md:px-6 lg:px-10 py-4 text-xs text-neutral-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae temporibus minus neque? Alias qui tenetur itaque quo!
            Quaerat deleniti itaque blanditiis incidunt, at excepturi explicabo
            voluptatum error sapiente omnis. Molestias.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
