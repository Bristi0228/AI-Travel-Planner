import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import TravelMap from "../../components/common/TravelMap";

import {
  CalendarDays,
  Users,
  Wallet,
  Camera,
  Clock,
  Utensils,
  MapPin,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  CloudSun,
  IndianRupee,
} from "lucide-react";

function Itinerary() {
  const location = useLocation();

  const [trip, setTrip] = useState(location.state || null);

  // =========================================================
  // LOAD SAVED TRIP
  // =========================================================

  useEffect(() => {
    if (location.state) {
      setTrip(location.state);
      return;
    }

    try {
      const savedTrips = JSON.parse(
        localStorage.getItem("savedTrips") || "[]"
      );

      if (Array.isArray(savedTrips) && savedTrips.length > 0) {
        const latestTrip = [...savedTrips].sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        )[0];

        setTrip(latestTrip);
      }
    } catch (error) {
      console.error("Unable to load saved trip:", error);
    }
  }, [location.state]);

  // =========================================================
  // NO TRIP AVAILABLE
  // =========================================================

  if (!trip) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
              <MapPin size={26} />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
              No trip found
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Create a trip first to view your personalized itinerary.
            </p>

            <Link
              to="/planner"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold !text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
            >
              Plan a Trip
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // =========================================================
  // PREPARE TRIP DATA
  // =========================================================

  const interests = Array.isArray(trip.interests)
    ? trip.interests
    : [];

  const days = Array.isArray(trip.itinerary)
    ? trip.itinerary
    : [];

  // =========================================================
  // FORMAT BUDGET
  // =========================================================

  const formatBudget = () => {
    const min = Number(trip.budgetMin);
    const max = Number(trip.budgetMax);

    if (!min && !max) {
      return "Not specified";
    }

    if (min && max) {
      return `₹${min.toLocaleString("en-IN")} – ₹${max.toLocaleString(
        "en-IN"
      )}`;
    }

    return min
      ? `From ₹${min.toLocaleString("en-IN")}`
      : `Up to ₹${max.toLocaleString("en-IN")}`;
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not specified";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // PACKING LIST
  // =========================================================

  const packingList = [
    "Comfortable walking shoes",
    "Weather-appropriate clothes",
    "Phone charger / power bank",
    "Personal documents",
    "Basic medicines",
    "Reusable water bottle",
  ];

  return (
    <Layout>
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
        <main className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

          {/* ================= TOP ACTIONS ================= */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-indigo-600"
            >
              <ArrowLeft size={18} />
              Edit Trip
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-indigo-600"
            >
              Dashboard
            </Link>
          </div>

          {/* ================= HEADER ================= */}

          <section className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold tracking-wide text-indigo-600">
              <Sparkles size={14} />
              PERSONALIZED TRAVEL ITINERARY
            </div>

            <h1 className="mt-4 break-words text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              {trip.destination}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Your personalized travel plan with activities, trip details,
              budget information and useful travel suggestions.
            </p>
          </section>

          {/* ================= SUMMARY CARDS ================= */}

          <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              icon={<CalendarDays size={21} />}
              label="Duration"
              value={`${trip.duration || "—"} ${
                String(trip.duration) === "1" ? "Day" : "Days"
              }`}
            />

            <SummaryCard
              icon={<Users size={21} />}
              label="Travelers"
              value={`${trip.numTravelers || "—"} ${
                String(trip.numTravelers) === "1"
                  ? "Traveler"
                  : "Travelers"
              }`}
            />

            <SummaryCard
              icon={<Wallet size={21} />}
              label="Budget"
              value={formatBudget()}
            />

            <SummaryCard
              icon={<Camera size={21} />}
              label="Interests"
              value={`${interests.length} Selected`}
            />
          </section>

          {/* ================= TRIP DETAILS ================= */}

          <section className="mb-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              icon={<CalendarDays size={20} />}
              title="Trip Details"
              description="Overview of your travel preferences."
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <Detail
                label="Start Date"
                value={formatDate(trip.startDate)}
              />

              <Detail
                label="End Date"
                value={formatDate(trip.endDate)}
              />

              <Detail
                label="Travel Style"
                value={trip.travelStyle || "Not specified"}
              />
            </div>
          </section>

          {/* ================= INTERESTS ================= */}

          {interests.length > 0 && (
            <section className="mb-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                icon={<Sparkles size={20} />}
                title="Your Interests"
                description="Preferences used while creating your itinerary."
              />

              <div className="mt-5 flex flex-wrap gap-2.5">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ================= MAP ================= */}

          <section className="mb-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7">
              <SectionHeading
                icon={<MapPin size={20} />}
                title="Trip Map"
                description="Explore your destination on the interactive map."
              />
            </div>

            <div className="h-[320px] w-full sm:h-[420px]">
              <TravelMap destination={trip.destination} />
            </div>
          </section>

          {/* ================= ITINERARY ================= */}

          <section className="mb-10">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                <CalendarDays size={14} />
                DAY-BY-DAY PLAN
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Your Itinerary
              </h2>

              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                A personalized day-by-day plan for your{" "}
                {trip.destination} trip.
              </p>
            </div>

            {days.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <CalendarDays
                  size={32}
                  className="mx-auto text-gray-400"
                />

                <h3 className="mt-4 font-bold text-gray-900">
                  No itinerary activities found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Create another trip to generate a fresh itinerary.
                </p>

                <Link
                  to="/planner"
                  className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold !text-white hover:bg-indigo-700"
                >
                  Create Trip
                </Link>
              </div>
            ) : (
              <div className="space-y-7">
                {days.map((day) => (
                  <article
                    key={day.day}
                    className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
                  >
                    {/* ================= DAY HEADER ================= */}

                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white shadow-md shadow-indigo-100">
                        {day.day}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                          Day {day.day}
                        </p>

                        <h3 className="mt-1 break-words text-xl font-bold text-gray-900">
                          Explore {trip.destination}
                        </h3>
                      </div>
                    </div>

                    {/* ================= MORNING ================= */}

                    <Activity
                      icon={<MapPin size={20} />}
                      period="Morning"
                      activity={day.morning}
                    />

                    {/* ================= AFTERNOON ================= */}

                    <Activity
                      icon={<Utensils size={20} />}
                      period="Afternoon"
                      activity={day.afternoon}
                    />

                    {/* ================= EVENING ================= */}

                    <Activity
                      icon={<Camera size={20} />}
                      period="Evening"
                      activity={day.evening}
                      last
                    />
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* ================= INSIGHTS + PACKING ================= */}

          <section className="mb-10 grid gap-6 lg:grid-cols-2">

            {/* Insights */}

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                icon={<CloudSun size={20} />}
                title="Travel Insights"
                description="Useful suggestions for your journey."
              />

              <div className="mt-5 space-y-3">
                <Insight
                  title="Start Early"
                  text="Begin sightseeing in the morning to make the most of your day."
                />

                <Insight
                  title="Explore Locally"
                  text={`Try local food and explore attractions that reflect the culture of ${trip.destination}.`}
                />

                <Insight
                  title="Keep Some Flexibility"
                  text="Leave some free time in your schedule for unexpected discoveries."
                />
              </div>
            </div>

            {/* Packing */}

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                icon={<CheckCircle2 size={20} />}
                title="Packing List"
                description="Basic items to consider carrying."
              />

              <div className="mt-5 space-y-2.5">
                {packingList.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-3.5"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-indigo-600"
                    />

                    <span className="text-sm text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= BUDGET ================= */}

          <section className="mb-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              icon={<IndianRupee size={20} />}
              title="Budget Summary"
              description="Overview of your selected trip budget."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <BudgetBox
                label="Estimated Budget"
                value={formatBudget()}
              />

              <BudgetBox
                label="Travelers"
                value={trip.numTravelers || "—"}
              />

              <BudgetBox
                label="Duration"
                value={`${trip.duration || "—"} days`}
              />
            </div>
          </section>

          {/* ================= TRAVEL INFORMATION ================= */}

          <section className="mb-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              icon={<CloudSun size={20} />}
              title="Travel Information"
              description="Useful information for your journey."
            />

            <div className="mt-5 rounded-2xl bg-indigo-50 p-5">
              <p className="text-sm leading-6 text-indigo-900">
                Your itinerary has been created using your selected
                destination, interests, travel style, budget and trip
                duration.
              </p>
            </div>
          </section>

          {/* ================= BOTTOM ACTIONS ================= */}

          <div className="flex flex-col gap-3 pb-8 sm:flex-row sm:justify-center">
            <Link
              to="/planner"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold !text-white shadow-lg shadow-indigo-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Plan Another Trip
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold !text-gray-900 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50"
            >
              Go to Dashboard
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}

/* ================= COMPONENTS ================= */

function SectionHeading({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
        {icon}
      </div>

      <div className="min-w-0">
        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words text-base font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold capitalize text-gray-900">
        {value}
      </p>
    </div>
  );
}

function Activity({ icon, period, activity, last = false }) {
  return (
    <div
      className={`rounded-2xl bg-gray-50 p-4 sm:p-5 ${
        last ? "" : "mb-4"
      }`}
    >
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-900 shadow-sm">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                {period}
              </p>

              <h4 className="mt-1 break-words font-bold text-gray-900">
                {activity?.title || "Activity"}
              </h4>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-gray-500 sm:text-sm">
              <Clock size={14} />
              {activity?.time || "09:00 AM"}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {activity?.description || "Enjoy your activity."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Insight({ title, text }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="font-semibold text-gray-900">
        {title}
      </p>

      <p className="mt-1 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}

function BudgetBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 break-words font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default Itinerary;