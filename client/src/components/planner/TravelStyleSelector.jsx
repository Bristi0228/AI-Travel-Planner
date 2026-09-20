import { Compass } from "lucide-react";

function TravelStyleSelector({ value, onChange }) {
  const travelStyles = [
    {
      value: "relaxed",
      title: "Relaxed",
      description: "Slow-paced & peaceful",
    },
    {
      value: "balanced",
      title: "Balanced",
      description: "A mix of activities & rest",
    },
    {
      value: "adventurous",
      title: "Adventurous",
      description: "Active & exciting",
    },
    {
      value: "cultural",
      title: "Cultural",
      description: "History, culture & local life",
    },
  ];

  return (
    <div>
      <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Compass size={18} />
        Travel Style
      </label>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {travelStyles.map((style) => (
          <label
            key={style.value}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name="travelStyle"
              value={style.value}
              checked={value === style.value}
              onChange={onChange}
              className="peer sr-only"
            />

            <div className="h-full rounded-xl border border-gray-300 p-4 transition peer-checked:border-black peer-checked:bg-black peer-checked:text-white">
              <p className="font-semibold">
                {style.title}
              </p>

              <p className="mt-1 text-sm opacity-70">
                {style.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default TravelStyleSelector;