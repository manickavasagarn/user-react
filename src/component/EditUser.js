import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "less then 15 characters";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

function EditUser() {
  var id = useParams().id;
  useEffect(() => {
    return async () => {
      try {
        var userdata = await axios.get(`https://user-api-2.onrender.com/${id}`);
        formik.setValues(userdata.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validate,
    onSubmit: async (values) => {
      delete values._id;
      try {
        await axios.put(`https://user-api-2.onrender.com/update-user/${id}`, values);
        Navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className=" mt-5">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="text-center">
                <h5 className=" animate__animated  animate__lightSpeedInRight">
                  Edit user
                </h5>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                  <form onSubmit={formik.handleSubmit}>
                    <label className=" animate__animated animate__lightSpeedInLeft">
                      Name
                    </label>
                    <br></br>
                    <input
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="form-control"
                      name="name"
                    ></input>
                    {formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                    <label className="animate__animated animate__lightSpeedInLeft">
                      Email
                    </label>
                    <br></br>
                    <input
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="form-control"
                      name="email"
                    ></input>
                    {formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                    <br></br>
                    <div className="text-center">
                      <button
                        disabled={
                          Object.keys(formik.errors).length != 0 ? true : false
                        }
                        className="btn btn-info"
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
