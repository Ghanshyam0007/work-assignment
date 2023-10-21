  import React, { Component, ChangeEvent } from "react";
  import { MentionsInput, Mention, OnChangeHandlerFunc } from "react-mentions";
  import data from "../data.json"
  interface User {
    id: string;
    display: string;
  }

  const defaultStyle = {
    control: {
      backgroundColor: "#fff",
      fontSize: 14,
      fontWeight: "normal"
    },
    highlighter: {
      overflow: "hidden"
    },
    input: {
      margin: 0,
      overflow: "auto",
      height: 30
    },
    "&multiLine": {
      control: {
        fontFamily: "monospace",
        border: "1px solid silver"
      },
      highlighter: {
        padding: 6
      },
      input: {
        padding: 9,
        minHeight: 3,
        outline: 0,
        border: 0
      }
    },
    suggestions: {
      bottom: "0",
      list: {
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.15)",
        fontSize: 14
      },
      item: {
        padding: "5px 15px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
        "&focused": {
          backgroundColor: "#cee4e5"
        }
      }
    }
  };

  const defaultMentionStyle = {
    backgroundColor: "#cee4e5"
  };

  const users: User[] = data.map((person) => ({
    id: `${person.first_name} ${person.last_name}`,
    display: `@${person.first_name} ${person.last_name}`
  }));
  interface AppState {
    value: string;
  }

  class App extends Component<{}, AppState> {
    [x: string]: any;
    state: AppState = {
      value: ""
    };



    handleChange: OnChangeHandlerFunc = (event) => {
      const value = event.target.value;
      console.log("event: ", value);
      const regex = /[^{}]+(?=})/g;
      const mentions = value.match(regex);
      console.log("mentions: ", mentions);
      this.setState({ value: event.target.value });
    };

    render() {
      console.log("state: ", this.state);
      return (
        <div
          style={{
            width: "60%",
            position: "absolute",
            bottom: 0,
            left: 300,
            top: 300,
          }}
        >
          <MentionsInput
            value={this.state.value}
            onChange={this.handleChange}
            style={defaultStyle}
            placeholder="Type something and press @"
          >
            <Mention
              markup="[__display__]{__id__}"
              data={users}
              style={defaultMentionStyle} trigger={"@"}          />
          </MentionsInput>
        </div>
      );
    }
  }


  export default App
