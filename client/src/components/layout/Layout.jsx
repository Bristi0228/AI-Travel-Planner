
// LAYOUT

import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white">
      {/*  NAVBAR  */}
      <Navbar />

      {/*  MAIN CONTENT  */}
      <main className="w-full max-w-full min-w-0 overflow-x-hidden">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Layout;
