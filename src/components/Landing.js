'use strict';

require('normalize.css/normalize.css');
require('../styles/Landing.css');
require('../styles/cat_animation.scss');

import React from 'react';
import { Button, Card, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';

import Fade from 'react-fade';
import Dropzone from 'react-dropzone';
import Promise from 'bluebird';

const Link = require('react-router').Link;


//actions
var UploadActions = require('../actions/UploadActions');
//var submitPostal= require('../actions/SearchResultsActions').updatePostal //use for submiting postal code

//stores
var UploadStore = require('../stores/UploadStore');
var SearchResultsStore = require('../stores/SearchResultsStore')


const maxImageSize = 4000000;

class Intro extends React.Component {
    //needs a fancy fadein navbar. Should be have About For Shelters and on the right, log in.
    render() {

      return ();
            
        
    }
}


class Upload extends React.Component {
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
      this.setState({isCat: state.isCat});


    }

    handleImageRemove(){
        this.setState(
        {
            file: {},
            isCat: null,
            canUpload: true

        })
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

                <Dropzone className="uploadBox" maxSize={4000000} multiple={false} onDrop= {
                        (acceptedFile) => {

                            this.setState(
                            {
                                file: acceptedFile,
                                canUpload: false

                            });

                            UploadActions.uploadImage(acceptedFile)
                        }
                    }>

                {
                    this.state.file[0] ?

                        this.createPreview()

                     : <Icon className="uploadArrow">cloud_upload</Icon>
                }


                </Dropzone>
            </div>
        );
    }
}



class SubmitImage extends React.Component {
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
      SearchResultsStore.listen(this.onChange);
    }

    componentWillUnmount() {
      SearchResultsStore.unlisten(this.onChange);
    }

    onChange(state){

        this.setState({
            params: state.params
        });


    }

    render() {
       

      //TODO: get postal by looking at the input length
      //TODO: Have input boxes be filled by image upload

      return (
        <div>
          <label>
    Name:
    <input type="text" name="name" />
  </label>
  
          <a  <Button > Find Cats! </Button></a>
                      
          <Link to={
            {  pathname: '/search'
              query: {
                  breed: this.state.params.breed,
                  size: this.state.params.size,
                  postal: this.state.params.postal
              }

            }}>   
          </Link>
              
        </div>

      );
    }
}


class Landing extends React.Component {
    componentDidMount() {

    }

    componentWillUnmount() {


    }

      render() {

        return (
          <div>
                
          </div>

        );
      }
}

Landing.defaultProps = {
};

export default Landing;
