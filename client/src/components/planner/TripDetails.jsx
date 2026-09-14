import { CalendarDays, Users } from "lucide-react";

function TripDetails({
  duration,
  travelers,
  onChange,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/* Duration */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <CalendarDays size={18} />
          Trip Duration
        </label>

        <select
          name="duration"
          value={duration}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
        >
          <option value="">Select duration</option>
          <option value="2">2 Days</option>
          <option value="3">3 Days</option>
          <option value="4">4 Days</option>
          <option value="5">5 Days</option>
          <option value="7">7 Days</option>
          <option value="10">10 Days</option>
        </select>
      </div>

      {/* Travelers */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Users size={18} />
          Travelers
        </label>

        <select
          name="travelers"
          value={travelers}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
        >
          <option value="">Number of travelers</option>
          <option value="1">1 Traveler</option>
          <option value="2">2 Travelers</option>
          <option value="3">3 Travelers</option>
          <option value="4">4 Travelers</option>
          <option value="5">5+ Travelers</option>
        </select>
      </div>

    </div>
  );
}

export default TripDetails;