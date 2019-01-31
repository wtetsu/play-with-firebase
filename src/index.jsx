import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/functions";
import config from "./config";

firebase.initializeApp(config);

const db = firebase.database();
const myChatAll = db.ref("/my/chat/all");

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localMessage: "",
      sharedMessage: ""
    };

    this.doChange = this.doChange.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <h1>Play with Firebase</h1>
        <ul>
          <input type="text" onChange={this.doChange} />
          <button onClick={this.doUpdate}>Update</button>
          <div>{this.state.sharedMessage}</div>
        </ul>
      </div>
    );
  }

  async componentDidMount() {
    myChatAll.on("value", snapshot => {
      const text = snapshot.val() && snapshot.val().text;
      this.setState({
        sharedMessage: text
      });
    });
  }

  doChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  doUpdate() {
    const newMessage = this.state.message;
    myChatAll.set({ title: "example", text: newMessage });
  }
}

render(<Main />, document.getElementById("app"));
