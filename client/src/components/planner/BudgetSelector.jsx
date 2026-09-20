import { Wallet } from "lucide-react";

function BudgetSelector({ budgetMin, budgetMax, onChange }) {
  const budgets = [
    {
      id: "budget",
      title: "Budget",
      price: "₹5k – ₹10k",
      min: "5000",
      max: "10000",
    },
    {
      id: "moderate",
      title: "Moderate",
      price: "₹10k – ₹25k",
      min: "10000",
      max: "25000",
    },
    {
      id: "premium",
      title: "Premium",
      price: "₹25k+",
      min: "25000",
      max: "100000",
    },
  ];

  const selectedBudget = budgets.find(
    (item) =>
      budgetMin === item.min &&
      budgetMax === item.max
  );

  const handleBudgetChange = (item) => {
    onChange({
      target: {
        name: "budgetMin",
        value: item.min,
      },
    });

    onChange({
      target: {
        name: "budgetMax",
        value: item.max,
      },
    });
  };

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Wallet size={18} />
        Budget
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        {budgets.map((item) => (
          <label
            key={item.id}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name="budget"
              value={item.id}
              checked={selectedBudget?.id === item.id}
              onChange={() => handleBudgetChange(item)}
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