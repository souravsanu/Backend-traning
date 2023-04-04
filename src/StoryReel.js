import React from "react";
import "./StoryReel.css";
import Story from "./Story";

function StoryReel() {
  return (
    <div className="storyReel">
      {/* story */}
      <Story
        image="https://i.ytimg.com/vi/82wsd8fHMEM/maxresdefault.jpg"
        profileSrc="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600"
        title="Nathan Cowley"
      />

      <Story
        image="https://www.wahtrip.com/uploads/overnight/4_pic_lona.jpg"
        profileSrc="https://thumbs.dreamstime.com/b/young-man-checked-shirt-looking-camera-handsome-pune-maharashtra-107945000.jpg"
        title="Samrat Moze"
      />

      {/* story */}
      <Story
        image="https://assets.telegraphindia.com/telegraph/05648444-7dc7-4c71-9a25-656e98a6a0a0.jpg"
        profileSrc="https://thumbs.dreamstime.com/z/portrait-young-handsome-indian-bengali-man-standing-front-victoria-memorial-wearing-blue-shirt-indian-lifestyle-186343540.jpg"
        title="Shankdeep Bera"
      />

      {/* story */}
      <Story
        image="https://cms.education.macleans.ca/wp-content/uploads/2022/11/UNIVERSITY-GUIDEBOOK-2022-VICTORIA-01-1536x1024.jpg"
        profileSrc="https://thumbs.dreamstime.com/b/happy-man-businessman-freelancer-student-working-computer-happy-man-businessman-freelancer-student-working-computer-116677338.jpg"
        title="Jackson"
      />

      {/* story */}
      <Story
        image="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/01/25135425/Untitled-design-13-1-1600x900.jpg"
        profileSrc="https://us.123rf.com/450wm/sudip24/sudip242110/sudip24211000046/177069768-portrait-of-indian-men-dressed-in-kurta-pajama-with-beautiful-indian-woman-wearing-traditional.jpg?ver=6"
        title="Akhas Das"
      />
    </div>
  );
}

export default StoryReel;
