import  { useState, useEffect } from "react";
import "./Annoncement.css";
import Urls from "../../utils/Api";
import axiosInstance from "../../utils/apiRequest";

const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axiosInstance.get(Urls.GETANNOUNCEMENTS);
      console.log(res,"ASfsfd");
       
      setAnnouncements(res.data);
    } catch (error) {
      
    }
  };

  const addAnnouncement = async () => {
    if (!message.trim()) return;
    await axiosInstance.post(Urls.ADDANNOUNCEMENT, { message });
    setMessage("");
    fetchAnnouncements();
  };

  const deleteAnnouncement = async (id) => {
    try {
      await axiosInstance.post(Urls.DELETEANNOUNCEMENT, { id });
      fetchAnnouncements();
      
    } catch (error) {
      
    }
  };

  return (
    <div className="container">
      <h2>Annoncement</h2>
      {announcements.length > 0 && (
        <div className="bg-yellow-300 text-black text-center py-2 font-medium">
          {announcements[0].message}
        </div>
      )}

   
      <div className="add_container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter announcement..."
          className="border px-2 py-1 rounded w-80"
        />
        <button
          onClick={addAnnouncement}
          className="blue_btn"
        >
          Add
        </button>
      </div>

      <ol className="annonce_list">
        {announcements.map((a) => (
          <li
            key={a._id}
            className="gap-1"
          >
            {a.message}
            <button
              onClick={() => deleteAnnouncement(a._id)}
              className="blue_btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AnnouncementBar;
