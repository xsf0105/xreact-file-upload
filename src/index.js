import React from "react";
import { render } from "react-dom";
import FileUpload from "./lib";

export class App extends React.Component {
  render() {
    return (
      <div>
        <p>How to use:</p>
        <FileUpload
          customNode={
            <span>click to upload your file</span>
          }
          maxSize={5}
          request={{
            url: "/rest/api/v1/salaryDataApi/salaryDataImportFromMobile",
            method: "POST",
            fields: {
              name: "test fields"
            },
            headers: {
              "X-CSRF-TOKEN": "test headers"
            }
          }}
          uploadSuccess={() => {
            alert("success！！！")
          }}
          uploadError={() => {
            alert("error!!!");
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
