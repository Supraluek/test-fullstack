/* global L */
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../style/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/5860/5860579.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LeafletCRUD = () => {
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState({
    name: "",
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    fetch("http://localhost:1010/shops")
      .then((response) => response.json())
      .then((data) => setShops(data))
      .catch((error) => console.error("Error fetching shops:", error));
  }, []);

  const handleCreateShop = () => {
    setShops((prevShops) => [...prevShops, newShop]);

    fetch("http://localhost:1010/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShop),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setShops((prevShops) => [...prevShops, newShop]);
        setNewShop({ name: "", latitude: 0, longitude: 0 });
      })
      .catch((error) => console.error("Error adding shop:", error));
  };

  const handleDeleteShop = (index, shopId) => {
    setShops((prevShops) => prevShops.filter((_, i) => i !== index));

    fetch(`http://localhost:1010/shops/${shopId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => console.error("Error deleting shop:", error));
  };

  return (
    <div>
      <div className="box-inputshop">
        <div className="inputshop">
          <input
            type="text"
            className="form-control shop"
            placeholder="Shop Name"
            value={newShop.name}
            onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control shop"
            placeholder="Latitude"
            value={newShop.latitude !== 0 ? newShop.latitude : ""}
            onChange={(e) =>
              setNewShop({
                ...newShop,
                latitude: parseFloat(e.target.value) || 0,
              })
            }
          />
          <input
            type="text"
            className="form-control shop"
            placeholder="Longitude"
            value={newShop.longitude !== 0 ? newShop.longitude : ""}
            onChange={(e) =>
              setNewShop({
                ...newShop,
                longitude: parseFloat(e.target.value) || 0,
              })
            }
          />
          <button
            type="button"
            className="btn btn-outline-secondary create"
            onClick={handleCreateShop}
          >
            Create
          </button>
        </div>
      </div>

      <MapContainer className="map" center={[0, 0]} zoom={17}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shops.map((shop, index) => (
          <Marker
            key={index}
            position={[shop.latitude, shop.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <p>Shop Name: {shop.name}</p>
                <p>Latitude: {shop.latitude}</p>
                <p>Longitude: {shop.longitude}</p>
                <button onClick={() => handleDeleteShop(index, shop.id)}>
                  ลบ
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletCRUD;
