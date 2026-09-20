import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { UserPlus, CheckCircle2 } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.country.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    // Frontend-only account
    const user = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      country: formData.country.trim(),
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    alert("Registration successful! 🎉");

    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-4 py-10 sm:px-6">

        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
            <UserPlus size={26} />
          </div>

          {/* Heading */}
          <div className="text-center">

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Join AI Travel Planner and start exploring.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />

              <p className="mt-2 text-xs text-gray-500">
                Minimum 6 characters.
              </p>
            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                autoComplete="country-name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              <CheckCircle2 size={18} />
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </Layout>
  );
}

export default Register;