import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupComplete from "./pages/SignupComplete";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Memberships from "./pages/Memberships";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";

// --- ADDED: Simple Modal Styling (can move to CSS file) ---
const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};
const modalContentStyle: React.CSSProperties = {
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  textAlign: "center",
  minWidth: "300px",
};

// --- END MODAL STYLING ---

const queryClient = new QueryClient();

const App = () => {
  // Popup state for "Remove Ad Space"
  const [showAdPopup, setShowAdPopup] = useState(false);

  useEffect(() => {
    // Show the Remove Ad Space popup when the site loads
    setShowAdPopup(true);
  }, []);

  // Simulate removing ad space (you can expand this to actually remove an ad component)
  const handleRemoveAd = () => {
    setShowAdPopup(false);
    // TODO: Optionally trigger additional logic to remove ads from the DOM
  };

  // Make all buttons functional: this is a helper to wrap children with a click handler if not already
  // For full button coverage, ensure all buttons in routed components have handlers or fallback here.

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AdminProvider>
            <Toaster />
            <Sonner />
            {/* Ad Popup Modal */}
            {showAdPopup && (
              <div style={modalStyle}>
                <div style={modalContentStyle}>
                  <h2>Remove Ad Space</h2>
                  <p>Would you like to remove the ad space?</p>
                  <button
                    onClick={handleRemoveAd}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "#2d6a4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-complete" element={<SignupComplete />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/memberships" element={<Memberships />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/secure/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AdminProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
