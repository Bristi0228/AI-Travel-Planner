import { MapPin } from "lucide-react";

function DestinationInput({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <MapPin size={18} />
        Where do you want to go?
      </label>

      <input
        type="text"
        name="destination"
        value={value}
        onChange={onChange}
        placeholder="Enter destination (e.g. Puri, Goa, Darjeeling)"
        className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
      />
    </div>
  );
}

export default DestinationInput;