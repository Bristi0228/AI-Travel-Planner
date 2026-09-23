import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import {
  Map,
  Navigation,
  FileCheck2,
  Heart,
  Plus,
  ArrowRight,
  CalendarDays,
  Users,
  Wallet,
  MapPin,
  Trash2,
  Eye,
  Clock3,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [savedTrips, setSavedTrips] = useState([]);


  // LOAD SAVED TRIPS
 
  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = () => {
    try {
      const storedTrips = JSON.parse(
        localStorage.getItem("savedTrips") || "[]"
      );

      setSavedTrips(
        Array.isArray(storedTrips) ? storedTrips : []
      );
    } catch (error) {
      console.error("Unable to load saved trips:", error);
      setSavedTrips([]);
    }
  };

  // DELETE TRIP
 
  const handleDeleteTrip = (tripId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!shouldDelete) return;

    const updatedTrips = savedTrips.filter(
      (trip) => trip.id !== tripId
    );

    setSavedTrips(updatedTrips);

    localStorage.setItem(
      "savedTrips",
      JSON.stringify(updatedTrips)
    );
  };

  // VIEW ITINERARY
  
  const handleViewTrip = (trip) => {
    navigate("/itinerary", {
      state: trip,
    });
  };

  // UNIQUE DESTINATIONS
  
  const uniqueDestinations = new Set(
    savedTrips
      .map((trip) => trip?.destination?.trim())
      .filter(Boolean)
      .map((destination) => destination.toLowerCase())
  ).size;

  // FORMAT BUDGET
  
  const formatBudget = (trip) => {
    const min = Number(trip?.budgetMin);
    const max = Number(trip?.budgetMax);

    if (!min && !max) {
      return "Not specified";
    }

    if (min && max) {
      return `₹${min.toLocaleString("en-IN")} – ₹${max.toLocaleString(
        "en-IN"
      )}`;
    }

    if (min) {
      return `From ₹${min.toLocaleString("en-IN")}`;
    }

    return `Up to ₹${max.toLocaleString("en-IN")}`;
  };

  // FORMAT DATE
  
  const formatCreatedDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

          {/*  HEADER  */}
          <section className="mb-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-600">
                  <Navigation size={14} />
                  Travel Dashboard
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Welcome back 👋
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                  Manage your saved trips and create new personalized
                  travel plans from one place.
                </p>
              </div>

              <Link
                to="/planner"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold !text-white shadow-lg shadow-indigo-100 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                <Plus size={18} />
                New Trip
              </Link>

            </div>
          </section>

          {/* STATS  */}
          <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <StatCard
              icon={<Map size={23} />}
              label="Saved Trips"
              value={savedTrips.length}
              description="Trips saved on this device."
            />

            <StatCard
              icon={<FileCheck2 size={23} />}
              label="Generated Plans"
              value={savedTrips.length}
              description="Personalized plans created."
            />

            <StatCard
              icon={<MapPin size={23} />}
              label="Destinations"
              value={uniqueDestinations}
              description="Unique destinations explored."
              className="sm:col-span-2 lg:col-span-1"
            />

          </section>

          {/*  SAVED TRIPS  */}
          <section className="mb-10">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Saved Trips
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Your previously created travel plans.
              </p>
            </div>

            {savedTrips.length === 0 ? (

              /*  EMPTY STATE  */
              <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center shadow-sm sm:px-10">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Map size={28} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  No saved trips yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Create your first personalized travel itinerary
                  and it will appear here automatically.
                </p>

                <Link
                  to="/planner"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold !text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
                >
                  Plan Your First Trip
                  <ArrowRight size={18} />
                </Link>

              </div>

            ) : (

              /*  TRIP CARDS  */

              <div className="grid gap-5 lg:grid-cols-2">

                {savedTrips.map((trip) => (

                  <article
                    key={trip.id}
                    className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* Card Top */}
                    <div className="p-5 sm:p-6">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start gap-2.5">

                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                              <MapPin size={18} />
                            </div>

                            <div className="min-w-0">
                              <h3 className="break-words text-xl font-bold text-gray-900">
                                {trip.destination ||
                                  "Unknown destination"}
                              </h3>

                              <p className="mt-1 break-words text-sm capitalize text-gray-500">
                                {trip.travelStyle ||
                                  "Travel plan"}
                              </p>
                            </div>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteTrip(trip.id)
                          }
                          className="shrink-0 rounded-xl p-2.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete trip"
                          aria-label="Delete trip"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                      {/* Created Date */}
                      {trip.createdAt && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                          <Clock3 size={14} />
                          Created {formatCreatedDate(trip.createdAt)}
                        </div>
                      )}

                      {/* Details */}
                      <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">

                        <InfoBox
                          icon={<CalendarDays size={18} />}
                          label="Duration"
                          value={
                            trip.duration
                              ? `${trip.duration} ${
                                  String(trip.duration) === "1"
                                    ? "Day"
                                    : "Days"
                                }`
                              : "—"
                          }
                        />

                        <InfoBox
                          icon={<Users size={18} />}
                          label="Travelers"
                          value={trip.numTravelers || "—"}
                        />

                        <InfoBox
                          icon={<Wallet size={18} />}
                          label="Budget"
                          value={formatBudget(trip)}
                        />

                        <InfoBox
                          icon={<Heart size={18} />}
                          label="Interests"
                          value={
                            Array.isArray(trip.interests)
                              ? `${trip.interests.length} Selected`
                              : "0 Selected"
                          }
                        />

                      </div>

                      {/* Interests */}
                      {Array.isArray(trip.interests) &&
                        trip.interests.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {trip.interests
                              .slice(0, 4)
                              .map((interest) => (
                                <span
                                  key={interest}
                                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                                >
                                  {interest}
                                </span>
                              ))}

                            {trip.interests.length > 4 && (
                              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                +{trip.interests.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                    </div>

                    {/* Card Actions */}
                    <div className="border-t border-gray-100 bg-gray-50/70 p-4 sm:px-6">

                      <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                          type="button"
                          onClick={() =>
                            handleViewTrip(trip)
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold !text-white shadow-sm transition hover:bg-indigo-700"
                        >
                          <Eye size={18} />
                          View Itinerary
                        </button>

                        <Link
                          to="/planner"
                          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold !text-gray-900 transition hover:border-indigo-300 hover:bg-indigo-50"
                        >
                          Plan New
                        </Link>

                      </div>

                    </div>

                  </article>

                ))}

              </div>
            )}

          </section>

          {/*  CREATE NEW TRIP */}
          <section className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-7 text-center text-white shadow-xl sm:p-10">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Plus size={28} />
            </div>

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              Plan a New Trip
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-300 sm:text-base">
              Choose your destination, budget, interests and travel
              style to create another personalized itinerary.
            </p>

            <Link
              to="/planner"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold !text-gray-900 transition hover:-translate-y-0.5 hover:bg-gray-100"
            >
              Start Planning
              <ArrowRight size={18} />
            </Link>

          </section>

        </main>
      </div>
    </Layout>
  );
}

/*  STAT CARD  */

function StatCard({
  icon,
  label,
  value,
  description,
  className = "",
}) {
  return (
    <div
      className={`rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{label}</p>

      <h2 className="mt-1 text-3xl font-bold text-gray-900">
        {value}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

/*  INFO BOX  */

function InfoBox({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-2xl bg-gray-50 p-4">
      <div className="mb-2 text-gray-700">{icon}</div>

      <p className="text-xs text-gray-500">{label}</p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default Dashboard;