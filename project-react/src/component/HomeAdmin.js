import React, { useState, useEffect } from "react";
import LeafletCRUD from "./LeafletCRUD";
import "../style/Home.css";

const HomeAdmin = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:1010/images")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const handleImageChange = (event) => {
    setNewImage(event.target.value);
  };

  const handleCreateImage = () => {
    fetch("http://localhost:1010/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ img: newImage }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);

        setImages((prevImages) => [
          ...prevImages,
          { id: data.id, img: newImage },
        ]);
        setNewImage("");
      })
      .catch((error) => console.error("Error creating image:", error));
  };

  const handleUpdateImage = (id) => {
    console.log("Updating image with ID:", id);
    console.log("New image value:", inputValue);
    fetch(`http://localhost:1010/images/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ img: inputValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);

        setImages((prevImages) =>
          prevImages.map((image) =>
            image.id === id ? { ...image, img: inputValue } : image
          )
        );
        setSelectedImage(null);
      })
      .catch((error) => console.error("Error updating image:", error));
  };

  const handleDeleteImage = (id) => {
    fetch(`http://localhost:1010/images/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);

        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting image:", error));
  };

  return (
    <div className="container-background">
      <div className="container-home-margin">
        <div className="container-home-padding">
          <div className="input-group mb-3 width">
            <input
              type="text"
              className="form-control"
              placeholder="Url"
              value={newImage}
              onChange={handleImageChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleCreateImage}
            >
              Create
            </button>
          </div>
          <div className="imgbanner">
            <ul className="img-container">
              {images.map((image) => (
                <li
                  className="img-item"
                  key={image.id}
                  style={{ listStyleType: "none", margin: "10px 0" }}
                >
                  <img
                    className="imgmargin"
                    src={image.img}
                    alt={`Image ${image.id}`}
                    style={{ width: "200px", height: "150px" }}
                  />

                  <div className="box-select-delete">
                    <div className="button-select-delete">
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => setSelectedImage(image.img)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {selectedImage === image.img && (
                    <div className="button-update">
                      <input
                        className="input-border"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />

                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleUpdateImage(image.id)}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="location">
            <LeafletCRUD />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
