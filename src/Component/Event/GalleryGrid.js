
import React, { useEffect, useMemo, useState } from "react";
import GalleryForm from "./GallerForm.js";
import "./Gallery.css";
import Urls from "../../utils/Api.js";
import axiosInstance from "../../utils/apiRequest.js";
import emptyImage  from "../../assets/landSecondBg.png"

const GalleryGrid = ({ EventId, setOpenGallery }) => {
  const [openForm, setOpenForm] = useState(false);
  const [eveName, setEveName] = useState("");

  const [render, setRender] = useState(false);

  const [eveImg, setEveImage] = useState([]);

  const AddImageChild = useMemo(() => {
    return (
      <GalleryForm id={EventId} eveName={eveName} setOpenForm={setOpenForm} setRender={setRender} render={render} />
    );
  }, [EventId , eveName , render]);

  const EventImages = [ { id: 1, url: emptyImage }, { id: 2, url: emptyImage }];  

  const handleDelete = (Id) => {
    try {
      if (Id && EventId) {
      axiosInstance
        .post(Urls.DELETEIMAGE, { eventId: EventId, imageId: Id })
        .then((res) => {
          if(res.status === 200){
           
            alert(res.data.msg)
           setRender(!render);
            
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

  useEffect(() => {
    try {
      axiosInstance
      .post(Urls.GETEVENTIMAGES, { eventId: EventId })
      .then((res) => {
        if (res.status === 200) {
          setEveName(res?.data?.value?.title);
          setEveImage([...res?.data?.value?.images]);
        }
      })
      .catch((err) => {
      //  alert(err.response.data.msg)-*-*------------++++++++
      });
    } catch (error) {
      
    }
    
  }, [render,EventId]);


  return (
    <div className="gallery_container">
      <h2 className="captial">{eveName}</h2>

      <div className="d-flex gap-1 justify-end">
   
        <button
          className="blue_btn"
          onClick={() => {
            setOpenForm(true);
          }}
        >
          Add Gallery
        </button>

             <button
          className="blue_btn"
          onClick={() => {
            setOpenGallery(false);
          }}
        >
          X
        </button>
      </div>

      <div className="gallery-grid">
        { EventImages.length > 0  ? EventImages.map((img) => (
          <div className="gallery-item" key={img.id}>
            <img src={img.url} alt="Gallery" />
            <div className="overlay">
              <button
                onClick={() => handleDelete(img.id)}
                className="btn delete-btn"
              >
                Delete
              </button>
              <a
                href={img?.url}
                download="EventImges.jpg"
                className="btn download-btn"
              >
                Download
              </a>
            </div>
          </div>
        )) : (<div className="gallery-grid"><h2>Add Images</h2></div>)}
      </div>
      {openForm && AddImageChild}
    </div>
  );
};

export default React.memo(GalleryGrid);



