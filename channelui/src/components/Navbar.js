import React, { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


//withRouter is discontinued in V6 of reactrouterdom so creating a custom function

import { useNavigate } from 'react-router';

export const withhRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    }
    return Wrapper;
};

const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        // throw new Error("No support for service worker!")
        console.log("No support for service worker!")
    }

    if (!('Notification' in window)) {
      // throw new Error("No support for notification API");
        console.log("No support for notification API");
    }

    if (!('PushManager' in window)) {
      // throw new Error("No support for Push API")
        console.log("No support for Push API")
    }
}

const registerSW = async () => {
   // alert("inside reg")
   let regt,registration
   try{
  // registration = await navigator.serviceWorker.register('/sw.js',{scope:'/'});
    // console.log(registration);
    registration = await navigator.serviceWorker.register('/service-worker.js',{scope:'/'})
   .then(reg  => {
    // console.log('registered', reg)
    regt=reg;
    // reg.update();
    const sw = reg.installing || reg.waiting || reg.active
    sw.postMessage({ milliseconds: Date.now() })
    return reg
  }).then((regt)=> new Promise((resolve,reject)=>{
    // console.log("promis reg",regt)
    // alert("promis")
    // regt.update();
    resolve(regt)
  }))
  .catch((err) => console.error('registration failed',err))
  } catch (err) {
    console.log(regt,err)
    throw err;
  }

  // console.log(registration);
  // alert("reg value")

//   navigator.serviceWorker.ready.then((regi) => {
//     // console.log(registration)
//     // alert("Service worker ready")
//       // regi.showNotification("Announcements", { body: "Service worker registered"})
//   regi.active.postMessage(
//     "Test message sent immediately after creation",
//   );
// })
return registration;
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        // throw new Error("Notification permission not granted")
        console.log("Notification permission not granted")
    }

}

const unSub = async (e) => {

  alert("unSubCalled")

  e.preventDefault();
  e.stopPropagation();
  navigator.serviceWorker.ready.then((reg) => {
  reg.pushManager.getSubscription().then((subscription) => {
    subscription
      .unsubscribe()
      .then((successful) => {
        alert("unsubbed")
        document.getElementById('subsId').innerText="Subscribe Notification"
        document.getElementById('subsId').onclick=main;
        AuthService.removeSub(subscription.endpoint,JSON.parse(localStorage.getItem("user")).email)
        .then((res)=>console.log(res))
        .catch(err => console.log(err));
        alert("unsub action")
      })
      .catch((err) => {
        console.log("Unsub failed"+err)
        alert("Unsub failed "+subscription.endpoint+err)
        // const req=navigator.push.unregister(subscription.endpoint);
        // const req=reg.pushManager.unregister(subscription.endpoint);
        // req.onSuccess = (e) => {
        //   const endpoint = req.result;
        //   console.log(`Unregistered endpoint: ${endpoint}`)
        // }
        // req.onError = (e) => {
        //   const endpoint = req.result;
        //   console.log(`Error Unregistering endpoint: ${endpoint}:`,e.error)
        // }
        reg.unregister().then((data)=>{
          console.log("SW unreg done as subscription clearance fails")
          serviceRegister();
        })
      });
  });
});

}

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
//
// const makeSubs=async(reg)=>{
//   navigator.serviceWorker.ready.then(async(regi) => {
//     // console.log(registration)
//     alert("Service worker ready")
//     const subscription = await regi.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlBase64ToUint8Array("BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U")
//     }).then((subscription)=>{
//       alert("here inside")});
// })
// }

const makeSubs=async(e,reg)=>{
         e.preventDefault();
         alert("inside makesub")
          // const subscription = await self.registration.pushManager.subscribe({
          // navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
          // applicationServerKey: urlBase64ToUint8Array("BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U")
        console.log("inside makesub reg is:",reg)
        const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BNQs2P8QogHwNJu6yKUF6ANs39SwLXBd8hhJfSlWB_8qpFpHWCS6nqPddPCGCD6OJAzsWBj2WYoOJzq-mZ-Pe4E")
        }).then((subscription)=>{
          // alert("here inside")
        // let options = {
        // method: 'POST',
        // body:{subscription:subscription,email:'user13@user.com'},
        // headers: {}
        // }
        // try{
        // fetch(`${process.env.REACT_APP_API_URL}/savesub`, options)
        // .then(data => {
        // console.log(data)
        // })
        // } catch (err) {
        // console.log("Server not available "+err)
        // }

        let a = JSON.stringify(subscription)
        let b = JSON.parse(a)
         const subsItem =
          {
          endpoint:b.endpoint,
          keys:{auth:b.keys.auth,p256dh:b.keys.p256dh}
          }
          console.log(subsItem)
            alert("Saving new sub");
             AuthService.pubSub(subsItem,JSON.parse(localStorage.getItem("user")).email)
          .then((res)=>{console.log(res)})
           console.log("making subs",subscription)
           document.getElementById('subsId').innerText="Subscribed"
           document.getElementById('subsId').onclick=unSub;
        });
}

