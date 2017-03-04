'use strict';


/*
This is the landing page of the website. It is for the user to upload a cat image and return results. 
In the future, this will include an "About" page, "For Shelters" page, and probably a login button */

require('normalize.css/normalize.css');
require('../styles/Landing.css');
require('../styles/cat_animation.scss');

import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Button, Card, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';


import Fade from 'react-fade';
import Dropzone from 'react-dropzone';
import Promise from 'bluebird';

/* Link is used for navigating the website */

const Link = require('react-router').Link;


//actions 
var UploadActions = require('../actions/UploadActions');

/*

Available actions:

uploadImage(image): uploads an image to API. Returns with the file meta data, isCat, breed, and size to all dropzones

*/

//stores 
var UploadStore = require('../stores/UploadStore');

/* 

Available Data:
- file meta data
- canUpload
- isCat
- params {breed, size}

*/

class Intro extends React.Component {
    /* intro renders the logo and a little blurb about the service...probably something really small
    like a tagline or something */
    
    render() {

      return (

        <div>
          <Row>
            <Col m={2} l={2}/>
            <Col className="logo" m={3} l={3}>
            </Col>
            <Col className="blurb" m={5} l={5}>
              Tinder for Cats!
            </Col>
            <Col m={2} l={2}/>
          </Row>
        </div>

      );
                
    }
}


class Upload extends React.Component {

    /* Upload componenent generates the dropzone, and anything related to image upload for this page */
    

    constructor() {
      super();
      this.state = {
          file: null,
          isCat: null,
          canUpload: true
      };
      this.onChange = this.onChange.bind(this)
      //this.createPreview = this.createPreview.bind(this)
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
            if(this.state.file && !this.state.isCat) {
                console.log("not a cat")
                Materialize.toast("This does not look like a cat!", 2000)
                this.handleImageRemove();
            }
         }
    }

    onChange(state) {
      this.setState({
                      file: state.file,
                      isCat: state.isCat,
                      canUpload: state.canUpload
                    });
      console.log('upload componenent updated');
    }

    handleImageRemove(){
        UploadActions.updateDropzone({
                        file: null,
                        isCat: null,
                        params: null,
                      }, true);
      }


    /*createPreview(){

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
    } */


    render() {

        return (
            <div>
              <Row>
                <Col m={2} l={2}/>
                <Col m={8} l={8}>

                  <div >
                    <Dropzone className="uploadBox" maxSize={4000000} multiple={false}  onDrop= {
                        (acceptedFile) => {
                            UploadActions.uploadImage(acceptedFile)
                            
                            //A flux action that sends the image to the api, and triggers the upload componenent to render the preview
                        }
                   }>
                    <Icon className="uploadArrow">cloud_upload</Icon>
                   </Dropzone>
                    
                    {/*
                        this.state.file ?

                            this.createPreview()

                         : <Icon className="uploadArrow">cloud_upload</Icon>
                    */}

                    
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

        file: null,


        params:{ 
          breed:null,
          size:null
        },

        postal:"",
         

      }

      this.onChange = this.onChange.bind(this)

      this.closeModal = this.closeModal.bind(this);
      this.updatePostal = this.updatePostal.bind(this);
    }

    componentDidMount() {
      UploadStore.listen(this.onChange);
    }

    componentWillUnmount() {
      UploadStore.unlisten(this.onChange);
    }

    onChange(state){

        this.setState({
            params: state.params,
            file: state.file,
        });

        console.log('modal updated')


    }


    componentDidUpdate(){
      if(this.state.file) $("#modalButton").click()
     
        

      //TODO: Avoid doing this, need to find the actual method to call within library
      // Will probably have to edit source code
     
    }


    closeModal(){
      console.log("called")

      UploadActions.updateDropzone({
                        file: null,
                        isCat: null,
                        params: null
                      }, true);

    }

    updatePostal(e){
      this.setState({postal: e.target.value});
                  
    }

    


    render() {

      const modalButton = {
        display:'none'
      }
       
      
      return (
        <div>
          <Modal 
            ref="myModal"
            header="Submit Image"
            trigger= {
              <button id="modalButton" style={modalButton}></button>
            }
            actions = {[
              <Button waves='light' modal='close' flat onClick={this.closeModal}>Close</Button>
            ]}
            

          >
          
            {
              this.state.file ? 

              <div>

                <Row>
                  <Col m={4} l={4}/>
                  <Col m={4} l={4}>

                    <div className="previewImage">
                      <img src={this.state.file[0].preview}/>
                    </div>
                  
                  </Col>
                  <Col m={4} l={4}/>
                
      
                </Row>

                
                <Input placeholder="Postal Code" label="Postal Code" onChange={this.updatePostal}/>

                <div>
                  {/* This div renders the button*/}
                  
                    <Link to= {
                                {  
                                  pathname: '/search',
                                  query: {
                                    breed: this.state.params.breed,
                                    size: this.state.params.size,
                                    postal: this.state.postal
                                  }

                                }
                             }> 
                        <Button disabled={this.state.postal.length < 5}> Find Cats! </Button>
                      </Link>
                   
                    
                  
                
                </div>

              </div> : null

            }
  
          </Modal>

              
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

            <Navbar brand='HappyCat' right>
              <NavItem href='forShelters.html'>For Shelters</NavItem>
            </Navbar>

            <Dropzone className="landingDropzone" maxSize={4000000} multiple={false} disableClick={true} onDrop= {
                        (acceptedFile) => {
                            UploadActions.uploadImage(acceptedFile)
                            
                            //A flux action that sends the image to the api, and triggers the upload componenent to render the preview
                        }
            }>

              <div className="landingContainer">
                <Intro />
                <Upload />
                <SubmitModal />

              </div>

            </Dropzone>

                
          </div>

        );
      }
}

Landing.defaultProps = {
};

export default Landing;
