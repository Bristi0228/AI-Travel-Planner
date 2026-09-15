import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  CalendarDays,
  Users,
  Wallet,
  MapPin,
  Clock,
  Utensils,
  Camera,
  ArrowLeft,
} from "lucide-react";

function Itinerary() {
  const location = useLocation();

  const trip = location.state;

  // If someone opens /itinerary directly
  if (!trip) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              No trip found
            </h1>

            <p className="mt-3 text-gray-600">
              Please create a trip first.
            </p>

            <Link
              to="/planner"
              className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Plan a Trip
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Temporary sample itinerary
  const days = Array.from(
    { length: Number(trip.duration) },
    (_, index) => ({
      day: index + 1,
      activities: [
        {
          time: "09:00 AM",
          title: "Explore the destination",
          description:
            "Start your day by visiting one of the popular attractions.",
          icon: MapPin,
        },
        {
          time: "01:00 PM",
          title: "Local Food Experience",
          description:
            "Enjoy some popular local dishes and explore the food culture.",
          icon: Utensils,
        },
        {
          time: "04:00 PM",
          title: "Sightseeing & Photography",
          description:
            "Visit scenic places and capture memorable moments.",
          icon: Camera,
        },
      ],
    })
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">

        <main className="mx-auto max-w-6xl px-6 py-10">

          {/* Top Actions */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/planner"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
            >
              <ArrowLeft size={18} />
              Edit Trip
            </Link>

            <Link
              to="/"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Back to Home
            </Link>
          </div>

          {/* Page Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-gray-500">
              YOUR PERSONALIZED ITINERARY
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              {trip.destination}
            </h1>

            <p className="mt-2 text-gray-600">
              Your AI-powered travel plan is ready.
            </p>
          </div>

          {/* Trip Summary */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Duration */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <CalendarDays size={22} className="mb-3" />

              <p className="text-sm text-gray-500">
                Duration
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {trip.duration} Days
              </p>
            </div>

            {/* Travelers */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <Users size={22} className="mb-3" />

              <p className="text-sm text-gray-500">
                Travelers
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {trip.travelers}
                {trip.travelers === "1"
                  ? " Traveler"
                  : " Travelers"}
              </p>
            </div>

            {/* Budget */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <Wallet size={22} className="mb-3" />

              <p className="text-sm text-gray-500">
                Budget
              </p>

              <p className="mt-1 font-semibold capitalize text-gray-900">
                {trip.budget}
              </p>
            </div>

            {/* Interests */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <Camera size={22} className="mb-3" />

              <p className="text-sm text-gray-500">
                Interests
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {trip.interests.length} Selected
              </p>
            </div>

          </div>

          {/* Selected Interests */}
          {trip.interests.length > 0 && (
            <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6">

              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Your Interests
              </h2>

              <div className="flex flex-wrap gap-3">
                {trip.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>

            </div>
          )}

          {/* Itinerary */}
          <div>

            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Your Itinerary
            </h2>

            <div className="space-y-8">

              {days.map((day) => (
                <section
                  key={day.day}
                  className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8"
                >

                  {/* Day Heading */}
                  <div className="mb-7 flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black font-bold text-white">
                      {day.day}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        DAY {day.day}
                      </p>

                      <h3 className="text-xl font-bold text-gray-900">
                        Explore {trip.destination}
                      </h3>
                    </div>

                  </div>

                  {/* Activities */}
                  <div className="space-y-5">

                    {day.activities.map((activity) => {
                      const Icon = activity.icon;

                      return (
                        <div
                          key={activity.time}
                          className="flex gap-4 rounded-2xl bg-gray-50 p-5"
                        >

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                            <Icon size={20} />
                          </div>

                          <div className="flex-1">

                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                              <h4 className="font-semibold text-gray-900">
                                {activity.title}
                              </h4>

                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock size={15} />
                                {activity.time}
                              </span>

                            </div>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                              {activity.description}
                            </p>

                          </div>

                        </div>
                      );
                    })}

                  </div>

                </section>
              ))}

            </div>

          </div>

        </main>

      </div>
    </Layout>
  );
}

export default Itinerary;