'use strict';


/*
This is the landing page of the website. It is for the user to upload a cat image and return results. 
In the future, this will include an "About" page, "For Shelters" page, and probably a login button */

require('normalize.css/normalize.css');
require('../styles/Landing.css');
require('../styles/cat_animation.scss');

import React from 'react';
import { Button, Card, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';

import Fade from 'react-fade';
import Dropzone from 'react-dropzone';
import Promise from 'bluebird';

/* Link is used for navigating the website */

const Link = require('react-router').Link;


//actions (Flux)
var UploadActions = require('../actions/UploadActions');

//stores (Flux)
var UploadStore = require('../stores/UploadStore');

class Intro extends React.Component {
    /* intro renders the logo and a little blurb about the service...probably something really small
    like a tagline or something */
    
    render() {

      return (

        <div>
          <Row>
            <Col m={2} l={2}/>
            <Col className="logo" m={2} l={2}>
            </Col>
            <Col className="blurb" m={6} l={6}>
            </Col>
            <Col m={2} l={2}/>
          </Row>
        </div>

      );
                
    }
}


class Upload extends React.Component {
    //TODO: Need to think of way to trigger this componenet. Maybe with a flux thing would handle that

    /* Upload componenent generates the dropzone, and anything related to image upload for this page */
    const maxImageSize = 4000000;

    constructor() {
      super();
      this.state = {
          file: {},
          isCat: null,
          canUpload: true
      };
      this.onChange = this.onChange.bind(this)
      this.createPreview = this.createPreview.bind(this)
      this.handleImageRemove = this.handleImageRemove.bind(this)

    }

    componentDidMount() {
      UploadStore.listen(this.onChange);
    }

    componentWillUnmount() {
      UploadStore.unlisten(this.onChange);
    }


     componentDidUpdate(){
         if(!this.state.canUpload) {
             $(".uploadBox input").prop("disabled", true)
             $(".uploadBox").css("cursor", "default")

         } else {
             $(".uploadBox input").prop("disabled", false)
             $(".uploadBox").css("cursor", "pointer")
         }

         if(this.state.isCat !== null){
            if(this.state.file[0] && !this.state.isCat) {
                console.log("not a cat")
                Materialize.toast("This does not look like a cat!", 2000)
                this.handleImageRemove();
            }
         }
    }

    onChange(state) {
      this.setState({
                      file: state.file
                      isCat: state.isCat,
                      canUpload: state.canUpload
                    });
    }

    handleImageRemove(){
        UploadActions.updateDropzone({
                        file: {},
                        isCat: null,
                        canUpload: true.
                        params: {}
                      });
      }


    createPreview(){

        return(
           
          <div className="thumbnail">
            <a onClick={this.handleImageRemove}><Icon className="removeIcon" > cancel </Icon></a>
              {
                React.createElement('img',
                  {
                    src: this.state.file[0].preview
                  },
                null)
              }
          </div>
           

        )
    }


    render() {

        return (
            <div>
              <Row>
                <Col m={2} l={2}/>
                <Col m={8} l={8}>

                  <div className="uploadBox">
                    {
                        this.state.file[0] ?

                            this.createPreview()

                         : <Icon className="uploadArrow">cloud_upload</Icon>
                    }
                  </div>

                </Col>
                <Col m={2} l={2}/>

              </Row>
            </div>
        );
    }
}

class catGallery extends React.Component {
  /* renders gallery that holds a few sample cat pictures */

  render() {
    return(
      <div>
        <Row>
          <Col m={2} l={l}/>
          <Col className="gallery" m={8} l={8}>
            {/* materialize image gallery or something */}

          </Col>
          <Col m={2} l={l}/>
        </Row>
      </div>

    );
  }

}

class SubmitModal extends React.Component {

    /* this will have to be a modal. where the user writes in the zipcode and commences search */
    /* Zipcode does not have to use flux, let's come back to this */
    //TODO: How to make a modal

    constructor(){
        super();
        this.state = {
          params:{
            breed:null,
            size:null,
            postal:null
          }

        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
      UploadStore.listen(this.onChange);
    }

    componentWillUnmount() {
      UploadStore.unlisten(this.onChange);
    }

    onChange(state){

        this.setState({
            params: state.params
        });


    }

    render() {
       

      //TODO: get postal by looking at the input length
      

      return (
        <div>
    
          <div> 
            <Button> Find Cats! </Button>
            <Link to= {
                        {  
                          pathname: '/search'
                          query: {
                            breed: this.state.params.breed,
                            size: this.state.params.size,
                            postal: this.state.params.postal
                          }

                        }
                     }>   
            </Link>
          </div>
              
        </div>

      );
    }
}

class Testimonials extends React.Component {
  /* and idea from the design meeting. basically have some funny testimonials at the bottom of the page 
  probably a few cutsy divs and such
  */

}

class Landing extends React.Component {
    /* master componenet, basically. Will also render navbar on the top */
    componentDidMount() {

    }

    componentWillUnmount() {


    }

      render() {

        return (
          <div>

            <Navbar left>
              <NavItem href='forShelters.html'>For Shelters</NavItem>*/
            </Navbar>

            <Dropzone maxSize={4000000} multiple={false} onDrop= {
                        (acceptedFile) => {
                            UploadActions.uploadImage(acceptedFile)
                            //A flux action that triggers the upload componenent to render the preview
                        }
            }>

              <div className="landingContainer">
                <Intro />

              </div>

            </Dropzone>

                
          </div>

        );
      }
}

Landing.defaultProps = {
};

export default Landing;
