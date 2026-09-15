import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  Map,
  Sparkles,
  Plus,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-7xl px-6 py-12">

          {/* Heading */}
          <div className="mb-10">
            <p className="text-sm font-medium text-gray-500">
              YOUR TRAVEL DASHBOARD
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Welcome back 👋
            </h1>

            <p className="mt-3 text-gray-600">
              Manage your trips and create new AI-powered travel plans.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10 grid gap-6 md:grid-cols-2">

            {/* Saved Trips */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <Map size={24} />
              </div>

              <p className="text-sm text-gray-500">
                Saved Trips
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                0
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Your saved travel plans will appear here.
              </p>
            </div>

            {/* AI Plans */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <Sparkles size={24} />
              </div>

              <p className="text-sm text-gray-500">
                AI Plans
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                0
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                AI-generated itineraries will appear here.
              </p>
            </div>

          </div>

          {/* Create Trip */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
              <Plus size={28} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Plan a New Trip
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              Tell us your destination, budget and interests.
              Our AI will create a personalized itinerary for you.
            </p>

            <Link
              to="/planner"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Start Planning
              <ArrowRight size={18} />
            </Link>

          </div>

        </main>
      </div>
    </Layout>
  );
}

export default Dashboard;