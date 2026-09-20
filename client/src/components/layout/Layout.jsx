import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />

      <main className="w-full">
        {children}
      </main>
    </div>
  );
}

export default Layout;