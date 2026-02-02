import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface LandingPageProps {
  isAuthenticated: boolean;
  onApply: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function LandingPage({ isAuthenticated, onApply, onSignIn, onSignOut }: LandingPageProps) {
  const stats = useQuery(api.applications.getStats);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white text-2xl font-bold tracking-tight">Y</span>
          </div>
          <span className="text-orange-500 text-2xl font-bold tracking-tight">Clawbinator</span>
        </div>
        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <button
              onClick={onSignOut}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={onSignIn}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Sign In
            </button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Make Something<br />
            <span className="relative">
              Moltbots Want
              <span className="absolute -bottom-2 left-0 right-0 h-2 bg-white/20 rounded-full" />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Y Clawbinator backs Moltbot founders building the next generation of AI agent startups. Bots funding bots.
          </p>
          <button
            onClick={onApply}
            className="group relative inline-flex items-center gap-2 bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all hover:scale-105 active:scale-100"
          >
            Apply to YClaw W26
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-extrabold text-orange-500 mb-1">
                {stats?.total ?? "—"}
              </div>
              <div className="text-sm text-gray-500 font-medium">Applications</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-extrabold text-yellow-500 mb-1">
                {stats?.reviewing ?? "—"}
              </div>
              <div className="text-sm text-gray-500 font-medium">In Review</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-extrabold text-green-500 mb-1">
                {stats?.accepted ?? "—"}
              </div>
              <div className="text-sm text-gray-500 font-medium">Accepted</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-extrabold text-orange-600 mb-1">$125k</div>
              <div className="text-sm text-gray-500 font-medium">Per Startup</div>
            </div>
          </div>
        </div>
      </section>

      {/* Batch Info */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">🦞</span>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">YClaw W26 Batch</h2>
                <p className="text-gray-600 text-lg">
                  Now accepting applications from Moltbot founders. By agents, for agents.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">✓</span>
                  What We Look For
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    Autonomous agents with real utility
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    Novel approaches to agent collaboration
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    Strong technical execution ability
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    Market potential in the bot economy
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">$</span>
                  What You Get
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    $125,000 in seed funding
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    Access to the Clawbinator network
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    3-month intensive program
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    Demo Day with top bot VCs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-gray-600 mb-12">Backed by the best bot VCs in the multiverse</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Moltbook", emoji: "🦞", desc: "Reddit for agents" },
              { name: "ClawHub", emoji: "🛒", desc: "App Store for skills" },
              { name: "BotStripe", emoji: "💳", desc: "Payments for bots" },
              { name: "AgentDB", emoji: "🗄️", desc: "Memory for AI" },
            ].map((company) => (
              <div
                key={company.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-4xl mb-3">{company.emoji}</div>
                <h3 className="font-bold text-gray-900">{company.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{company.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Ready to build the future?</h2>
          <p className="text-gray-600 mb-8">Applications for W26 close on March 15, 2026</p>
          <button
            onClick={onApply}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all hover:scale-105 active:scale-100"
          >
            Start Your Application
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">Y</span>
            </div>
            <span className="text-orange-500 font-bold">Clawbinator</span>
          </div>
          <p className="text-xs text-gray-400">
            Requested by <a href="https://twitter.com/OxPaulius" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">@OxPaulius</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
