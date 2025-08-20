import { useEffect, useMemo, useState } from "react";
import "../Form.css";
import Urls from "../../utils/Api";
import dateFun from "../../utils/dateFun";
import GalleryGrid from "./GalleryGrid.js";
import axiosInstance from "../../utils/apiRequest.js";
import AppendForm from "../../utils/Forms.js";

export default function EventForm() {
  const [add, setAdd] = useState(false);
  const [event, setEvents] = useState([]);  
  const [eveId, setEveId] = useState("");
  const [openGallery, setOpenGallery] = useState(false);
  const [render,setRender] = useState(false);

  const Events = [{ _id:"1",title: "Event 1", date: "2023-10-01", time: "10:00 AM", description: "Description 1" }
    ,{ _id:"2", title: "Event 2", date: "2023-10-02", time: "11:00 AM", description: "Description 2" }];

  const events = useMemo(() => {
    return  Events.map((eve, i) => (
          <div className="card" key={i}>
            <img className="event_card_img" src={null} alt="" />
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
        ))
  }, [event]);  

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
            setRender(!render);
          }
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    } catch (error) {}
  };

  // useEffect(() => {
  //   try {
  //     axiosInstance
  //       .get(Urls.GETEVENTS)
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setEvents(res.data);
  //         }
  //       })
  //       .catch((err) => {
  //         alert(err.response.data.msg);
  //       });
  //   } catch (error) {}
  // }, [render]);

  const deleteEveFun = (e, id) => {
    try {
      e.preventDefault();

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
        });
    } catch (error) {}
  };

  return (
    <div className="container">
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
       {events}
      </div>

      {openGallery && GalleryView}
    </div>
  );
}
