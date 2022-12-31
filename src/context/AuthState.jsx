import React from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useState } from "react";
const AuthState = (props) => {
  const [hospitalData, setHospData] = useState();
  const [doctorData, setDoctorData] = useState();
  const [hospitalAdded, setHospitalAdded] = useState(false);
  const [docDeptAdded, setDocDeptAdded] = useState(false);
  const [token, setToken] = useState("");
  const [hospId, setHospId] = useState("");
  const [onHosp, setHosp] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [deptArray, setDeptarray] = useState([]);
  const [docUniqueId, setDocUniqueId] = useState();
  const [doctorArray, setDoctorArray] = useState([]);
  const [singleDoc, setSingleDoc] = useState([]);
  const [ImageGallery, setImageGallery] = useState();
  const [imageSaveHosp, setImageSave] = useState();
  // const url = "http://164.92.107.25:2300";
  const url = "http://127.0.0.1:2300";
  function addHospital(id, fullName, address, image) {
    const formData = new FormData();
    formData.append("name", fullName);
    selectedImages.forEach(function (value) {
      formData.append("picture", value); // you have to add array symbol after the key name
    });
    axios.post(`${url}/api/v1/hospital/`, formData).then((res) => {
      console.log(res.data.data);
      alert("Hospita added");
      setHospData(res.data.data.data);
      retrieveHospital();
      setSelectedImages([]);
    });
    //     fetch(`${url}/api/v1/hospital/`, {
    //        method: 'POST',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify({
    //         name:fullName,
    //         picture:image,
    //        })
    //    })
    //        .then((response) => response.json())
    //        .then((responseData) => {
    //            console.log(
    //                "POST Response",
    //                "Response Body -> " + JSON.stringify(responseData) +
    //                alert("Congratulations! Hospital is registered") +
    //                 setHospData(responseData.data.data) + setSelectedImages([])
    //            )
    //        })
    //        .catch(error => console.log(error.toString() + alert("Oops!some error occured")))
    //addDepartment(hospitalData._id,address)
  }
  function addDepartment(address, id) {
    let entries = Object.entries(address);
    let data = entries.map(([key, val] = entry) => {
      return `${val}`;
    });

    //${url}/api/v1/dep/
    fetch(`${url}/api/v1/dep/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data[0],
        hospital: id,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
          "POST Response",
          "Response Body -> " +
            JSON.stringify(responseData) +
            "department registered" +
            alert("Department Added!") +
            setSelectedImages([])
        );
      })
      .catch((error) =>
        console.log(error.toString() + alert("Oops! Some error occured"))
      );
  }
  function addImage(dataEdit, image) {
    const Id = dataEdit.id;
    const formData = new FormData();
    console.log(image);
    formData.append("picture", image);
    axios
      .patch(`${url}/api/v1/hospital/imageUpload/${Id}`, formData)
      .then((res) => {
        console.log(res.data.data);
        setImageSave(res.data.data);
        //alert("Hospital Edited")
      });
  }
  function editHospitalImage(dataEdit, img) {
    const Id = dataEdit.id;

    // const formData = new FormData()
    // formData.append('name', dataEdit.name)
    // selectedImages.forEach(function(value) {
    //     formData.append("picture", value)
    //   })

    //   axios.patch(`http://localhost:2300/api/v1/hospital/${Id}`,formData).then((res)=>{
    //       console.log(res.data.data)
    //       alert("Hospital Edited")
    //   })
  }
  function editHospital(dataEdit, img) {
    const Id = dataEdit.id;
    //console.log(img.push(imageSaveHosp?.picture.toString()))

    // addImage(Id)
    // const formData = new FormData()
    // formData.append('name', dataEdit.name)
    // selectedImages.forEach(function(value) {
    //     formData.append("picture", value)
    //   })

    //   axios.patch(`http://localhost:2300/api/v1/hospital/${Id}`,formData).then((res)=>{
    //       console.log(res.data.data)
    //       alert("Hospital Edited")
    //   })
    //  console.log(dataEdit)
    //  const Id = dataEdit.id;
    //  console.log(img)
    //http://localhost:2300/api/v1/hospital/${Id}
    fetch(`${url}/api/v1/hospital/${Id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dataEdit.name,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
          "PUT Response",
          "Response Body -> " +
            JSON.stringify(responseData) +
            "Hospital Updated" +
            alert("Hospital Updated! Refresh to see change") +
            setSelectedImages([])
        );
      })
      .catch((error) =>
        console.log(error.toString() + alert("Oops! Some error occured"))
      );
  }
  function getOneHospital(id) {
    //console.log(id)
    axios
      .get(`${url}/api/v1/hospital/${id}`)
      .then((response) => {
        const oneHospital = response.data;
        //console.log(oneHospital.data)
        setHosp(oneHospital.data);
        localStorage.setItem("HospDataOne", JSON.stringify(oneHospital));
        console.log(oneHospital.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }
  function getOneDept(id) {
    //console.log(id)
    axios
      .get(`${url}/api/v1/dep/${id}`)
      .then((response) => {
        const oneHospital = response.data;
        console.log(oneHospital.data.doctor);
        localStorage.setItem("DocDataUnique", JSON.stringify(oneHospital));
      })
      .catch((error) => console.log(`Error: ${error}`));
  }
  function getOneDoctor(id) {
    //console.log(id)
    axios
      .get(`${url}/api/v1/doctor/${id}`)
      .then((response) => {
        const oneHospital = response.data;
        //console.log(oneHospital.data)
        localStorage.setItem("DocDataOne", JSON.stringify(oneHospital));
      })
      .catch((error) => console.log(`Error: ${error}`));
  }
  function deleteHospital(id) {
    console.log("deleted");
    fetch(`${url}/api/v1/hospital/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
          "DELETE Response",
          "Response Body -> " +
            JSON.stringify(responseData) +
            console.log(responseData) +
            alert("Congratulations! Hospital Deleted, Refresh to see results") +
            retrieveHospital()
        );
      })
      .catch((error) => console.log(error.toString()));
  }
  const retrieveHospital = () => {
    axios
      .get(`${url}/api/v1/hospital/`)
      .then((response) => {
        const allHospital = response.data;

        console.log(allHospital.data);
        localStorage.setItem("HospData", JSON.stringify(allHospital));
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function addDoctor(
    id,
    fullName,
    certificate,
    experience,
    dept,
    hospital,
    image
  ) {
    console.log(id, fullName, certificate, experience, dept, hospital, image);
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("qualification", certificate);
    formData.append("experiance", experience);
    formData.append("picture", image);
    formData.append("hospital", hospital);
    formData.append("department", dept);
    axios.post(`${url}/api/v1/doctor/`, formData).then((res) => {
      console.log(res.data.data);
      setDoctorData(res.data.data);
      retrieveDoctor();
    });
    // //${url}/api/v1/doctor/
    // fetch(`${url}/api/v1/doctor/`, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name:fullName,
    //         qualification:certificate,
    //         experiance:experience,
    //         picture:image,
    //         hospital:hospital,
    //         department:dept
    //     })
    // })
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //         console.log(
    //             "POST Response",
    //             "Response Body -> " + JSON.stringify(responseData) +
    //             alert("Congratulations! Doctor is registered") +
    //             setDoctorData(responseData.data.data)
    //         )
    //     })
    //     .catch(error => console.log(error.toString()+ alert("Oops! Some error occured")))
  }
  function editDoctorImage(id, fullName, certificate, experience, image) {
    console.log(id, fullName, certificate, experience, image);
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("qualification", certificate);
    formData.append("experiance", experience);
    formData.append("picture", image);
    //formData.append('picture', image)
    axios.patch(`${url}/api/v1/doctor/${id}`, formData).then((res) => {
      console.log(res.data.data);
      setDoctorData(res.data.data);
      retrieveDoctor();
    });
    console.log("Image Selected");
  }
  function editDoctor(id, fullName, certificate, experience, image) {
    console.log(id, fullName, certificate, experience, image);
    console.log("image not selected");
    // const formData = new FormData()
    // formData.append('name', fullName)
    // formData.append('qualification',certificate)
    // formData.append('experiance', experience)
    // formData.append('picture', "abc")
    // //formData.append('picture', image)
    //   axios.patch(`http://localhost:2300/api/v1/doctor/${id}`,formData).then((res)=>{
    //       console.log(res.data.data)
    //       setDoctorData(res.data.data)
    //       retrieveDoctor()
    // })
    fetch(`${url}/api/v1/doctor/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        qualification: certificate,
        experiance: experience,
        picture: image,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
          "PUT Response",
          "Response Body -> " +
            JSON.stringify(responseData) +
            "Doctor Updated" +
            alert("Doctor Updated! Refresh to see change")
        );
      })
      .catch((error) =>
        console.log(error.toString() + alert("Oops! Some error occured"))
      );
  }
  function deleteDoctor(id) {
    console.log(id);
    fetch(`${url}/api/v1/doctor/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
          "POST Response",
          "Response Body -> " +
            JSON.stringify(responseData) +
            alert(
              "Congratulations! Doctor is Deleted, Refresh to see results"
            ) +
            retrieveDoctor()
        );
      })
      .catch((error) =>
        console.log(error.toString() + alert("Oops! Some error occured"))
      );
  }
  function retrieveDoctor() {
    axios
      .get(`${url}/api/v1/doctor/`)
      .then((response) => {
        const allHospital = response.data;
        console.log(allHospital.data);
        localStorage.setItem("DocData", JSON.stringify(allHospital));
      })
      .catch((error) => console.log(`Error: ${error}`));
  }
  function login(email, password) {
    fetch(`${url}/api/v1/user/logIn`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(
          "POST Response",
          "Response Body -> " +
            JSON.stringify(responseData) +
            alert("Congratulations! User is LoggedIn") +
            setToken(responseData.token) +
            localStorage.setItem("Token", responseData.token)
        );
      })
      .catch((error) => console.log(error.toString()));
  }

  function passChange(oldPass, newPass) {
    console.log(oldPass, newPass);
  }
  function logOut() {
    console.log("Logging out");
  }
  const state = {
    name: "harry",
    addHospital,
    editHospital,
    deleteHospital,
    retrieveHospital,
    addDoctor,
    editDoctor,
    deleteDoctor,
    retrieveDoctor,
    login,
    passChange,
    logOut,
    hospitalData,
    hospitalAdded,
    setHospitalAdded,
    addDepartment,
    getOneHospital,
    onHosp,
    docDeptAdded,
    setDocDeptAdded,
    selectedImages,
    setSelectedImages,
    getOneDept,
    deptArray,
    setDeptarray,
    docUniqueId,
    setDocUniqueId,
    getOneDoctor,
    doctorArray,
    setDoctorArray,
    singleDoc,
    setSingleDoc,
    ImageGallery,
    setImageGallery,
    editDoctorImage,
    editHospitalImage,
    addImage,
    imageSaveHosp,
    setImageSave,
  };
  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};
export default AuthState;
