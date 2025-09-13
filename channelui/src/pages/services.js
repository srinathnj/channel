import React, {Component,useState} from "react";
import {withRouter} from "../commons/with-router.js";
import { deviceOptions,laptopOptions,mobileOptions ,compOptions} from "../commons/config.js";
import Modal from "../components/modal.js"

class ServicePage extends Component {
  constructor(props){
    super(props);
    // this.function = this.function.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.mOpen = this.mOpen.bind(this);
    this.mClose = this.mClose.bind(this);

    this.state = {
      currentUser:{username:""},
      deviceType:this.props.router.params.deviceType,
      brand:"",
      cname:"",
      phone:null,
      email:"",
      message:"",
      pincode:"",
      isMopen:false,
      deliveryOption:null,
           //other such state declarations
    }
  }

  handleChange(e){
    const {name,value} = e.target;
    // const screamingCasedValue = value.toUpperCase().replace(/\s/g, '_');
    // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1)
    this.setState({
    // ...state,
    [name]: value
    });

  };

  mOpen(){
    this.setState({isMopen:true});
  }

  mClose(){
    this.setState({isMopen:false});
  }

  componentDidMount(){
    //UserManagement logic if requried based on Auth Service package
    console.log(this.props.router.params.deviceType)
  }

  

  render(){



     return(
        
     <div className="main">
      <div className="container  mb-3">
       
       <div class="container mt-3">
  <form>
    <h2 class="text-center mb-4">Service Request Form</h2>
    <div class="row">
      <div class="col-6 col-md-6 mb-3">
        <label for="device" class="form-label">Select your Device</label>
        <select name="deviceType" class="form-control" id="device" value={this.state.deviceType} onChange={this.handleChange} >
            <option key="z" selected disabled hidden>Choose from Dropdown</option>
            
            {
                    deviceOptions.map((option)=>(
                    <option key={option.id} disabled={option.dflag} selected={(this.state.deviceType===option.id)?true:null} value={option.id}>
                {option.label}
              </option>
                    ))
            }
        </select>
      </div>
      <div class="col-6 col-md-6 mb-3">
        <label for="brand" class="form-label">Select your Brand </label>
      <select name="brand" class="form-control" id="device" value={this.state.brand} onChange={this.handleChange} >
          <option key="k" selected disabled hidden>Choose from Dropdown</option>
            {
                this.state.deviceType==="laptop"
                ?
          
                
                     laptopOptions.map((option)=>(
                    <option key={option.id} disabled={option.dflag} selected={(this.state.brand===option.id)?true:null} value={option.id}>
                {option.label}
              </option>
                    ))
                
                 :
                null
            }
            {
                this.state.deviceType==="mobile"
                ?
          
                
                     mobileOptions.map((option)=>(
                    <option key={option.id} disabled={option.dflag} selected={(this.state.brand===option.id)?true:null} value={option.id}>
                {option.label}
              </option>
                    ))
                
                 :
                null
            }
            {
                this.state.deviceType==="desktop-computer"
                ?
          
                
                     compOptions.map((option)=>(
                    <option key={option.id} disabled={option.dflag} selected={(this.state.brand===option.id)?true:null} value={option.id}>
                {option.label}
              </option>
                    ))
                
                 :
                null
            }
      </select>
      </div>

      <div class="row">
      <div class="col-md-12 mb-3">
        <label for="voice-message" class="form-label">Voice Message</label> <a type="button" class="btn btn-primary"> Voice Message</a>
        <textarea class="form-control" id="voice-message" name="message" rows="2" value={this.state.message} onChange={this.handleChange} placeholder="Let us know your issue or Leave a brief voice message summary"></textarea>
      </div>
      </div>

    <div class="row">
      <div class="col-12 col-md-4 mb-3">
        <label for="cname" class="form-label">Name</label>
        <input type="text" class="form-control" name="cname" id="cname" value={this.state.cname} onChange={this.handleChange} placeholder="Your Name" required/>
      </div>

    <div class="col-6 col-md-4 mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input type="tel" class="form-control" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Your Phone Number" required/>
      </div>
    
      <div class="col-6 col-md-4 mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="name@example.com" required/>
      </div>
     </div>

     {/* delivery section */}
     <div className="mt-5">
            <label className="form-label text-dark mb-2">
              How would you like to deliver your device?
            </label>
            <div className="d-flex align-items-center flex-wrap">
              <div className="orm-check me-4">
                <input
                  type="radio"
                  id="shop-delivery"
                  name="deliveryOption"
                  value="shop"
                  checked={this.state.deliveryOption === 'shop'}
                  onChange={this.handleChange}
                  className="form-check-input"
                />
                <label htmlFor="shop-delivery" className="ml-2 block text-sm text-gray-700">
                  I will bring device to shop
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="home-pickup"
                  name="deliveryOption"
                  value="home-pickup"
                  checked={this.state.deliveryOption === 'home-pickup'}
                  onChange={this.handleChange}
                  className="form-check-input"
                />
                <label htmlFor="home-pickup" className="form-check-label text-dark">
                  I want home pickup
                </label>
              </div>
            </div>
          </div>

          {/* Conditional content based on delivery option */}
          {this.state.deliveryOption === 'shop' && (
              <div className="mt-4 p-4 bg-info bg-opacity-10 border border-info rounded-3">
              <p className="text-info fw-bold">Shop Address:</p>
              <p className="text-dark small mt-1">
                Please bring your device to: 123 Main Street, Anytown, USA 12345
              </p>
            </div>
          )}

          {this.state.deliveryOption === 'home-pickup' && (
            <div className="mt-4 p-4 bg-success bg-opacity-10 border border-success rounded-3">
              <div className="row g-4">
                <div className="col-md-12">
                  <label htmlFor="pincode" className="form-label text-success">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="form-control"
                    placeholder="Enter pincode"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="address" className="form-label text-success">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="form-control"
                    placeholder="Enter your full address for pickup"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

{/* delivery section */}


    

     <div class="col-12 text-center">
        <button type="button" className="btn btn-primary btn-30" onClick={()=>{this.mOpen()}}>Submit Request</button>
    </div>


      </div>
      
      </form>
      </div>



    
       </div>
{/* Modal for Pickup/Drop Submit */}
            <Modal isOpen={this.state.isMopen} onClose={this.mClose}>
             <div className="container">
              <h2>Your request has been submitted, you can view the progress and track your status under <a href="/profile">Profile</a> section</h2>

             </div>
           
            </Modal>

       </div>




    );
    
  }

}

export default ServicePage = withRouter(ServicePage);
