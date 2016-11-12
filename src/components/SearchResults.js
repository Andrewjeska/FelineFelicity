'use strict';

import { Card, Pagination, Navbar, NavItem, Row, Col, Icon } from 'react-materialize';
import React from 'react';

var UploadStore = require('../stores/UploadStore');


class PetCard extends React.Component {
    /*
    cards need to keep to a rectangle. they should resize freely except at
    the bottom
    */

    render() {
        return (
            <Card header={<CardTitle reveal image={this.props.image} waves='light'/>}
                title={this.props.name}
                reveal={<p>{this.props.description}</p>}
                actions={[<a href={this.props.adoption_link}>Adopt</a>]}>
                <p>{this.props.city}, {this.props.state}</p>

            </Card>
        );
    }

}

/* holds the cards for the pets */
class ResultsContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            pet_meta: [],
            page_number: 0
        };

        this.renderPetCard = this.renderPetCard.bind(this)

    }

    renderPetCard(page, start){
        for(var i = page + start; i < (page + 12); i += 3){
            //12 results per page
            <PetCard name={this.state.pet_meta[i].name}
                     description={this.state.pet_meta[i].photos[0]}
                     adoption_link={this.state.pet_meta[i].adopt_link}
                     city={this.state.pet_meta[i].city}
                     state={this.state.pet_meta[i].state}>
            </PetCard>
        }
    }

    render() {
        return(
            <div>
                <Row>
                    <Col className="m4 s12">
                        {
                            this.renderPetCard(this.state.page_number, 0)
                        }
                    </Col>

                    <Col className="m4 s12">
                        {
                            this.renderPetCard(this.state.page_number, 1)
                        }
                    </Col>

                    <Col className="m4 s12">
                        {
                            this.renderPetCard(this.state.page_number, 2)
                        }
                    </Col>
                </Row>

            </div>);
    }
}


class AdvancedOptions extends React.Component {
    /* changes search results, will requery our lamdba function */
    /* initial state comes from the params from get detections */
}

class ResultsPage extends React.Component {
    /* our state should be the pets in our json */
    /* possibly the search params from get detections */

    /* props: our search Params */

    /* small navbar */

    render() {
        return(
            <div>
                <Navbar brand='FelineFelicity' right>
                    {/* need to drop down some menus here */}
                    <NavItem><Icon>search</Icon></NavItem>

                </Navbar>
            </div>


        );
    }

}

ResultsPage.defaultProps = {
};

export default ResultsPage;
