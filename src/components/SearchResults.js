'use strict';

import { Card, CardTitle, Pagination, Navbar, NavItem, Row, Col, Icon, Button } from 'react-materialize';
import React from 'react';

//actions
var SearchResultsActions = require('../actions/SearchResultsActions')

//stores
var SearchResultsStore = require('../stores/SearchResultsStore')


class PetCard extends React.Component {
    /*
    cards need to keep to a rectangle. they should resize freely except at
    the bottom
    */

    render() {
        return (
            <Card
                header={<CardTitle reveal image={this.props.image} waves='light'/>}
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
    constructor(props){
        super(props);
        this.state = {
            pet_meta: [],
            params: this.props.params,
            page_number: 0
        };

        if(this.props.params.breed)
            SearchResultsActions.searchForPets(this.state.params);

        this.renderPetCard = this.renderPetCard.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    componentDidMount() {
      SearchResultsStore.listen(this.onChange);
    }

    componentWillUnmount() {
      SearchResultsStore.unlisten(this.onChange);
    }

    onChange(state){

        this.setState(state);

    }

    renderPetCard(page, start){
        var petCards = [];
        var len = this.state.pet_meta.length;
        for(var i = (9 * page) + start ; i < ((9*page) + 9) && i < len ; i += 3){
            //3 results per col
            console.log(i);
            petCards.push(
                <PetCard key = {i}
                         name={this.state.pet_meta[i].name}
                         image={this.state.pet_meta[i].photos[0]}
                         description={this.state.pet_meta[i].description}
                         adoption_link={this.state.pet_meta[i].adopt_link}
                         city={this.state.pet_meta[i].city}
                         state={this.state.pet_meta[i].state}>

                </PetCard>
            )
        }

        return <div>{petCards}</div>;
    }

    render() {



        if(this.state.pet_meta[0]) {

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
                    <Row>
                        <Col className="m5 s12"/>

                        <Col className="m2 s12">
                            <Pagination  items={this.state.pet_meta.length / 9 + 1}
                            activePage={1}
                            maxButtons={8}
                            onSelect= {(i) => {
                                SearchResultsActions.changePage(i - 1);
                            }}

                            />
                        </Col>
                        <Col className="m5 s12"/>

                    </Row>


                </div>
            )
        }

        return(null)
    }
}


class AdvancedOptions extends React.Component {
    /* changes search results, will requery our lamdba function */
    /* initial state comes from the params from get detections */
}

class ResultsPage extends React.Component {
    /* our state should be the pets in our json */
    /* possibly the search params from get detections */


    render() {
        return(
            <div>
                <Navbar brand='FelineFelicity' right>
                    {/* need to drop down some menus here */}
                    <NavItem><Icon>search</Icon></NavItem>

                </Navbar>

                <div>
                    <ResultsContainer params={this.props.location.query}></ResultsContainer>
                </div>



            </div>


        );
    }

}

ResultsPage.defaultProps = {
};

export default ResultsPage;
