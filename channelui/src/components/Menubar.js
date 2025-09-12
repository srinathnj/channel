import React from "react";
import { withhRouter } from "../commons/withhRouter";

const Menubar = () => {

    return(
    <>    
        <div>
    <div className="d-block d-sm-none fixed-bottom py-0">
    <ul className="d-flex justify-content-between blureffect mb-0 border px-2 shadow">

      <a type="button" className="btn btn-primary hover-btn-green" href="/home">Home</a>
      <a type="button" className="btn btn-primary hover-btn-green" href="/service">Book Service</a>
      <a type="button" className="btn btn-primary hover-btn-green" href="/profile">Profile</a>
      <a type="button" className="btn btn-primary hover-btn-green" href="/contact">Contact</a>
    </ul>
        </div>

    </div>        
    
   <nav class="d-none d-sm-block navbar navbar-expand navbar-light bg-light">
  <div class="container-fluid d-flex justify-content-end">
    {/* <a class="navbar-brand" href="#">MyBrand</a> */}
    {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> */}
    {/* <div class="collapse navbar-collapse justify-content-end" id="navbarNav"> */}
    <div id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/services/">Book Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile/">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contact/">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

   


</>

)
}

export default withhRouter(Menubar);

// export default withhRouter(HeaderItem);
