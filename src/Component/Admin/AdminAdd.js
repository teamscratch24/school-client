
import { useEffect, useState } from "react";
import "../Form.css";
import Urls from "../../utils/Api";
import axiosInstance from "../../utils/apiRequest";
import {jwtDecode} from 'jwt-decode'

export default function AdminManagement() {
  const [admins, setAdmins] = useState([ ]);

  const role = jwtDecode(localStorage.token).role

  const [render,setRender] = useState(false)

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [add, setAdd] = useState(false);

  const handleInputs = (e) => {
    const { value, name } = e.target;
    setAdminDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    try {
      axiosInstance
        .get(Urls.GETADMINS)
        .then((res) => {
          if (res.status === 200) {
            setAdmins(res.data.value);
          }
        })
        .catch((err) => {
         alert(err?.response?.data?.msg);
        });
    } catch (error) {
      
    }
  }, [render]);

  const handleDelete = (id) => {

    try {
       axiosInstance.post(Urls.DELETEADMIN, { userId: id }).then((res)=>{
      if(res.status ===200 ){
       alert(res.data.msg)
       setRender(!render)
      }
    }).catch((err)=>{
      alert(err?.data?.response?.msg)
    })
      
    } catch (error) {
      
    }
   
  };

  const AddAdmin = (e) => {
    try {
       e.preventDefault();
    axiosInstance
      .post(Urls.REGISTER, { ...adminDetails })
      .then((res) => {
        if (res.status === 201) {
          setAdminDetails((prev) => ({
            ...prev,
            username: "",
            email: "",
            password: "",
          }));
          setAdd(false);
          alert(res.data.msg)
          setRender(!render)
        }
      })
      .catch((err) => {
        alert(err?.response?.data);
      });
    } catch (error) {
      
    }
   
  };

  return (
    <div className="container">
      {role === "superadmin" && (
      <div className="add_btn">
        <button
          onClick={() => {
            setAdd(true);
          }}
        >
          Add User
        </button>
      </div>
      )}
      {add && (
        <form
          className="form flex flex-col"
          onSubmit={(e) => {
            AddAdmin(e);
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
            <label>AdminName</label>
            <input
              type="text"
              name="username"
              value={adminDetails?.username}
              onChange={(e) => {
                handleInputs(e);
              }}
              placeholder="Admin Name"
              required
              pattern="/^[A-Za-z\ ]{2,50}$/"
            />
          </div>
          <div className="d-flex flex-col gap-1 w-full">
            <label>AdminEmail</label>
            <input
              type="email"
              name="email"
              value={adminDetails?.email}
              onChange={(e) => {
                handleInputs(e);
              }}
              placeholder="Admin Email"
              required
              pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
              title="Enter Valid Email Address"
            />
          </div>
          <div className="d-flex flex-col gap-1  w-full">
            <label>AdminPassword</label>
            <input
              type="password"
              name="password"
              value={adminDetails?.password}
              onChange={(e) => {
                handleInputs(e);
              }}
              placeholder="Admin Password"
              required
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}"
              title="Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
            />
          </div>
          <button type="submit">Add Admin</button>
        </form>
      )}
      <div>
        {admins.map((admin,i) => (
          <div key={i+1}  className="admin-item">
            <div>
              <strong>{admin.username}</strong> <br />
              <span>{admin.email}</span>
            </div>
            {role === "superadmin" && (
            <div>
              <button className="blue_btn" onClick={() => handleDelete(admin._id)}>Delete</button>
            </div>

            )}
          </div>
        ))}
      </div>
    </div>
  );
}
