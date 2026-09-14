import { Wallet } from "lucide-react";

function BudgetSelector({ value, onChange }) {
  const budgets = [
    {
      value: "budget",
      title: "Budget",
      price: "₹5k – ₹10k",
    },
    {
      value: "moderate",
      title: "Moderate",
      price: "₹10k – ₹25k",
    },
    {
      value: "luxury",
      title: "Premium",
      price: "₹25k+",
    },
  ];

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Wallet size={18} />
        Budget
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        {budgets.map((item) => (
          <label
            key={item.value}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name="budget"
              value={item.value}
              checked={value === item.value}
              onChange={onChange}
              className="peer sr-only"
            />

            <div className="rounded-xl border border-gray-300 p-4 text-center transition peer-checked:border-black peer-checked:bg-black peer-checked:text-white">
              <p className="font-semibold">
                {item.title}
              </p>

              <p className="mt-1 text-sm opacity-70">
                {item.price}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default BudgetSelector;