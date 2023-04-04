import React, { useEffect, useState } from "react";
import "./Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "./firebase";

function Feed() {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  return (
    <div className="feed">
      {/* story */}
      <StoryReel />
      {/* Messagesender */}
      <MessageSender />
      {/* <Post
        profilePic="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        message="wow this works"
        timestamp="this is a timestamp"
        username="sourav mondal"
        image="https://www.bugatti.com/fileadmin/_processed_/0/3/csm_header_9018664930.jpg"
      />
      <Post
        profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvMiyN5HsRynaeQKEEnB37x_bJ6poJCg3NQ&usqp=CAU"
        message="wow this works"
        timestamp="this is a timestamp"
        username="sourav mondal"
        image="https://www.digitaltrends.com/wp-content/uploads/2022/03/iphone-14-will-serve-the-same-looks-as-its-predecessor.jpg?fit=720%2C720&p=1"
      />
      <Post /> */}
      {Posts.map((post) => (
        <Post
          key={post.id}
          profilePic={post?.data?.profilePic}
          message={post?.data?.message}
          timestamp={post?.data?.timestamp}
          username={post?.data?.username}
          image={post?.data?.image}
        />
      ))}
    </div>
  );
}

export default Feed;
