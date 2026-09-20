import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =========================================================
// ================= LEAFLET MARKER FIX ====================
// =========================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// =========================================================
// ================= MAP VIEW CONTROLLER ===================
// =========================================================

function ChangeMapView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, {
        duration: 1.2,
      });
    }
  }, [position, map]);

  return null;
}

// =========================================================
// ================= TRAVEL MAP COMPONENT =================
// =========================================================

function TravelMap({ destination }) {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // ================= FIND DESTINATION ======================
  // =========================================================

  useEffect(() => {
    const findDestination = async () => {
      if (!destination?.trim()) {
        setError("Destination not available.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setPosition(null);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            destination
          )}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to find destination.");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error(
            `Could not find "${destination}".`
          );
        }

        const lat = Number(data[0].lat);
        const lon = Number(data[0].lon);

        if (Number.isNaN(lat) || Number.isNaN(lon)) {
          throw new Error("Invalid map coordinates.");
        }

        setPosition([lat, lon]);
      } catch (err) {
        console.error("Map error:", err);

        setError(
          err.message || "Unable to load the destination."
        );
      } finally {
        setLoading(false);
      }
    };

    findDestination();
  }, [destination]);

  // =========================================================
  // ================= LOADING STATE =========================
  // =========================================================

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

          <p className="mt-4 text-sm font-medium text-gray-600">
            Finding {destination || "destination"}...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ================= ERROR STATE ===========================
  // =========================================================

  if (error || !position) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 px-5">
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm">
            📍
          </div>

          <h3 className="mt-4 font-semibold text-gray-900">
            Map unavailable
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error ||
              "We couldn't find this destination on the map."}
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ================= MAP DISPLAY ===========================
  // =========================================================

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView position={position} />

        <Marker position={position}>
          <Popup>
            <div className="min-w-[150px]">
              <p className="font-semibold text-gray-900">
                {destination}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Your selected travel destination
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* =====================================================
          DESTINATION LABEL
      ===================================================== */}

      <div className="absolute left-3 top-3 z-[1000] max-w-[calc(100%-24px)] rounded-xl bg-white/95 px-4 py-2.5 shadow-md backdrop-blur sm:left-4 sm:top-4">
        <p className="text-xs font-medium text-gray-500">
          DESTINATION
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
          {destination}
        </p>
      </div>
    </div>
  );
}

export default TravelMap;