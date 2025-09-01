
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/apiRequest";
import Urls from "../../utils/Api";

const Gallery = () => {

    const [gallery,setGalleryImages] =  useState([])
    const [openForm,setOpenForm] = useState(false)
    const [render,setRender] = useState(false)
    const [image,setImage] = useState(null)

     const handleChangeInput = (e) => {
    const { files } = e.target;
    setImage(files[0]);
  };

   useEffect(() => {
    try {
      axiosInstance
        .get(Urls.GETLANDINGGALLERYIMAGE)
        .then((res) => {
          if (res.status === 200) {
             console.log(res.data,"Datea");
             
            setGalleryImages(res?.data?.images);
          }
        })
        .catch((err) => {
         alert(err?.response?.data?.msg);
        });
    } catch (error) {
      
    }
  }, [render]);


 const UploadImage = (e) => {
    try {
       e.preventDefault();
    if (image) {
      const form = new FormData();
      form.append("image", image);
      axiosInstance
        .post(Urls.UPLANDINGIMAGE, form, {
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


  const handleDelete = (Id) => {
    try {
      if (Id ) {
      axiosInstance
        .post(Urls.DELETELANDINGIMAGE, {  imageId: Id })
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
    
  return (
    <div className="container">
     
        <h2>Gallery</h2>
        <div className="add_btn">
        <button
          onClick={() => {
            setOpenForm(true);
          }}
        >
          Add Images
        </button>

        </div>
        <div className="gallery-grid">

          {gallery.length > 0  && gallery?.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image?.url} alt={"gal"} />
               <div className="overlay">
              <button
                onClick={() => handleDelete(image?.id)}
                className="btn delete-btn"
              >
                Delete
              </button>
             
            </div>
            </div>
          ))}
        </div>
        
        {openForm && (
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
        )}
        
    </div>
  )
}

export default Gallery