"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const cafePosition: [number, number] = [10.7769, 106.7009]; 

const UserMarker = ({ position }: { position: [number, number] }) => (
    <Marker position={position}>
        <Popup>
            Your Location: <br /> 
            Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
        </Popup>
    </Marker>
);

const Map = () => {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [geoError, setGeoError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserPosition([pos.coords.latitude, pos.coords.longitude]);
                    setGeoError(null);
                    setLoading(false);
                },
                (err) => {
                    switch (err.code) {
                        case 1:
                            setGeoError("You denied location access. Enable it in your browser settings.");
                            break;
                        case 2:
                            setGeoError("Location information is unavailable.");
                            break;
                        case 3:
                            setGeoError("The request to get your location timed out.");
                            break;
                        default:
                            setGeoError("An unknown error occurred while getting your location.");
                    }
                    setLoading(false);
                }
            );
        } else {
            setGeoError("Geolocation is not supported by your browser.");
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleGetDirections = () => {
        const baseUrl = "https://www.google.com/maps/dir/?api=1";
        const destination = `&destination=${cafePosition[0]},${cafePosition[1]}`;
        const origin = userPosition ? `&origin=${userPosition[0]},${userPosition[1]}` : "";
        window.open(baseUrl + origin + destination, "_blank");
    };

    return (
        <div className="space-y-4">
            <MapContainer
                center={cafePosition}
                zoom={15}
                style={{ height: "400px", width: "100%", borderRadius: "8px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={cafePosition}>
                    <Popup>Nanies Cafe - Your coffee spot!</Popup>
                </Marker>
                {userPosition && <UserMarker position={userPosition} />}
            </MapContainer>

            {loading && (
                <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
                    <p>Fetching your location...</p>
                </div>
            )}

            {geoError && (
                <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                    <p>{geoError}</p>
                    <button
                        onClick={getUserLocation}
                        className="mt-2 underline text-blue-600 hover:text-blue-800"
                    >
                        Try again
                    </button>
                </div>
            )}

            <button
                onClick={handleGetDirections}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                {userPosition ? "Get Directions from Your Location" : "Get Directions to Cafe"}
            </button>
        </div>
    );
};

export default Map;
