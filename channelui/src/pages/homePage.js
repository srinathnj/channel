import React, {Component} from "react";
import {withRouter} from "../commons/with-router.js";


class HomePage extends Component {
  constructor(props){
    super(props);
    // this.function = this.function.bind(this)

    this.state = {
      currentUser:{username:""},
      //other such state declarations
    }
  }


  componentDidMount(){
    //UserManagement logic if requried based on Auth Service package
    console.log(this.props.router.params.orderref)
  }

  render(){

    return(
      <div className="main">
      <div className="container border  mb-3">
     <div class="container py-1">
    <h3 class="fw-bold text-center mb-2">Follow the 4 Simple steps to fix your device</h3>
    
    <div class="row g-1 g-sm-4 justify-content-center align-items-stretch">
        <div class="col-6 col-sm-6 col-lg-3">
            <div class="card shadow-sm border-primary step-card text-center h-100">
                <div class="card-body">
                    <p class="service-steps mb-0">
                        <span class="service-number text-primary fw-bold">1</span> Choose Mobile, Computer or Laptop
                    </p>
                </div>
            </div>
        </div>

        <div class="col-6 col-sm-6 col-lg-3">
            <div class="card shadow-sm border-success step-card text-center h-100">
                <div class="card-body">
                    <p class="service-steps mb-0">
                        <span class="service-number text-success fw-bold">2</span> Let us know how we can reach you
                    </p>
                </div>
            </div>
        </div>

        <div class="col-6 col-sm-6 col-lg-3">
            <div class="card shadow-sm border-info step-card text-center h-100">
                <div class="card-body">
                    <p class="service-steps mb-0">
                        <span class="service-number text-info fw-bold">3</span> Write or Voice Message your issue
                    </p>
                </div>
            </div>
        </div>

        <div class="col-6 col-sm-6 col-lg-3">
            <div class="card shadow-sm border-warning step-card text-center h-100">
                <div class="card-body">
                    <p class="service-steps mb-0">
                        <span class="service-number text-warning fw-bold">4</span> Select a drop-in Center or Request for a pick up
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
      <div class="row mt-3">
        <div class="col-12 text-center">
            <p class="fs-4 d-none d-sm-inline text-success fw-bold">
                That's it! We will get in touch with you to make your device work like brand new again!!
            </p>
            <p class="fs-5 d-none d-sm-inline text-secondary">
                Sit back, relax, watch through the live updates of the repair! Any questions, we are just a message away!
            </p>
             <p class="fs-5  d-sm-none text-success fw-bold">
                That's it! We will get in touch with you to make your device work like brand new again!!
            </p>
            <p class="fs-8  d-sm-none text-secondary">
                Sit back, relax, watch through the live updates of the repair! Any questions, we are just a message away!
            </p>
        </div>
    </div>

      </div>

                       <div className="mb-5"> <span class="service-number text-primary fw-bold">Step 1</span> Choose your device
                       </div>
     <div class="row g-1 g-sm-4 mt-sm-5 mx-2 justify-content-center align-items-stretch">
        <div class="col-6 col-sm-6 col-lg-2 mb-2">
            <div class="card shadow-sm border-primary card-card text-center h-100 object-fit " onClick={()=>{this.props.router.navigate("/services/laptop")}}>
                    <img type="button" src="media/laptop_pc.jpeg"  className="w-full h-full object-contain" alt="Select this to repair your mobile" />
                   <div type="btn" class="btn btn-danger align-self-center bottom-center fw-bold fs-8">Laptops</div>
            </div>
        </div>

        <div class="col-6 col-sm-6 col-lg-2 mb-2">
            <div class="card shadow-sm border-primary device-card text-center h-100 object-fit" onClick={()=>{this.props.router.navigate("/services/mobile")}}>
                   <img type="button" src="media/mobile.png"  className="w-full h-full object-contain" alt="Select this to repair your computer"/>
                   <div type="btn" class="btn btn-danger align-self-center bottom-center fw-bold fs-8">Mobiles</div>
            </div>
        </div>

        <div class="col-6 col-sm-6 col-lg-2 mb-2">
            <div class="card shadow-sm border-primary card-card text-center h-100 object-fit " onClick={()=>{this.props.router.navigate("/services/desktop-computer")}}>
                    <img type="button" src="media/laptop_pc.jpeg"  className="w-full h-full object-contain" alt="Select this to repair your mobile" />
                   <div type="btn" class="btn btn-danger align-self-center bottom-center fw-bold fs-8">Desktop Computers</div>
            </div>
        </div>


     </div>



     
   



   </div>


    )
  }

}

export default HomePage = withRouter(HomePage);
