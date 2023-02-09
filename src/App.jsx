// import React from "react";
// import Card from "./Cards";
// import Sdata from "./Sdata";

// const App = () => {
//   <>
//     <h1 className="heading_style"> List of top 5 Netflix Series in 2020 </h1>

//     {Sdata.map((val, index) => {
//       console.log(index);
//       return (
//         <Card
//           key={val.id}
//           imgsrc={val.imgscr}
//           title={val.title}
//           sname={val.sname}
//           links={val.links}
//         />
//       );
//     })}
//   </>;
// };

// export default App;
import React from "react";
import Card from "./Cards";
import Sdata from "./Sdata";

// console.log(Sdata[0].sname);

// function ncard(carddata) {
//   // console.log(carddata.sname);
//   // console.log(carddata.Sdata);

//   return (
//     <Card
//       imgscr={carddata.imgscr}
//       sname={carddata.sname}
//       title={carddata.title}
//     />
//   );
// }

const App = () => {
  return (
    <>
      <h1 className="heading_style"> List of top 5 Netflix Series in 2023 </h1>

      {Sdata.map((val, index) => {
        console.log(index);
        return (
          <Card
            key={val.id}
            imgsrc={val.imgsrc}
            sname={val.sname}
            title={val.title}
            link={val.link}
          />
        );
      })}
    </>
  );
};

export default App;
