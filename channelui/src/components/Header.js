import React from "react";
import { useNavigate } from 'react-router';
import Menubar from "./Menubar";



// import  withhRouter  from "../commons/withhRouter";


export const withhRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    }
    return Wrapper;
};

const HeaderItem = ({history}) => {

    return(
    <>
    <div classname="fixed-top">
    <div className="bg-red-800 fw-bold max-h-100">
        <div type="button" onClick={()=>{history("/")}} ><h3  className="text-center text-md-start" >Tech Summit Academy</h3></div>
        <ul className="d-flex line-ht-1 list-unstyled justify-content-between text-center px-5 py-1 py-sm-1">

            <li> <a href="https://wa.me/+919444441954" target="_blank" aria-label="WhatsApp">
        <i class="text-success fw-bold fa fa-whatsapp"></i> <span className="text-white"> +91 94444 41954</span></a>
        </li>
        <li><a href="https://twitter.com/@srinathnj" target="_blank" aria-label="Twitter">
        <i class="fa fa-twitter-x"></i><span className="text-white d-none d-lg-inline">@channelname</span>
    </a></li>
            <li> <a href="mailto:something@something.com" target="_blank" aria-label="email">
        <i class="fw-bold fa fa-envelope"></i> <span className="text-white d-none d-lg-inline"> something@something.com</span></a>
        </li>
            <li><a href="https://www.facebook.com/groups/srinathnj/" target="_blank" aria-label="Facebook">
        <i class="fa fa-facebook"></i><span className="text-white d-none d-lg-inline">classname</span></a></li>
            <li><a href="https://www.youtube.com/" target="_blank" aria-label="YouTube">
        <i class="fa fa-youtube"></i><span className="text-white d-none d-lg-inline">@channelname</span>
    </a></li>
            <li className="text-white d-none d-xl-inline">17 Natesan Street, Chennai - 600 117 </li>
        </ul>
        <div className="text-white d-block line-ht-1 text-center d-xl-none py-0">17 Natesan Street, Chennai - 600 117 </div>
    </div>
    
  
    </div>

    <Menubar/>
    </>

    

)
}

// export default HeaderItem;

export default  withhRouter(HeaderItem);
