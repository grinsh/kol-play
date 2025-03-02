import './App.css';
import NavBar from './generalScreens/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Invitation } from './screens/Invitation';
import { Playback } from './screens/Playback';
import { ProductsToOrders } from './screens/ProductsToOrders';
import { Singers } from './screens/Singers';
import { Songs } from './screens/Songs';
import { User } from './screens/User';
import InvitationUser from './screens/InvitationUser';
import Takanon from './generalScreens/Takanon';
import Welcome1 from './Login/Welcome1';
import Welcome from './Login/Welcome';
import Time from './generalScreens/Time';
import Animation from './generalScreens/Animation';
import MyInvitation from './Add/MyInvitation';
import ShowSong from './Redux toolkit/features/Song/ShowSong';
import Payment from './Login/Payment';
import AddPlayback from './Add/AddPlayback';
import AddSinger from './Add/AddSinger';
import AddSong from './Add/AddSong';
import Filtering from './generalScreens/Filtering';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


// import Download from './generalScreens/Download';
// import Router from './react-router-dom';
// import Switch from './react-router-dom';
// import Link from './react-router-dom';
// import RouteComponent from './react-router-dom';

// function App1() {
//   return (
//     <div className='App1'>
//       <ShowSong />
//     </div>
//   );
// }


function App() {
  const nav = useNavigate();
  return (
    <>
      <div class="header">
        <div className="img" onClick={() => nav("/")}>
          <img className="img-Logo" style={{ backgroundColor: "transparent", height: "21.9%" }} src="./Kol-Play.png" />
        </div>
        <NavBar className="nav" />
        <Time className="time" />
      </div>

       <Routes>
        <Route path="/" element={<div className="animation"><Animation /> </div>} />
        <Route path="invitation" element={<Invitation />} />
        <Route path="playback" element={<Playback />} />
        <Route path="productsToOrders" element={<ProductsToOrders />} />
        <Route path="singers" element={<Singers />} />
        <Route path="songs" element={<Songs />} />
        <Route path="user" element={<User />} />
        <Route path="takanon" element={<Takanon />} />
        <Route path="welcomeRegister" element={<Welcome1 />} />
        <Route path="welcomeLogin" element={<Welcome />} />
        <Route path="playback" element={<Takanon />} />
        <Route path="AddPlayback" element={<AddPlayback />} />
        <Route path="myInvitation" element={<MyInvitation />} />
        <Route path="payment" element={<Payment />} />
        <Route path="addSinger" element={<AddSinger />} />
        <Route path="addSong" element={<AddSong />} />
        <Route path="invitationUser" element={<InvitationUser />} />
      </Routes> 


    </>
  );
}

// function App2() {
//   return (
//     <Router>
//       <Switch>
//         <RouteComponent path="/download">
//           <Download />
//         </RouteComponent>
//         <RouteComponent path="/">
//           <Link to="/download">
//             <button onClick={() => alert('Button clicked!')}>Go to Download</button>
//           </Link>
//         </RouteComponent>
//       </Switch>
//     </Router>
//   );
// }

export default App;



/* מניעת גלילה לאורך או לרוחב- לא עובד*/
const element = document.getElementById('myElement');

if (element) {
  const elementRect = element.getBoundingClientRect();
  console.log(elementRect);
} else {
  console.log('Element not found or not defined.');
}

window.addEventListener('scroll', function () {
  const bottomElements = document.getElementsByClassName('bottom-elements')[0];

  if (bottomElements) {
    const atBottom = bottomElements.getBoundingClientRect().bottom <= window.innerHeight;

    if (!atBottom) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }
});

/*עד כאן מניעת גלילה לאורך או לרוחב*/


// const element = document.getElementById('myElement');

// if (element) {
//   const elementRect = element.getBoundingClientRect();
//   console.log(elementRect);
// } else {
//   console.log('Element not found or not defined.');
// }

// window.addEventListener('scroll', function() {
//   const bottomElements = document.getElementsByClassName('bottom-elements')[0];

//   if (bottomElements) {
//     const atBottom = bottomElements.getBoundingClientRect().bottom <= window.innerHeight;

//     if (!atBottom) {
//       document.body.style.overflowY = 'hidden';
//     } else {
//       document.body.style.overflowY = 'auto';
//     }
//   }
// });


// // Check if the element with id 'myElement' exists before calling getBoundingClientRect()
// const element = document.getElementById('myElement');

// if (element) {
//   // Element exists, so it's safe to call getBoundingClientRect() method
//   const elementRect = element.getBoundingClientRect();
//   console.log(elementRect);
// } else {
//   console.log('Element not found or not defined.');
// }

// // Add a scroll event listener to control scrolling behavior based on elements at the bottom of the page
// window.addEventListener('scroll', function() {
//   // Check if there are elements at the bottom of the page
//   const bottomElements = document.getElementsByClassName('bottom-elements')[0];
//   const atBottom = bottomElements.getBoundingClientRect().bottom <= window.innerHeight;

//   // Prevent vertical scrolling when no elements at the bottom
//   if (!atBottom) {
//     document.body.style.overflowY = 'hidden';
//   } else {
//     document.body.style.overflowY = 'auto';
//   }
// });


// const element = document.getElementById('myElement');

// if (element) {
//   // Element exists, so it's safe to call getBoundingClientRect() method
//   const elementRect = element.getBoundingClientRect();
//   console.log(elementRect);
// } else {
//   console.log('Element not found or not defined.');
// }


// window.addEventListener('scroll', function() {
//   // Check if there are elements at the bottom of the page
//   const bottomElements = document.getElementsByClassName('bottom-elements')[0];
//   const atBottom = bottomElements.getBoundingClientRect().bottom <= window.innerHeight;

//   // Prevent vertical scrolling when no elements at the bottom
//   if (!atBottom) {
//     document.body.style.overflowY = 'hidden';
//   } else {
//     document.body.style.overflowY = 'auto';
//   }
// });