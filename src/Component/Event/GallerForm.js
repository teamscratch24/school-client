import React, { useState } from "react";
import axiosInstance from "../../utils/apiRequest";
import Urls from "../../utils/Api";

const GalleryForm = ({ id, eveName, setOpenForm ,setRender,render}) => {
  const [image, setImage] = useState(null);

  const handleChangeInput = (e) => {
    const { files } = e.target;
    setImage(files[0]);
  };

  const UploadImage = (e) => {
    try {
       e.preventDefault();
    if (id && image) {
      const form = new FormData();
      form.append("eventId", id);
      form.append("image", image);
      axiosInstance
        .post(Urls.UPLOADIMGE, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.status === 200){
          setRender(!render)
          setOpenForm(false);
          setImage(null);
        }
        })
        .catch((err) => {
          alert(err.response.data.msg)
        });
    } else {
      alert("Inputs required");
    }
    } catch (error) {
      
    }
   
  };
  return (
    <div className="form">
      <div className="d-flex">
        <h2>Add Gallery Image</h2>
        <div className="add_btn">
          <button
            onClick={() => {
              setOpenForm(false);
            }}
          >
            X
          </button>
        </div>
      </div>
      <h2 className="captial"> {eveName}</h2>
      <form
        onSubmit={(e) => {
          UploadImage(e);
        }}
      >
        <input
          type="file"
          name="image"
          onChange={(e) => {
            handleChangeInput(e);
          }}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default React.memo(GalleryForm);
