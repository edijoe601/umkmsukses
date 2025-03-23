import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const Produksi = lazy(() => import("./components/produksi"));
const POS = lazy(() => import("./components/pos"));
const Katalog = lazy(() => import("./components/katalog"));
const Pengiriman = lazy(() => import("./components/pengiriman"));
const Laporan = lazy(() => import("./components/laporan"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produksi" element={<Produksi />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/pengiriman" element={<Pengiriman />} />
          <Route path="/laporan" element={<Laporan />} />
          {/* Add tempobook route to prevent catchall issues */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
