'use strict';

require('normalize.css/normalize.css');
require('styles/Landing.css');
require('styles/cat_animation.scss');

import React from 'react';
import { Button, Card, Row, Col, Icon, Input } from 'react-materialize';
//import Delay from 'react-delay';
import Fade from 'react-fade';
import Dropzone from 'react-dropzone';

class Intro extends React.Component {

    render() {

        return (
            <div className="box1">
                <div className="intro">

                        <Fade duration={this.props.titleDuration}>
                            <h1 className="title"> FelineFelicity </h1>
                        </Fade>

                        <Fade duration={this.props.subtitleDuration}>
                            <p className="subtitle"> A modern way for finding your next furry companion </p>
                        </Fade>



                        <Fade duration={this.props.buttonDuration}>

                            <div className="nextBox-container">
                                <Icon className="nextBox">arrow_downward</Icon>

                            </div>
                        </Fade>
                        <div className="cat"></div>

                        {/*} <Fade duration={this.props.catDuration}>

                        </Fade> */}

                </div>
            </div>
        );
    }
}

class Upload extends React.Component {
    constructor() {
        super();
        this.state = {file: []};
    }

    render() {
        return (
            <div>

                <Dropzone className="uploadBox" onDrop={
                        (acceptedFile) => {
                            console.log(acceptedFile)
                            this.setState({
                                file: acceptedFile
                            });
                            //do thumbnail stuff
                            //then upload to api
                        }
                    }>

                    <Icon className="upload-arrow" >cloud_upload</Icon>

                    { /*{this.state.file.length > 0 ? <div>

                        <div className="thumbnail">
                            {
                                this.state.file.map((file) =>
                                    <img src={file.preview} />)
                            }
                        </div>

                        </div> : null} */}

                </Dropzone>
            </div>
        );
    }
}

class ImageSelection extends React.Component {
    //must scroll down after successful upload or pressing a button/pressing enter after writing url
    render() {

      const header = {
          'paddingTop': '4%',
          'textAlign': 'center'
      };

      const center = {
          'textAlign': 'center'
      };

      const big_OR_col = {
          'paddingTop': '6%',
          'paddingLeft': '5%'

      };

      return (
        <div >

          <Row >
            <h2 style={header}> First, we need a cat </h2>
            <p style={center}> Upload an image or copy and paste a URL </p>
          </Row>
          <div className="box2">
              <Row >
                <Col className="m2 l2">
                </Col>

                <Col className="m3 l3">
                    <Upload />
                </Col>

                <Col className="m2 l2" style={big_OR_col}>
                    <div className="big-OR"> OR </div>

                    <div className="nextBox2-container">
                        <Icon className="nextBox2">arrow_downward</Icon>

                    </div>
                </Col>

                <Col className="m5 l5 urldrop">
                    {/* url drop */}
                    <Input  s={8} label="Image URL" />
                </Col>

              </Row>

          </div>
        </div>

      );
    }

}

class SubmitImage extends React.Component {
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


      return (
        <div className="box3">
            <Row >
              <h2 style={header}> Where should we look? </h2>
              <p style={center}> Enter your Postal Code then click on "Find Cats" to begin your search </p>
            </Row>

            <Row >
                <Col className="m4 l4"> </Col>

                <Col className="m4 l4 ">
                    <div className="zip">
                        <Input  s={10} label="Postal Code" />
                    </div>
                </Col>

                <Col className="m4 l4"> </Col>

            </Row>

            <Row >
                <Col className="m4 l4"> </Col>

                <Col className="m4 l4 ">
                    <div>
                        <Button waves='light'>Find Cats</Button>
                    </div>
                </Col>

                <Col className="m4 l4"> </Col>

            </Row>

        </div>

      );
    }
}


class Landing extends React.Component {
  render() {

    return (
      <div>
        <Intro titleDuration={1} subtitleDuration={2.5} buttonDuration={6} />
        <ImageSelection />
        <SubmitImage />
      </div>

    );
  }
}

Landing.defaultProps = {
};

export default Landing;
