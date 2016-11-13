'use strict';

require('normalize.css/normalize.css');
require('../styles/Landing.css');
require('../styles/cat_animation.scss');

import React from 'react';
import { Button, Card, Row, Col, Icon, Input, Navbar, NavItem, Dropdown } from 'react-materialize';

import Fade from 'react-fade';
import Dropzone from 'react-dropzone';
import Scroll from 'react-scroll';
import Promise from 'bluebird';

const Link1 = require('react-router').Link;


var Link       = Scroll.Link;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scrollSpy  = Scroll.scrollSpy;

//actions
var UploadActions = require('../actions/UploadActions');
var submitPostal= require('../actions/SearchResultsActions').updatePostal //use for submiting postal code

//stores
var UploadStore = require('../stores/UploadStore');
var SearchResultsStore = require('../stores/SearchResultsStore')


const maxImageSize = 4000000;

class Intro extends React.Component {
    //needs a fancy fadein navbar. Should be have About For Shelters and on the right, log in.
    render() {

        return (
            <div>
                <Navbar left>
                  <NavItem href='about.html'>About</NavItem>
                  <NavItem href='forShelters.html'>For Shelters</NavItem>

                  <Dropdown trigger={
                    <span>Account</span>
                  }>
                  <NavItem>Pets</NavItem>
                  <NavItem>Forms</NavItem>
                  <NavItem divider />
                  <NavItem>Settings</NavItem>
                </Dropdown>

                </Navbar>

                <div className="box1">
                    <div className="intro">
                        <Row>
                            <Fade duration={this.props.titleDuration}>
                                <h1 className="title"> FelineFelicity </h1>
                            </Fade>

                            <Fade duration={this.props.subtitleDuration}>
                                <p className="subtitle"> Welcome to FelineFelicity. A platform for finding pets that are up for adoption
                                 in your area.
                                </p>
                            </Fade>
                        </Row>

                            <Fade duration={this.props.buttonDuration}>

                                <div className="nextBox-container">

                                    <Link to="image-select" smooth={true} duration={500} spy={true}>
                                        <Icon className="nextBox">arrow_downward</Icon>
                                    </Link>

                                </div>
                            </Fade>

                    </div>
                    <div className="cat"></div>
                </div>
            </div>
        );
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
                <div className="imgHolder">
                    <a onClick={this.handleImageRemove}><Icon className="removeIcon" > cancel </Icon></a>
                    {
                        React.createElement('img',
                        {
                          src: this.state.file[0].preview
                        },
                        null)
                    }
                </div>
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

                     : <Icon className="upload-arrow">cloud_upload</Icon>
                }


                </Dropzone>
            </div>
        );
    }
}

class ImageSelection extends React.Component {
    //must scroll down after successful upload or pressing a button/pressing enter after writing url

    render() {

      const center = {
          'textAlign': 'center'
      };

      const big_OR_col = {
          'paddingTop': '6%',
          'paddingLeft': '6%'

      };

      const left = {
          'paddingLeft': '5%'
      }

      return (
        <div >
          <div className="box2" style={center}>

              <Row>
                <h2 style={center}> First, we need a cat </h2>
                <p style={center}> Upload an image or copy and paste a URL, and our algorithm will <br></br> find similarly-looking cats
                    that are up for adoption.
                </p>
              </Row>

              <Row className="image-select">
                <Col className="m2 l2 s12">
                </Col>

                <Col className="m3 l3 s12" style={left}>
                    <Upload />
                </Col>

                <Col className="m2 l2 s12" style={big_OR_col}>
                    <div className="big-OR"> OR </div>

                </Col>

                <Col className="m5 l5 s12 urldrop">
                    {/* url drop */}
                    <Input  s={8} label="Image URL support coming soon!" />
                </Col>
              </Row>


              <Link to="image-submit" smooth={true} duration={500} spy={true}>
                  <div className="nextBox2-container">
                      <Icon className="nextBox2">arrow_downward</Icon>

                  </div>
              </Link>
          </div>
        </div>

      );
    }

}

class SubmitImage extends React.Component {
    constructor(){
        super();
        this.state = {
            params: {}
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
        const header = {
            'paddingTop': '4%',
            'textAlign': 'center',
            'color': 'white'
        };

        const center = {
            'textAlign': 'center',
            'color': 'white'
        };

        const center2 = {
            'textAlign': 'center'
        }




      return (
        <div className="box3" style={center2}>
            <Row >
              <h2 style={header}> Where should we look? </h2>
              <p style={center}> Enter your Postal Code then click on "Find Cats" to begin your search </p>
            </Row>

            <Row >
                <Col className="m4 l4"> </Col>

                <Col className="m4 l4">

                    <div className="zip" style={center}>
                        <Input id='zip' s={10} label="Postal Code" />

                    </div>


                        <a onClick={ () => {
                            submitPostal(
                                document.getElementById('zip').value
                            )
                        }}> <Button > Submit </Button></a>


                </Col>

                <Col className="m4 l4"> </Col>

            </Row>


            <Row>
                <Col className="m4 l4"> </Col>

                <Col className="m4 l4 ">
                    { this.state.params.postal  && <div>
                        <Link1 to={
                            {   pathname: '/search',
                                query: {
                                    breed: this.state.params.breed,
                                    size: this.state.params.size,
                                    postal: this.state.params.postal

                                }

                            }}>
                            <Fade duration={.90}>
                                <Button  waves='light'> Find Pets!</Button>
                            </Fade>
                        </Link1>

                    </div>  }
                </Col>

                <Col className="m4 l4"> </Col>

            </Row>

        </div>

      );
    }
}


class Landing extends React.Component {
    componentDidMount() {

      Events.scrollEvent.register('begin', function(to, element) {
        console.log('begin', arguments);
      });

      Events.scrollEvent.register('end', function(to, element) {
        console.log('end', arguments);
      });

      scrollSpy.update();

    }

    componentWillUnmount() {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');


    }

      render() {

        return (
          <div>
                <Intro titleDuration={1} subtitleDuration={2.5} buttonDuration={6} />
                <Element name="image-select" className="element">
                    <ImageSelection />
                </Element>


                <Element name="image-submit" className="element">
                    <SubmitImage />
                </Element>
          </div>

        );
      }
}

Landing.defaultProps = {
};

export default Landing;
