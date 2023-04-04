import React from "react";
import "./Widgets.css";

function Widgets() {
  return (
    <div className="widgets">
      <iframe
        id="widgets_first"
        src="https://www.youtube.com/embed/uXWycyeTeCs"
        // width="500"
        // height="100"
        style={{ border: "none", overflow: "hidden" }}
        // scrolling="no"
        // frameBorder="0"
        // allowTransparency="true"
        // allow="encrypted-media"
      />

      <iframe
        id="widgets__second"
        src="https://www.youtube.com/embed/uXWycyeTeCs"
        // height="100"
        style={{ border: "none", overflow: "hidden" }}
        // scrolling="no"
        // frameBorder="0"
        // allowTransparency="true"
        // allow="encrypted-media"
      />

      <iframe
        id="widegets__third"
        src="http://plnkr.co/"
        height="100"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    </div>
  );
}

export default Widgets;
