import React from "react";
import  withhRouter  from "../commons/withhRouter";

const HeaderItem = () => {

    return(
    <>
    
    <div className="bg-red-800 max-h-100 fixed-top">
        <h3 className="text-center text-md-start">Tech Summit Academy</h3>
        <ul className="d-flex line-ht-1 list-unstyled justify-content-between text-center px-5 py-1 py-sm-1">

            <li> <a href="https://wa.me/+919444441954" target="_blank" aria-label="WhatsApp">
        <i class="text-success fw-bold bi bi-whatsapp"></i> <span className="text-white"> +91 94444 41954</span></a>
        </li>
        <li><a href="https://twitter.com/@srinathnj" target="_blank" aria-label="Twitter">
        <i class="bi bi-twitter-x"></i><span className="text-white d-none d-lg-inline">@channelname</span>
    </a></li>
            <li> <a href="mailto:something@something.com" target="_blank" aria-label="email">
        <i class="fw-bold bi bi-envelope"></i> <span className="text-white d-none d-lg-inline"> something@something.com</span></a>
        </li>
            <li><a href="https://www.facebook.com/groups/srinathnj/" target="_blank" aria-label="Facebook">
        <i class="bi bi-facebook"></i><span className="text-white d-none d-lg-inline">classname</span></a></li>
            <li><a href="https://www.youtube.com/" target="_blank" aria-label="YouTube">
        <i class="bi bi-youtube"></i><span className="text-white d-none d-lg-inline">@channelname</span>
    </a></li>
            <li className="text-white d-none d-xl-inline">17 Natesan Street, Chennai - 600 117 </li>
        </ul>
        <div className="text-white d-block line-ht-1 text-center d-xl-none py-0">17 Natesan Street, Chennai - 600 117 </div>
    </div>
    
    </>

    

)
}

export default HeaderItem;

// export default withhRouter(HeaderItem);
