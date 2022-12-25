const socket = io();

var username;
var chats = document.querySelector(".chats");
var users_list = document.querySelector(".users-list");
var users_list = document.querySelector(".users-count");

do {
  username = prompt("Enter your name:");
} while (!username);

socket.emit("new-user-joined", username);

socket.on("user-connected", (socket_name) => {
  userJoinLeft(socket_name, "joined");
});

function userJoinLeft(name, status) {
  let div = document.createElement("div");
  div.classList.add("user-join");
  let content = `<p><b>${name}</b> ${status} the chat</p>`;
  div.innerHTML = content;
  chats.appendChild(div);
}

socket.on("user-disconnected", (user) => {
  userJoinLeft(user, "left");
});

socket.on("user-list", (users) => {
  users_list.innerHTML = "";
  users_arr = Object.values(users);
  for (i = 0; i < users_arr.length; i++) {
    let p = document.createElement("p");
    p.innerText = users_arr[i];
    users_list.appendChild(p);
  }
  users_count.innerHTML = users_arr.length;
});
