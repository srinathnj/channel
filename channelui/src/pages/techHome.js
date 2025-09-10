import React, {Component} from "react";
import {withRouter} from "../commons/with-router.js";
import Generate_Calendar from "../commons/generateCalendar";



class Tech_Home extends Component {
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
    // console.log(this.props.router.params.orderref)
  }

  render(){

    return(
   <div>
   <Generate_Calendar/>
   </div>

    )
  }

}

export default Tech_Home = withRouter(Tech_Home);
