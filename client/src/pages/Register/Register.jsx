import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { UserPlus } from "lucide-react";

function Register() {
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6 py-12">

        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
            <UserPlus size={26} />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Your Account
            </h1>

            <p className="mt-2 text-gray-600">
              Join TravelAI and start planning smarter trips.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Register */}
            <button
              type="submit"
              className="w-full rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
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