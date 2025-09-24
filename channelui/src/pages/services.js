import React, {Component} from "react";
import {withRouter} from "../commons/with-router.js";
import { deviceOptions,laptopOptions,mobileOptions ,compOptions} from "../commons/config.js";
import Modal from "../components/modal.js";
import userService from "../services/user.service.js";

class ServicePage extends Component {
  constructor(props){
    super(props);
    // this.function = this.function.bind(this)
    this.submitButtonRef = React.createRef()
    this.formRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.mOpen = this.mOpen.bind(this);
    this.mClose = this.mClose.bind(this);
    this.initialValues = {};
    this.srId = props.srId;
    

    this.state = {
      srId:this.props.router.params.srId,
      currentUser:{username:""},
      deviceType:this.props.router.params.deviceType,
      brand:"",
      cname:"",
      phone:"",
      email:"",
      message:"",
      pincode:"",
      address:"",
      isMopen:false,
      inward:null,
      outward:null,
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
    },()=>{
    if(name==='deviceType') this.setState({brand:""})
    if(name==='inward' && this.submitButtonRef.current) {
          this.submitButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }
  )};

 handleSubmit = (event) => {
    event.preventDefault();

    const formElements = this.formRef.current.elements;
    const changes = {};

    for (const element of formElements) {
      if (element.name && element.type !== 'button') {
        let initialValue = this.initialValues[element.name];
        let currentValue;

        // Checkbox and select handling
        if (element.type === 'checkbox') {
          currentValue = element.checked;
        } else if (element.tagName === 'SELECT') {
          currentValue = element.value;
        } else {
          currentValue = element.value;
        }

        // If the value has changed, add it to the 'changes' object
        if (initialValue !== currentValue) {
          changes[element.name] = currentValue;
        }
      }
    }

    console.log(formElements);
    console.log(changes);

    alert("testpoint")

    let payload = {}

    if(this.props.updflag=="1"  && this.state.srId){
      // alert("in update")
      payload = {
        srId: this.state.srId,
        changes: changes
      };

      try{
        userService.updateService({srId:this.state.srId,changes:changes}).then
        (res => {
            this.mOpen();
           }
        , error => {
        const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                console.log("error message:",resMessage);

              this.setState({
                loading: false,
                message: resMessage
                   });


    })
      } catch(err) {
        throw err;
      } 

    } else {
      payload = changes;
         try{
        userService.addService({changes:changes}).then
        (
          res=>{
            this.mOpen();
          }
        , error => {
        const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                console.log("error message:",resMessage);

              this.setState({
                loading: false,
                message: resMessage
                   });


    })
      } catch(err) {
        throw err;
      } 

    }

    // Construct the final payload

    console.log('Sending payload:', payload);

    

    
    // Send the payload to your backend
    // fetch('your_php_backend_url.php', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
  };

  mOpen(){
    this.setState({isMopen:true});
  }

  mClose(){
    this.setState({isMopen:false});
  }

  componentDidMount(){
    //UserManagement logic if requried based on Auth Service package

    if(this.props.updflag == "1" && this.props.router.params.srId) {

      try{
      // alert("now trying")
      userService.getCustServicesRec({srId:this.props.router.params.srId}).then
      (res => {
        // console.log(res);
        // console.log(res.data.data[0])
       this.setState({srId:res.data.data[0].srId});
       this.setState({deviceType:res.data.data[0].deviceType});
       this.setState({brand:res.data.data[0].brand});
       this.setState({cname:res.data.data[0].cname});
       this.setState({phone:res.data.data[0].phone});
       this.setState({email:res.data.data[0].email});
       this.setState({message:res.data.data[0].message});
       this.setState({pincode:res.data.data[0].pincode});
       this.setState({address:res.data.data[0].address});
       this.setState({inward:res.data.data[0].inward});
       this.setState({outward:res.data.data[0].outward});


      }, error => {
        const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                console.log("error message:",resMessage);

              this.setState({
                loading: false,
                message: resMessage
                   });


    })
    } catch (err) {
      // alert(err);
      throw err;
    }
     



    }


    if(this.formRef.current){
      const inputs = this.formRef.current.elements;
      for (const input of inputs){
        if(input.name  && input.type != "button"){
          if(input.type == "checkbok"){
            this.initialValues[input.name] = input.checked;
            } else {
              this.initialValues[input.name] = input.value;
            }
        }
      }
    }
   
  }

  


  

  render(){



     return(
        
     <div className="main">
      <div className="container  mb-3">
       
       <div class="container mt-3">
  <form ref={this.formRef} onSubmit={this.handleSubmit}>
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
                    <option key={option.id} disabled={option.dflag} hidden={option.hflag} selected={(this.state.brand===option.id)?true:null} value={option.id}>
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
        <label for="voice-message" class="form-label">Voice Message</label> <div type="button" class="btn btn-primary"> Voice Message</div>
        <textarea class="form-control" id="voice-message" name="message" rows="2" value={this.state.message} onChange={this.handleChange} placeholder="Let us know your issue or Leave a brief voice message summary"></textarea>
      </div>
      </div>

    <div class="row">
      <div class="col-12 col-md-4 mb-3">
        <label for="cname" class="form-label">Name</label>
        <input type="text" class="form-control" name="cname" id="cname" value={this.state.cname} onChange={this.handleChange} placeholder="Your Name" required/>
      </div>

    <div class="col-12 col-md-4 mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input type="tel" class="form-control" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Your Phone Number" required/>
      </div>
    
      <div class="col-12 col-md-4 mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="name@example.com" required/>
      </div>
     </div>

     {/* delivery section */}
     <div className="mt-2 bg-warning">
            <label className="form-label text-dark mb-2">
              How would you like to deliver your device?
            </label>
            <div className="d-flex align-items-center flex-wrap">
              <div className="form-check me-4">
                <input
                  type="radio"
                  id="shop-delivery"
                  name="inward"
                  value="shop"
                  checked={this.state.inward === 'shop'}
                  onChange={this.handleChange}
                  className="form-check-input"
                 />
                <label htmlFor="shop-delivery" className="form-check-label text-dark">
                  I will bring device to shop
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="home-pickup"
                  name="inward"
                  value="home-pickup"
                  checked={this.state.inward === 'home-pickup'}
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
          {this.state.inward === 'shop' && (
              <div className="mt-4 p-4 bg-info bg-opacity-10 border border-info rounded-3">
              <p className="text-info fw-bold">Shop Address:</p>
              <div className="text-dark small mt-1">
                Please bring your device to: 
                <div className="text-info-dark fw-bold">
                17 Natesan Street, Old Pallavaram, Chennai - 600 117
                </div>
              </div>
            </div>
          )}

          {this.state.inward === 'home-pickup' && (
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

   

     <div id="submitRequest" class="col-12 text-center mt-2">
        <button ref={this.submitButtonRef}  type="submit" className="btn btn-primary minh50">Submit Request</button>
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
