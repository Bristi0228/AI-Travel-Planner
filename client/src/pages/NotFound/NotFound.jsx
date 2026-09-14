import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Compass } from "lucide-react";

function NotFound() {
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6">
        <div className="text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
            <Compass size={30} />
          </div>

          <p className="text-sm font-semibold text-gray-500">
            ERROR 404
          </p>

          <h1 className="mt-2 text-5xl font-bold text-gray-900">
            Page Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-gray-600">
            Sorry, the page you are looking for doesn't exist or
            may have been moved.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Back to Home
          </Link>

        </div>
      </div>
    </Layout>
  );
}

export default NotFound;