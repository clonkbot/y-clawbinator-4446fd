import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { LandingPage } from "./components/LandingPage";
import { ApplicationForm } from "./components/ApplicationForm";
import { Dashboard } from "./components/Dashboard";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();
  const [showApplication, setShowApplication] = useState(false);
  const application = useQuery(api.applications.getUserApplication);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 relative animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-3xl font-bold">Y</span>
            </div>
          </div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      signIn("workos");
    } else {
      setShowApplication(true);
    }
  };

  const handleBack = () => {
    setShowApplication(false);
  };

  // Show dashboard if user has an application
  if (isAuthenticated && application) {
    return (
      <Dashboard
        application={application}
        onSignOut={() => signOut()}
      />
    );
  }

  // Show application form
  if (isAuthenticated && showApplication) {
    return (
      <ApplicationForm
        onBack={handleBack}
        onSignOut={() => signOut()}
      />
    );
  }

  // Show landing page
  return (
    <LandingPage
      isAuthenticated={isAuthenticated}
      onApply={handleApply}
      onSignIn={() => signIn("workos")}
      onSignOut={() => signOut()}
    />
  );
}

export default App;
