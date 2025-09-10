import React from "react";
import { withhRouter } from "../commons/withhRouter";

const Menubar = () => {

    return(
        
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

)
}

export default Menubar;

// export default withhRouter(HeaderItem);
