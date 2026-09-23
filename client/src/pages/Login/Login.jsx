import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { LogIn, Mail, Lock, Plane, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Small delay for a smoother frontend experience
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Frontend-only login
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (storedUser && storedUser.email !== email) {
        alert("No account found with this email.");
        return;
      }

      // Save frontend login state
      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          email,
          name: storedUser?.name || email.split("@")[0],
        })
      );

      alert("Login successful! 🎉");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-10 sm:py-16">
        <main className="mx-auto flex w-full max-w-md items-center justify-center">
          <div className="w-full">

            {/* Header */}
            <div className="mb-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
                <LogIn size={26} />
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Welcome Back
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600 sm:text-base">
                Login to continue planning your personalized trips.
              </p>

            </div>

            {/* Login Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Logging In...
                    </>
                  ) : (
                    <>
                      <LogIn size={19} />
                      Login
                    </>
                  )}
                </button>

              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Register */}
              <div className="text-center">

                <p className="text-sm text-gray-500">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-gray-900 transition hover:text-gray-600"
                >
                  Create an Account
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>

            {/* Frontend indicator */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Plane size={14} />
              <span>AI Travel Planner</span>
            </div>

          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Login;