const serviceRegister =async()=>{
  // const reg = await navigator.serviceWorker.ready
  // console.log("reg here is",reg);
  // alert("check reg")
  // if(reg)

  // {
    checkPermission()
    await requestNotificationPermission()
    await registerSW().then(()=>{
    navigator.serviceWorker.ready.then(async(reg)=>{
    console.log("reg complete",reg)
    const subscription = await reg.pushManager.getSubscription()
    // .then((subscription)=>{
    // console.log(subscription)
    if(subscription) {
      // const a = new Uint8Array(subscription.getKey("auth"))
      let b = []
      let a = JSON.stringify(subscription)
      b.push(JSON.parse(a))
      console.log("matrixed1",a,b[0])
      console.log("matrixed2",a,b[0],b[0].endpoint,b[0].keys.auth)
      console.log("subs is ",JSON.stringify(subscription),JSON.parse(JSON.stringify(subscription)).auth)
      console.log(subscription.endpoint,JSON.parse(JSON.stringify(subscription)).endpoint,subscription.getKey('auth'),subscription.getKey('p256dh'))
      document.getElementById('subsId').innerText="Subscribed"
      document.getElementById('subsId').onclick=unSub
      // console.log(PushManager.supportedContentEncodings())
    }else{
      checkPermission()
      await requestNotificationPermission()
      await registerSW().then((reg)=>{
      document.getElementById('subsId').innerText="Subscribe Notification"
      document.getElementById('subsId').onclick=main
      })
    }
      // }).catch(err=>{
        // console.log("Error registering subscription")})
  })
  })
// }

}


const main = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  alert("mainSubCalled")
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
    .then(()=>{
      navigator.serviceWorker.ready.then(async(reg)=>{
      console.log("reg complete",reg)
      const subscription = await reg.pushManager.getSubscription()
      // .then((subscription)=>{
      // console.log(subscription)
      if(subscription) {
        // const a = new Uint8Array(subscription.getKey("auth"))
        let b = []
        let a = JSON.stringify(subscription)
        b.push(JSON.parse(a))
        console.log("matrixed1",a,b[0])
        console.log("matrixed2",a,b[0],b[0].endpoint,b[0].keys.auth)
        console.log("subs is ",JSON.stringify(subscription),JSON.parse(JSON.stringify(subscription)).auth)
        console.log(subscription.endpoint,JSON.parse(JSON.stringify(subscription)).endpoint,subscription.getKey('auth'),subscription.getKey('p256dh'))
        document.getElementById('subsId').innerText="Subscribed"
        document.getElementById('subsId').onclick=unSub
        // console.log(PushManager.supportedContentEncodings())
      }else{
        console.log("looks like subs is",subscription," and reg is",reg)
        // alert(1)
        makeSubs(e,reg)
      }
        // }).catch(err=>{
          // console.log("Error registering subscription")})
    })
  })
}

window.onload  = serviceRegister();

//creating a custom withRouter function

