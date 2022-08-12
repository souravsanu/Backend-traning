const express = require("express");
const router = express.Router();
//............................1 Assginment.........................................................................
// let players = [
//   {
//     name: "manish",
//     dob: "1/1/1995",
//     gender: "male",
//     city: "jalandhar",
//     sports: ["swimming"],
//   },
//   {
//     name: "gopal",
//     dob: "1/09/1995",
//     gender: "male",
//     city: "delhi",
//     sports: ["soccer"],
//   },
//   {
//     name: "lokesh",
//     dob: "1/1/1990",
//     gender: "male",
//     city: "mumbai",
//     sports: ["soccer"],
//   },
// ];

// router.post("/players", function (req, res) {
//   let newPlayer = req.body;
//   let newPlayersName = newPlayer.name;
//   let Namerepeated = false;
//   for (let i = 0; i < players.length; i++) {
//     if (players[i].name == newPlayersName) {
//       Namerepeated = true;
//       break;
//     }
//   }
//   if (Namerepeated == true) {
//     res.send("This player is alredy exist");
//   } else {
//     players.push(newPlayer);
//     res.send(players);
//   }
// });

//........................................2nd Assignment.....................................................................................
let players = [
  {
    name: "manish",
    dob: "1/1/1995",
    gender: "male",
    city: "jalandhar",
    sports: ["swimming"],
  },
  {
    name: "gopal",
    dob: "1/09/1995",
    gender: "male",
    city: "delhi",
    sports: ["soccer"],
  },
  {
    name: "lokesh",
    dob: "1/1/1990",
    gender: "male",
    city: "mumbai",
    sports: ["soccer"],
  },
];
let bookings = [
  {
    bookingNumber: 1,
    bookingId: 12,
    sportId: "",
    centerId: "",
    type: "private",
    slot: "16286598000000",
    bookedOn: "31/08/2021",
    bookedFor: "01/09/2021",
  },
  {
    bookingNumber: 2,
    bookingId: 14,
    sportId: "",
    centerId: "",
    type: "private",
    slot: "16286598000000",
    bookedOn: "31/08/2021",
    bookedFor: "01/09/2021",
  },
  {
    bookingNumber: 3,
    bookingId: 18,
    sportId: "",
    centerId: "",
    type: "private",
    slot: "16286598000000",
    bookedOn: "31/08/2021",
    bookedFor: "01/09/2021",
  },
];
router.post("/players/:playerName/bookings/:bookingId", function (req, res) {
  let playerExist = false;
  for (let i = 0; i < players.length; i++) {
    if (players[i].name == req.params.playerName) {
      playerExist = true;
    }
  }
  if (!playerExist) {
    return res.send("This player does not exist");
  }
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingId == req.params.bookingId) {
      return res.send("This booking id already existed in Data");
    }
  }
  req.body.playerName = req.params.playerName;
  req.body.bookingId = req.params.bookingId;

  bookings.push(req.body);
  return res.send(bookings);
});
//...........................................................................end....................................................
router.get("/students/:name", function (req, res) {
  let studentName = req.params.name;
  console.log(studentName);
  res.send(studentName);
});

router.get("/random", function (req, res) {
  res.send("hi there");
});

router.get("/test-api", function (req, res) {
  res.send("hi FunctionUp");
});

router.get("/test-api-2", function (req, res) {
  res.send("hi FunctionUp. This is another cool API");
});

router.get("/test-api-3", function (req, res) {
  res.send(
    "hi FunctionUp. This is another cool API. And NOw i am bored of creating API's "
  );
});

router.get("/test-api-4", function (req, res) {
  res.send(
    "hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s "
  );
});

router.get("/test-api-5", function (req, res) {
  res.send(
    "hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s "
  );
});

router.get("/test-api-6", function (req, res) {
  res.send({ a: 56, b: 45 });
});

router.post("/test-post", function (req, res) {
  res.send([23, 45, 6]);
});

router.post("/test-post-2", function (req, res) {
  res.send({ msg: "hi", status: true });
});

router.post("/test-post-3", function (req, res) {
  // let id = req.body.user
  // let pwd= req.body.password

  // console.log( id , pwd)

  console.log(req.body);

  res.send({ msg: "hi", status: true });
});

router.post("/test-post-4", function (req, res) {
  let arr = [12, "functionup"];
  let ele = req.body.element;
  arr.push(ele);
  res.send({ msg: arr, status: true });
});

module.exports = router;
