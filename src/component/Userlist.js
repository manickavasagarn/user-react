import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Userlist() {
  const [userlist, setuserlist] = useState([]);
  useEffect(() => {
    return () => {
      getdata();
      console.log("test")
    };
  }, []);

  async function getdata() {
    try {
      var data = await axios.get("https://user-api-2.onrender.com");
      var users = await data.data;
      console.log(users);
      setuserlist(users);
    } catch (error) {
      console.log(error);
    }
  }

  var handledelete = async (id) => {
    var result = window.confirm("you went to delete the user !");
    if (result) {
      await axios.delete(`https://user-api-2.onrender.com/delete-user/${id}`);
      getdata();
    }
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-6">
          <h5 className="animate__animated animate__bounce">User List</h5>
        </div>
        <div className="col-lg-6 text-end">
          <Link to="/creatuser">
            <button className="btn btn-info ">Create User</button>
          </Link>
        </div>
      </div>
      <table class="table table-striped mt-5  animate__animated  animate__backInRight">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((obj, index) => {
            var url = `/edituser/${obj._id}`;
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{obj.name}</td>
                <td>{obj.email}</td>
                <td>
                  <Link to={url}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handledelete(obj._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Userlist;
