import {  useEffect, useMemo, useRef, useState } from "react";
import "../Form.css";
import Urls from "../../utils/Api";
import dateFun from "../../utils/dateFun";
import GalleryGrid from "./GalleryGrid.js";
import axiosInstance from "../../utils/apiRequest.js";
import AppendForm from "../../utils/Forms.js";
import empty from "../../assets/landSecondBg.png"


export default function EventForm() {
  const [add, setAdd] = useState(false);
  const [event, setEvents] = useState([]);  
  const [eveId, setEveId] = useState("");
  const [openGallery, setOpenGallery] = useState(false);
  const [render,setRender] = useState(false);

const ref = useRef(0); 

  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    description: "",
    time: "",
    image: "",
  });

  const handleInputs = (e) => {
    const { value, name, files } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));

    if (files && name === "image") {
      setEventDetails((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const GalleryView = useMemo(() => {
    return <GalleryGrid EventId={eveId} setOpenGallery={setOpenGallery} />;
  }, [eveId]);

  const AddEventFun = (e) => {
    try {
      if(ref.current === 0){
          ref.current = 1;
      e.preventDefault();
      const eveInput = AppendForm(eventDetails);
      axiosInstance
        .post(Urls.ADDEVENT, eveInput, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 201) {
          
            setAdd(false);
            setEventDetails({
              title: "",
              date: "",
              description: "",
              time: "",
              image: "",
            });
            setRender(!render);
          }
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    try {
      axiosInstance
        .get(Urls.GETEVENTS)
        .then((res) => {
          if (res.status === 200) {
            setEvents([...res?.data]);
          }
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    } catch (error) {}
  }, [render]);

  console.log(event,"Afdasfafasf");
  

  const deleteEveFun = (e, id) => {
    try {
  
      axiosInstance
        .post(Urls.DELETEEVENT, { eventId: id })
        .then((res) => {
          if (res.status === 200) {
            alert(" event succesfully deleted");
            setRender(!render);
          }
        })
        .catch((err) => {
          alert(err.response.data.msg);
          setRender(!render);
        });
    } catch (error) {}
  };

  return (
    <div className="container ">
      <h2>Events</h2>
      <div className="add_btn">
        <button
          onClick={() => {
            setAdd(true);
          }}
        >
          Add Event
        </button>
      </div>

      {add && (
        <form
          className="form"
          onSubmit={(e) => {
            AddEventFun(e);
          }}
        >
          <div className="add_btn">
            <button
              onClick={() => {
                setAdd(false);
              }}
            >
              X
            </button>
          </div>
          <div className="d-flex flex-col gap-1 w-full">
            <label>Title</label>
            <input
              type="text"
              placeholder="Event Title"
              onChange={(e) => {
                handleInputs(e);
              }}
              name="title"
              value={eventDetails?.title}
              required
              pattern="/^[A-Za-z\ ]{2,50}$/"
            />
          </div>
          <div className="d-flex flex-col gap-1 w-full">
            <label>Description</label>
            <textarea
              placeholder="Event Description"
              onChange={(e) => {
                handleInputs(e);
              }}
              name="description"
              value={eventDetails?.description}
              required
              pattern="/^[A-Za-z\ ]{2,50}$/"
            ></textarea>
          </div>
          <div className="d-flex flex-col gap-1 w-full">
            <label>Event Date</label>
            <input
              type="date"
              name="date"
              onChange={(e) => {
                handleInputs(e);
              }}
              value={eventDetails?.date}
              required
            />
          </div>
          <div className="d-flex flex-col gap-1 w-full">
            <label>Event Time</label>
            <input
              type="time"
              name="time"
              placeholder="Event Time"
              onChange={(e) => {
                handleInputs(e);
              }}
              value={eventDetails?.time}
              required
            />
          </div>
          <div className="d-flex flex-col gap-1 w-full">
            <label>Event Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              placeholder="Event Time"
              onChange={(e) => {
                handleInputs(e);
              }}
            />
          </div>
          <button type="submit">Create Event</button>
        </form>
      )}

      <div className="eventcard_container">
      { event.length > 0 && event.map((eve, i) => (
          <div className="card" key={i}>
            <img className="event_card_img" src={eve?.eventImage || empty} alt="" />
            <div className="eventcard_content">
              <h2>{eve?.title}</h2>
              <div className=" eventcard_date_content">
                <p>Date:{dateFun(eve?.date)}</p>
                <p>Time:{eve?.time}</p>
              </div>
              <p className="event_des">{eve?.description}</p>

              <div className="two_flex_btn">
                <button
                  onClick={() => {
                    setOpenGallery(true);
                    setEveId(eve?._id);
                  }}
                >
                  View Gallery
                </button>

                <button
                  onClick={(e) => {
                    deleteEveFun(e, eve._id);
                  }}
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openGallery && GalleryView}
    </div>
  );
}
