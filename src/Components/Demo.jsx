import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../SCSS/styles.scss";

export default class Demo extends React.Component {
    render(){
        return (
        <StylesProvider injectFirst>
          <div className="App">
            <Button>Hook</Button>
          </div>
        </StylesProvider>
      );
    }
}