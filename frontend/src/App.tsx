import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard/dashboard";
import NetworkStats from "./pages/dashboard/network-stats";
import Optimizer from "./pages/dashboard/network-optimizer";
import Sidebar from "./pages/shared/sidebar";
import ProtectedRoute from "./assets/ProtectedRoute"; // adjust this based on your actual path

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route: Home */}
        <Route path="/" element={<Home />} />

        {/* Protected routes with sidebar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <WithSidebar>
                <Dashboard />
              </WithSidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/network-statistics"
          element={
            <ProtectedRoute>
              <WithSidebar>
                <NetworkStats />
              </WithSidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/network-optimizer"
          element={
            <ProtectedRoute>
              <WithSidebar>
                <Optimizer />
              </WithSidebar>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Layout wrapper with sidebar
function WithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}

export default App;
