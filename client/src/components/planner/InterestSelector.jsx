import { interests } from "../../data/interests";

function InterestSelector({ selectedInterests, onChange }) {
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-gray-800">
        ❤️ What are you interested in?
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {interests.map((interest) => (
          <label
            key={interest}
            className="cursor-pointer"
          >
            <input
              type="checkbox"
              value={interest}
              checked={selectedInterests.includes(interest)}
              onChange={() => onChange(interest)}
              className="peer sr-only"
            />

            <div className="rounded-xl border border-gray-300 px-3 py-3 text-center text-sm transition peer-checked:border-black peer-checked:bg-black peer-checked:text-white">
              {interest}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default InterestSelector;