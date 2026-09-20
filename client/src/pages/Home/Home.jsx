import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Map,
  CalendarDays,
  Wallet,
  Heart,
  ArrowRight,
  Globe2,
  CheckCircle2,
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Trip Planning",
      description:
        "Generate personalized travel plans using your destination, budget, interests and travel preferences.",
    },
    {
      icon: Map,
      title: "Interactive Travel Map",
      description:
        "View your selected destination on an interactive map and explore your trip location visually.",
    },
    {
      icon: CalendarDays,
      title: "Day-by-Day Itinerary",
      description:
        "Organize activities into a clear daily schedule so your travel plan is easy to follow.",
    },
    {
      icon: Wallet,
      title: "Budget Planning",
      description:
        "Select a suitable budget range and keep your trip planning aligned with your spending preferences.",
    },
    {
      icon: Heart,
      title: "Interest-Based Planning",
      description:
        "Choose interests such as food, nature, beaches, culture, shopping and adventure.",
    },
    {
      icon: CheckCircle2,
      title: "Save Your Trips",
      description:
        "Keep your generated travel plans available from your dashboard for easy access later.",
    },
  ];

  return (
    <Layout>
      <main className="w-full min-w-0 overflow-x-hidden bg-white">

        {/* ================= HERO ================= */}
        <section className="w-full overflow-hidden border-b border-gray-100">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">

              {/* Badge */}
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 sm:text-sm">
                <Sparkles size={16} className="shrink-0" />
                <span>AI-Powered Travel Planning</span>
              </div>

              {/* Heading */}
              <h1 className="mt-6 w-full break-words text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">
                  Plan your journey.
                </span>

                <span className="block text-indigo-600">
                  Travel your way.
                </span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-6 w-full max-w-2xl break-words text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Create personalized travel itineraries based on your
                destination, budget, interests, travel style and available
                time — all in one place.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">

                <Link
                  to="/planner"
                  className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold !text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl sm:w-auto"
                >
                  <span>Start Planning</span>

                  <ArrowRight
                    size={18}
                    className="shrink-0 !text-white transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#features"
                  className="inline-flex w-full shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold !text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50 sm:w-auto"
                >
                  <span>Explore Features</span>
                </a>

              </div>

              {/* Trust Points */}
              <div className="mt-9 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-gray-500 sm:text-sm">

                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 !text-indigo-600"
                  />
                  <span>Personalized Plans</span>
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 !text-indigo-600"
                  />
                  <span>Interactive Maps</span>
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 !text-indigo-600"
                  />
                  <span>Saved Trips</span>
                </span>

              </div>
            </div>

            {/* ================= HERO PREVIEW ================= */}
            <div className="mx-auto mt-14 w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-sm sm:mt-16 sm:rounded-3xl sm:p-3">

              <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-5 sm:rounded-2xl sm:p-8">

                <div className="flex w-full min-w-0 flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  {/* Text */}
                  <div className="min-w-0 flex-1">

                    <div className="flex min-w-0 items-center gap-2 text-xs font-semibold tracking-wide text-indigo-600 sm:text-sm">
                      <Globe2
                        size={17}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        YOUR NEXT ADVENTURE
                      </span>
                    </div>

                    <h2 className="mt-2 break-words text-xl font-bold leading-tight text-gray-900 sm:text-2xl md:text-3xl">
                      One smart planner for your entire trip.
                    </h2>

                    <p className="mt-3 max-w-xl break-words text-sm leading-6 text-gray-600 sm:text-base">
                      Choose where you want to go, tell us what you love,
                      and let the planner organize your journey.
                    </p>

                  </div>

                  {/* Try Planner */}
                  <Link
                    to="/planner"
                    className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold !text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 md:w-auto"
                  >
                    <span>Try Planner</span>

                    <ArrowRight
                      size={17}
                      className="shrink-0 !text-white transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section
          id="features"
          className="w-full overflow-hidden bg-gray-50 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-2xl text-center">

              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm sm:text-sm">
                <Sparkles size={16} />
                Smart Features
              </div>

              <h2 className="mt-5 break-words text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to plan your trip
              </h2>

              <p className="mt-4 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                From personalized planning to interactive maps and saved
                itineraries, everything is organized in one simple platform.
              </p>

            </div>

            <div className="mt-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg sm:rounded-3xl sm:p-7"
                  >

                    <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white">
                      <Icon size={24} />
                    </div>

                    <h3 className="break-words text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="mt-3 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                      {feature.description}
                    </p>

                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">

          <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-gray-950 px-5 py-12 text-center text-white shadow-xl sm:rounded-3xl sm:px-8 sm:py-14 md:px-12">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
              <Sparkles
                size={28}
                className="!text-white"
              />
            </div>

            <h2 className="mt-6 break-words text-3xl font-bold leading-tight !text-white sm:text-4xl">
              Ready to plan your next adventure?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl break-words text-sm leading-6 !text-gray-300 sm:text-base sm:leading-7">
              Build a personalized itinerary and make your travel planning
              simpler with AI.
            </p>

            <Link
              to="/planner"
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold !text-white shadow-lg shadow-indigo-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-xl sm:w-auto"
            >
              <span>Plan My Trip</span>

              <ArrowRight
                size={18}
                className="shrink-0 !text-white transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </section>

      </main>
    </Layout>
  );
}

export default Home;