import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import SponsorPage from "./pages/SponsorPage";
import EventsPage from "./pages/EventsPage";
import FrameworkPage from "./pages/FrameworkPage";
import CohortPage from "./pages/CohortPage";
import StatesPage from "./pages/StatesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/sponsor" element={<SponsorPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/framework" element={<FrameworkPage />} />
          <Route path="/cohort" element={<CohortPage />} />
          <Route path="/states" element={<StatesPage />} />
          <Route path="/dashboard" element={<StatesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
