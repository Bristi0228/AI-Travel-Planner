import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Sparkles } from "lucide-react";

import DestinationInput from "../../components/planner/DestinationInput";
import TripDetails from "../../components/planner/TripDetails";
import BudgetSelector from "../../components/planner/BudgetSelector";
import InterestSelector from "../../components/planner/InterestSelector";

function Planner() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    travelers: "",
    budget: "",
    interests: [],
  });

  // Handle text and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle interests
  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.destination ||
      !formData.duration ||
      !formData.travelers ||
      !formData.budget
    ) {
      alert("Please complete all required fields.");
      return;
    }

    navigate("/itinerary", {
      state: formData,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-4xl px-6 py-12">

          {/* Heading */}
          <div className="mb-10 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
              <Sparkles size={28} />
            </div>

            <h1 className="text-4xl font-bold text-gray-900">
              Plan Your Perfect Trip
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Tell us a little about your trip and let AI create a
              personalized travel experience for you.
            </p>

          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* Destination */}
              <DestinationInput
                value={formData.destination}
                onChange={handleChange}
              />

              {/* Duration + Travelers */}
              <TripDetails
                duration={formData.duration}
                travelers={formData.travelers}
                onChange={handleChange}
              />

              {/* Budget */}
              <BudgetSelector
                value={formData.budget}
                onChange={handleChange}
              />

              {/* Interests */}
              <InterestSelector
                selectedInterests={formData.interests}
                onChange={handleInterestChange}
              />

              {/* Generate Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800"
              >
                <Sparkles size={20} />
                Generate My Trip
              </button>

            </form>
          </div>

        </main>
      </div>
    </Layout>
  );
}

export default Planner;