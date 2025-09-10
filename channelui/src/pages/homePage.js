import React, {Component} from "react";
import HeaderItem from "../components/Header.js";
import Menubar from "../components/Menubar.js";
import {withRouter} from "../commons/with-router.js";


class Home_Page extends Component {
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
   <div>
      <p>I'm a simple home page</p>   
   </div>
   <Menubar/>
   <p>
     If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.

While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs.
Creative Writing

Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing. 
   </p>
   </div>


    )
  }

}

export default Home_Page = withRouter(Home_Page);
