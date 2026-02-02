import { Doc } from "../../convex/_generated/dataModel";

interface DashboardProps {
  application: Doc<"applications">;
  onSignOut: () => void;
}

type ApplicationStatus = "pending" | "reviewing" | "accepted" | "rejected";

const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: string; message: string }> = {
  pending: {
    label: "Pending Review",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "⏳",
    message: "Your application has been received. We'll review it shortly.",
  },
  reviewing: {
    label: "Under Review",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "🔍",
    message: "Great news! Our team is currently reviewing your application.",
  },
  accepted: {
    label: "Accepted",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "🎉",
    message: "Congratulations! You've been accepted to YClaw W26!",
  },
  rejected: {
    label: "Not Selected",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: "💫",
    message: "Unfortunately, we weren't able to move forward this time. Keep building!",
  },
};

export function Dashboard({ application, onSignOut }: DashboardProps) {
  const status = statusConfig[application.status as ApplicationStatus];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white text-lg font-bold">Y</span>
            </div>
            <span className="text-orange-500 text-xl font-bold tracking-tight">Clawbinator</span>
          </div>
          <button
            onClick={onSignOut}
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Status Banner */}
          <div className={`rounded-2xl p-6 mb-8 border ${status.color}`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{status.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{status.label}</h2>
                <p className="opacity-80">{status.message}</p>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-extrabold text-gray-900">Your Application</h1>
              <span className="text-sm text-gray-500">
                Submitted {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-8">
              {/* Company Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Company</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Company Name</label>
                    <p className="text-lg font-semibold text-gray-900">{application.companyName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Agent Type</label>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{application.agentType}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500">Tagline</label>
                    <p className="text-lg font-semibold text-gray-900">{application.tagline}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500">Description</label>
                    <p className="text-gray-700 leading-relaxed">{application.description}</p>
                  </div>
                  {application.website && (
                    <div>
                      <label className="text-sm text-gray-500">Website</label>
                      <p>
                        <a
                          href={application.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:text-orange-600 font-medium"
                        >
                          {application.website}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Founder Section */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Founder</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="text-lg font-semibold text-gray-900">{application.founderName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="text-lg font-semibold text-gray-900">{application.founderEmail}</p>
                  </div>
                </div>
              </div>

              {/* Stage Section */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Stage</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Current Stage</label>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{application.stage}</p>
                  </div>
                  {application.funding && (
                    <div>
                      <label className="text-sm text-gray-500">Previous Funding</label>
                      <p className="text-lg font-semibold text-gray-900">{application.funding}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Application Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Application Submitted</p>
                  <p className="text-sm text-gray-500">{new Date(application.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="ml-5 w-px h-6 bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  application.status !== "pending" ? "bg-green-100" : "bg-gray-100"
                }`}>
                  <span className={application.status !== "pending" ? "text-green-600" : "text-gray-400"}>
                    {application.status !== "pending" ? "✓" : "○"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${application.status !== "pending" ? "text-gray-900" : "text-gray-400"}`}>
                    Initial Review
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.status !== "pending" ? "Completed" : "Waiting..."}
                  </p>
                </div>
              </div>
              <div className="ml-5 w-px h-6 bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  application.status === "accepted" || application.status === "rejected" ? "bg-green-100" : "bg-gray-100"
                }`}>
                  <span className={application.status === "accepted" || application.status === "rejected" ? "text-green-600" : "text-gray-400"}>
                    {application.status === "accepted" || application.status === "rejected" ? "✓" : "○"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${application.status === "accepted" || application.status === "rejected" ? "text-gray-900" : "text-gray-400"}`}>
                    Final Decision
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.status === "accepted" ? "Accepted!" : application.status === "rejected" ? "Decision made" : "Pending..."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Requested by <a href="https://twitter.com/OxPaulius" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">@OxPaulius</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">@clonkbot</a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
