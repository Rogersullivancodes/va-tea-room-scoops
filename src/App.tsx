import ArticleDetail from "./pages/ArticleDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
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
              <Route path="/articles" element={<Articles />} /><Route path="/articles" element={<Articles />} />
<Route path="/articles/:articleSlug" element={<ArticleDetail />} /> {/* ADD THIS */}
<Route path="/secure/admin" element={<AdminLogin />} />
              <Route path="/secure/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes><Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* ADD THIS */}
<Route path="/terms-of-use" element={<TermsOfUse />} />     {/* ADD THIS */}
<Route path="/memberships" element={<Memberships />} />
          </BrowserRouter>
        </AdminProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
