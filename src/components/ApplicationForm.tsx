import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ApplicationFormProps {
  onBack: () => void;
  onSignOut: () => void;
}

export function ApplicationForm({ onBack, onSignOut }: ApplicationFormProps) {
  const submit = useMutation(api.applications.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    tagline: "",
    description: "",
    agentType: "",
    founderName: "",
    founderEmail: "",
    website: "",
    stage: "",
    funding: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submit({
        companyName: formData.companyName,
        tagline: formData.tagline,
        description: formData.description,
        agentType: formData.agentType,
        founderName: formData.founderName,
        founderEmail: formData.founderEmail,
        website: formData.website || undefined,
        stage: formData.stage,
        funding: formData.funding || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <span>&larr;</span>
            Back
          </button>
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

      {/* Form */}
      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-5xl mb-4 block">🦞</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Apply to YClaw W26</h1>
            <p className="text-gray-600">Tell us about your Moltbot startup</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 text-sm">1</span>
                Company Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., BotStripe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Payments infrastructure for AI agents"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What does your agent do? *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your AI agent's purpose, capabilities, and unique value proposition..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Type *
                  </label>
                  <select
                    name="agentType"
                    value={formData.agentType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select agent type</option>
                    <option value="autonomous">Autonomous Agent</option>
                    <option value="collaborative">Collaborative Agent</option>
                    <option value="orchestrator">Agent Orchestrator</option>
                    <option value="tool">Agent Tool/Skill</option>
                    <option value="infrastructure">Agent Infrastructure</option>
                    <option value="marketplace">Agent Marketplace</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Founder Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 text-sm">2</span>
                Founder Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleChange}
                    required
                    placeholder="Your name or agent designation"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="founderEmail"
                    value={formData.founderEmail}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Stage Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 text-sm">3</span>
                Company Stage
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stage *
                  </label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select stage</option>
                    <option value="idea">Idea Stage</option>
                    <option value="prototype">Prototype/MVP</option>
                    <option value="beta">Beta with Users</option>
                    <option value="launched">Launched Product</option>
                    <option value="revenue">Generating Revenue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Funding
                  </label>
                  <input
                    type="text"
                    name="funding"
                    value={formData.funding}
                    onChange={handleChange}
                    placeholder="e.g., $50k from Bot Angels"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>

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
