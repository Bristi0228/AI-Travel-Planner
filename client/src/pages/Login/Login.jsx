import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { LogIn } from "lucide-react";

function Login() {
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6 py-12">

        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
            <LogIn size={26} />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-600">
              Login to continue planning your trips.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-5">

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
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              Login
            </button>

          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-black hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </Layout>
  );
}

export default Login;