import React, { Component } from "react";
import OnError from "../../misc_components/error/OnError";

class Home extends Component {
  render() {
    return (
      <OnError
      errorText="Patience"
        errorMsg="Contruction is going on."
        showRetry
        retryMsg="You may try again. And return back to me."
        onRetry={() => {
          console.log("hello");
        }}
      />
    );
  }
}

export default Home;
