import { IconButton, TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";
import Helmet from "../components/Helmet";
import config from "../config";
import { AddToPhotosOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";


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
  },
  radio2: {
    height: 40,
  },
}));

const Public = (props) => {
  const classes = useStyles();
  // using useState to set state foe values
  const [filename, Setname] = useState("");
  const [type, Settype] = useState("file");
  const [fileUrl, setfileUrl] = useState(" ");
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    uname: "Please enter file name",
    pass: "please choose File or Folder",
    success: "successfull copied",
  };
  console.log("fileUrl s", fileUrl);
  const addFrom = async () => {
    document.getElementById("reset").value = "";

    if (filename === "") {
      setErrorMessages({ name: "uname", message: errors.uname });
    } else if (type === undefined) {
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      var newform = {
        name: filename,
        isPrivate: false,
        type: type,
      };
      let Id = await axios({
        method: "POST",
        url: config.REACT_APP_SERVER_URL + "/create",
        data: newform,
      });
      Setname("");
      Settype("");
      if (newform.type === "file") {
        setfileUrl(Id.data.data.ID);
      } else {
        setfileUrl(Id.data.data);
      }
    }
    // console.log("form", newform);
  };

  const LogIN_page = () => {
    props.history.push("/Login");
  };

  const renderErrorMessage = (filename) =>
    filename === errorMessages.filename && (
      <div className="error">{errorMessages.message}</div>
    );

  const [text, setText] = useState("");
  

  const inputHandler = () => {
    setText(config.REACT_APP_SERVER_URL + "/" + fileUrl);
 
    
    
  };
  


  const copy = async () => {
    await navigator.clipboard.writeText(text);

    setErrorMessages({ name: "success", message: errors.success });
  };

  const handleChange = (event) => {
    Settype(event.target.value);
  };

  return (
    <Helmet title="Public page">
      <div className="Login">
        <button className="button_login" onClick={() => LogIN_page()}>
          <i className="bx bx-user"></i>
        </button>
      </div>

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
                    onClick={() => addFrom()}
                  />
                </IconButton>
              ),
            }}
          />
          {renderErrorMessage("uname")}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        File
        <Radio
          checked={type === "file"}
          onChange={handleChange}
          value="file"
          name="pass"
          defaultValue={type}
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

      <div className="url" style={{ textAlign: "center" }}>
        <h3>
          This is your URL:{" "}
          <span style={{ color: "red", cursor: "pointer" }}>
            {" "}
            <Link to={fileUrl} target="_blank">
              {" "}
              {config.REACT_APP_SERVER_URL + "/" + fileUrl}
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

      <div style={{ textAlign: "center" }}>{renderErrorMessage("success")}</div>
    </Helmet>
  );
};

export default Public;
