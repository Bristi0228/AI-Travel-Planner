import { CalendarDays } from "lucide-react";

function DateSelector({ startDate, endDate, onChange }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/* Start Date */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <CalendarDays size={18} />
          Start Date
        </label>

        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <CalendarDays size={18} />
          End Date
        </label>

        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        />
      </div>

    </div>
  );
}

export default DateSelector;