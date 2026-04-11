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
import Framework40Page from "./pages/Framework40Page";
import AIGovernancePage from "./pages/AIGovernancePage";
import AdvisoryPage from "./pages/AdvisoryPage";
import StatesPage from "./pages/StatesPage";
import MissouriPage from "./pages/MissouriPage";
import FounderPage from "./pages/FounderPage";
import OnboardingPage from "./pages/OnboardingPage";
import BookingPage from "./pages/BookingPage";
import EnrollPage from "./pages/EnrollPage";
import KCDinnerApril30Page from "./pages/KCDinnerApril30Page";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/sponsor" element={<SponsorPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/framework" element={<FrameworkPage />} />
          <Route path="/cohort" element={<CohortPage />} />
          <Route path="/framework-40" element={<Framework40Page />} />
          <Route path="/ai-governance" element={<AIGovernancePage />} />
          <Route path="/advisory" element={<AdvisoryPage />} />
          <Route path="/states" element={<StatesPage />} />
          <Route path="/states/missouri" element={<MissouriPage />} />
          <Route path="/dashboard" element={<StatesPage />} />
          <Route path="/george4" element={<FounderPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/enroll" element={<EnrollPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