const Navbar = ({keyupdate, history }) => {
  const [isOpen, setOpen] = useState(false);

  // localStorage.removeItem("user");
  const isAuth = !!localStorage.getItem("user");
  const username = AuthService.getCurrentUser();
  // const username = {username:"abc"};
  // alert(username.username);

  // console.log(history);
  console.log("auth is" + localStorage.getItem("user"));
  // console.log("auth is" + JSON.parse(localStorage.getItem("user")).username);



// Login and Logout functions are not properly redirecting
// and is using only windows reload capabilities, this needs tobe fixed
//****** This needs to be addressed before this is closed for Production
//****Alert

  const loginUser = () => {
    // alert(history("/login"));
    // history.navigate("/home");
    // return <Navigate to={"/login"} />
    history.history("/login");
    window.location.reload();
  };

  const logoutUser = (e) => {
    // alert("loggingout");
    // alert(e.type);
    localStorage.removeItem("user");
    // history.props.history("/learn");
    history("/login");
    // history.navigate("/login");
    window.location.reload();
    // history.push("/login");
    // return <Navigate to={"/login"} />
    // this.props.router.navigate("/login")
    // window.location.reload();
  };

  const toggleNav = (e) => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
      // alert("made responsive");
      document.getElementById("navCarpet").style.display = "flex"
    } else {
      x.className = "topnav";
      // alert("made not responsive");
      document.getElementById("navCarpet").style.display = "none"

    }
   // e.target.classList.toggle("change");
  }

  const toggleNavandUpdate = (e) => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
      document.getElementById("navCarpet").style.display = "flex"

    } else {
      x.className = "topnav";
      document.getElementById("navCarpet").style.display = "none"

    }
    keyupdate();
   // e.target.classList.toggle("change");
  }
  //
  // useEffect(()=>{
  //   serviceRegister()
  // },[1])

  // window.onLoad = serviceRegister()

  useEffect(()=>{
    var x = window.matchMedia("(max-width: 600px)");
    x.addEventListener("change",(x)=>{
      if(x.matches) {
        // alert("window changed");
        document.getElementById("myTopnav").className="topnav";
        document.getElementById("navCarpet").style.display="none";
      }
    })
  })
    return (
    <div id="navbars">
    <div id="navCarpet"
        onClick={toggleNav}
    >
    </div>
    <nav className="topnav" id="myTopnav">
    <span>
    <NavLink
      className="icon"
      onClick={toggleNav}
    >
    </NavLink>
    </span>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/home"
      onClick={toggleNav}
      // exact="true"
    >
      Home
    </NavLink>
    <NavLink
        className="navbar-item"
        activeclassname="is-active"
        to="/about"
        onClick={toggleNavandUpdate}

      >
        Dashboard
      </NavLink>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/about"
      onClick={toggleNav}
    >
      About
    </NavLink>
    {!!isAuth ?
    (<NavLink
      className="navbar-item"
      activeclassname="is-active"
      to={`${"profile/"+JSON.parse(localStorage.getItem("user")).username}`}
      onClick={toggleNav}
    >
      My Profile
    </NavLink>)
    : (<NavLink
      className="navbar-item"
      activeclassname="is-active"
      to={`${"profile/"}`}
      onClick={toggleNav}
    >
      My Profile
    </NavLink>)
    }

    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/slido"
      onClick={toggleNav}
    >
      Slido
    </NavLink>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/workbook"
      onClick={toggleNavandUpdate}
    >
      Workbook
    </NavLink>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/addtransporter"
      onClick={toggleNavandUpdate}
    >
      Add Transporter
    </NavLink>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/addstop"
      onClick={toggleNavandUpdate}
    >
      Add Stop
    </NavLink>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/addstudent"
      onClick={toggleNavandUpdate}
    >
      Add Student
    </NavLink>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/transporterview"
      onClick={toggleNavandUpdate}
    >
      Transporter Profile
    </NavLink>
    <NavLink
      id="subsId"
      className="navbar-item"
      activeclassname="is-active"
      onClick={main}
    >
      Subscribe Notification
    </NavLink>
    <NavLink
      className="navbar-item"
      activeclassname="is-active"
      to="/admin"
      onClick={toggleNav}
    >
      Admin
    </NavLink>

     {!isAuth ? (
      <NavLink
        className="navbar-item"
        activeclassname="is-active"
        onClick={loginUser}
      >
        Login
      </NavLink>
          ) : (
            <NavLink
              className="navbar-item"
              activeclassname="is-active"
              onClick={logoutUser}
            >
              Log out
            </NavLink>
          )}


   {/*<a className="icon" onClick={myFunction}>
     <i className="fa fa-bars"></i>
     <div className="mend"></div>
     <div className="mend"></div>
     <div className="mend"></div>
     XX


   </a>*/}
   <div>
   {!!isAuth ?
   (<a>Welcome {JSON.parse(localStorage.getItem("user")).username}</a>)
   :
   (<a>Not Welcome</a>)
   }
   </div>

  </nav>

  </div>
  );
};

export default withhRouter(Navbar);
