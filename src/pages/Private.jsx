import { IconButton, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import { AddToPhotosOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import config from "../config";
import Table from "../components/Table";

// ------------------------- style component material ui ------------------------

const useStyles = makeStyles(() => ({
  inputInput: {
    minWidth: "400px",
    marginBottom: "-20px",

    border: 0,
    borderRadius: 20,
    color: "white",
  },
  iconee: {
    fontSize: "30px",
  },
  radio1: {
    height: 40,
    marginRight: 100,
    marginLeft: "10px",
  },
  radio2: {
    height: 40,
  },
  radio1P: {
    height: 40,
    marginRight: 100,
  },
  radio2P: {
    height: 40,
    marginLeft: "-5px",
  },
}));


const Private = (props) => {
  const classes = useStyles();
  // using useState to set state foe values
  const [filename, Setname] = useState("");
  const [type, Settype] = useState("file");
  const [inputP, setInputP] = useState("false");

  const [newurl, setNewurl] = useState("...");
  const [text, setText] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    uname: "Please enter file name",
    pass: "please choose File or Folder",
    PorP: "please choose Public or Private",
    success: "successfull copied",
  };
  // -------------------- function to post form to api--------------

  const addForm = async () => {
    document.getElementById("reset").value = "";
    document.getElementById("Choose_Yes").checked = false;

    if (filename === "") {
      setErrorMessages({ name: "uname", message: errors.uname });
    } else if (type === undefined || type === "") {
      setErrorMessages({ name: "pass", message: errors.pass });
    } else if (inputP === undefined) {
      setErrorMessages({ name: "PorP", message: errors.PorP });
    } else {
      let token = localStorage.getItem("accessToken");

      var newform = {
        name: filename,
        isPrivate: inputP,
        type: type,
      };
      let Id = await axios({
        method: "POST",
        url: config.REACT_APP_SERVER_URL + "/create",
        data: newform,
        headers: {
          authorization: "token: " + token,
        },
      });
      Setname("");
      Settype("");
      if (newform.type === "file") {
        setNewurl(Id.data.data.ID);
      } else {
        setNewurl(Id.data.data.ID);
      }
    }
  };
  // ----------------------- fucntion control error client---------------
  const renderErrorMessage = (filename) =>
    filename === errorMessages.filename && (
      <div className="error">{errorMessages.message}</div>
    );

  //  function to show url in input box

  const inputHandler = () => {
    setText(config.REACT_APP_SERVER_URL + "/" + newurl);
  };

  // --------------funtion to coppy text in input box -----------------------

  const copy = async () => {
    await navigator.clipboard.writeText(text);

    setErrorMessages({ name: "success", message: errors.success });
  };

  // --------------------------------- call api data table-----------------

  const theadData = ["Name", "Size", "Date", "Download"];
  const [fileData, setfileData] = useState("");
  console.log("fileData", fileData);

  // --------------------------------- set value to get data from api
  let token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchProducts = async () => {
      const respone = await axios({
        method: "get",
        url: config.REACT_APP_SERVER_URL + "/all",
        headers: { authorization: "token: " + token },
      });
      setfileData(respone.data.data);
    };
    fetchProducts();
    console.log("respone");
  }, [token]);

  // --------------------set state filedata to avoid async ---------------------------------

  const [datatable, setDataTable] = useState([]);

  useEffect(() => {
    if (fileData === null) {
      setDataTable(fileData.files);
      console.log("if");
    } else {
      setDataTable([]);
    }
  }, [fileData]);

  // -------------------------- function to logout -------------------

  const Logout_page = () => {
    props.history.push("/");
  };

  const handleChange = (event) => {
    Settype(event.target.value);
  };

  const handleP = (e) => {
    setInputP(e.target.value);
  };
// -----------------render ui ------------------------------------

  return (
    <Helmet title="Public page">
      <div style={{ textAlign: "center", marginBottom: "-20px" }}>
        <img
          src="../images/logo1.png"
          style={{ height: "150px", width: "200px" }}
          alt="logo"
        />
      </div>

      <div className="formaddtext">
        <div>
          <TextField
            className={classes.inputInput}
            fullWidth
            id="reset"
            type="text"
            onChange={(e) => Setname(e.target.value)}
            name="uname"
            variant="outlined"
            placeholder="Create File/Folder"
            InputProps={{
              style: {
                borderRadius: 100,
                paddingLeft: "50px",

                fontSize: 15,
              },

              endAdornment: (
                <IconButton>
                  <AddToPhotosOutlined
                    className={classes.iconee}
                    onClick={() => addForm()}
                  />
                </IconButton>
              ),
            }}
          />
          {renderErrorMessage("uname")}
        </div>
      </div>

      <section>
        <div className="Logout" style={{ textAlign: "right" }}>
          <button
            className="button_new"
            style={{ marginTop: "50px", marginBottom: "50px" }}
            onClick={() => Logout_page()}
          >
            <i class="bx bx-log-out"></i>
          </button>
        </div>
      </section>
      <div></div>

      <div style={{ textAlign: "center" }}>
        File
        <Radio
          checked={type === "file"}
          onChange={handleChange}
          value="file"
          name="pass"
          className={classes.radio1}
        />
        Folder
        <Radio
          checked={type === "folder"}
          onChange={handleChange}
          value="folder"
          name="pass"
          className={classes.radio2}
        />
        <div> {renderErrorMessage("pass")}</div>
      </div>

      <div style={{ textAlign: "center" }}>
        Public
        <Radio
          checked={inputP === "false"}
          onChange={handleP}
          value="false"
          name="PorP"
          id="Choose_Yes"
          className={classes.radio1P}
        />
        Private
        <Radio
          checked={inputP === "true"}
          onChange={handleP}
          value="true"
          name="PorP"
          id="Choose_Yes"
          className={classes.radio2P}
        />
        <div> {renderErrorMessage("PorP")}</div>
      </div>

      <div className="url" style={{ textAlign: "center" }}>
        <h3>
          This is your URL:{" "}
          <span style={{ color: "red", cursor: "pointer" }}>
            {" "}
            <Link to={newurl} target="_blank">
              {" "}
              {config.REACT_APP_SERVER_URL + "/" + newurl}
            </Link>{" "}
          </span>{" "}
        </h3>
      </div>

      <div style={{ textAlign: "center" }}>
        <input
          className="inputgetURL"
          type="text"
          name="success"
          value={text}
          onChange={inputHandler}
          style={{ width: "400px", height: "30px" }}
          placeholder="Enter spacebar to get link "
        />

        <div style={{ marginLeft: "350px", marginTop: "-33px" }}>
          <button
            onClick={copy}
            disabled={!text}
            style={{
              background: "none",
              border: "none",
              marginLeft: "10px",
              paddingTop: "-10px",
            }}
          >
            <i
              class="bx bx-copy"
              variant="inherit"
              style={{ fontSize: "30px", lineHeight: "20px" }}
            ></i>
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table theadData={theadData} tbodyData={datatable} />
      </div>
    </Helmet>
  );
};

export default Private;
