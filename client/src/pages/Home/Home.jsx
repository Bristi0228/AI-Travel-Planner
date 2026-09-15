import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">

        {/* Hero Section */}
        <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">

          <div className="mb-6 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            ✨ Plan smarter with AI
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Your Personal
            <span className="block">
              AI Travel Planner
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover amazing destinations, create personalized itineraries,
            manage your trips and travel smarter with the power of AI.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/planner"
              className="rounded-xl bg-black px-7 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              Start Planning ✈️
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-gray-300 px-7 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-100"
            >
              Explore Features
            </a>

          </div>

        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-gray-100 bg-gray-50 px-6 py-20"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mb-12 text-center">

              <h2 className="text-3xl font-bold text-gray-900">
                Everything you need for your trip
              </h2>

              <p className="mt-3 text-gray-600">
                One simple platform to plan and manage your travel.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {/* Feature 1 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-7">

                <div className="mb-5 text-3xl">
                  🤖
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  AI Trip Planning
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Get personalized travel plans based on your destination,
                  budget, duration and interests.
                </p>

              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-7">

                <div className="mb-5 text-3xl">
                  🗺️
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  Smart Itineraries
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Organize your destinations and activities into an
                  easy-to-follow daily itinerary.
                </p>

              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-7">

                <div className="mb-5 text-3xl">
                  💾
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  Save Your Trips
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Save your favorite travel plans and access them whenever
                  you need them.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>
    </Layout>
  );
}

export default Home;