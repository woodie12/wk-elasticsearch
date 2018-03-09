import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react'
import { Form, Checkbox } from 'semantic-ui-react'
import {  Item } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import {  Header, Image, Modal } from 'semantic-ui-react'

import axios from 'axios'


class App extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleIndex = this.handleIndex.bind(this);


        // this.handleDirect = this.handleDirect.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.state = {
            result: [],
            userInput: ""
        };
    }
        handleSearch(e){
            //add a fun when clear the form delete the vision
            console.log("e is ");
            console.log(e.target.value);
            let input = e.target.value;
            if(e.target.value === ""){
                console.log("empty case triggered");
                return;
            }
            this.setState({userInput:e.target.value});

            // console.log(this.state.result);
            //'https://localhost:9200/library/_search?q='+'body:'+ this.state.userInput
            axios
                .post('/api',{
                    'query': input
                })
                .then(function (response){
                    let result = response.data;
                    console.log("result is ");
                    console.info(response);
                    console.info(response.data);
                    this.setState({result: result
                    });
                    console.log("new result update ",this.state.result);
                }.bind(this));

        }
        handleUpdate(){
        //    localhost:9200/accounts/person/1
            axios
                .put('https://localhost:9200/library/article/57508597941ef8c676603b89',
                    {

                        "id": "5750855ece7de0a81311dbf1",
                        "title": "Consequat ea exercitation cillum adipisicing nisi officia.",
                        "journal": "esse incididunt",
                        "volume": 5,
                        "number": 5,
                        "pages": "272-290",
                        "year": 2000,
                        "authors": [
                        {
                            "firstname": "Chandra",
                            "lastname": "Cardenas",
                            "institution": "Xinware",
                            "email": "Chandra@Xinware.io"
                        },
                        {
                            "firstname": "Tracy",
                            "lastname": "Reeves",
                            "institution": "Sulfax",
                            "email": "Tracy@Sulfax.me"
                        },
                        {
                            "firstname": "Brianna",
                            "lastname": "Porter",
                            "institution": "Cubicide",
                            "email": "Brianna@Cubicide.com"
                        }
                    ],
                        "abstract": "Velit do cupidatat sunt sunt nulla voluptate labore enim.",
                        "link": "http://nulla.info/5750855ece7de0a81311dbf1.pdf",
                        "keywords": [
                        "culpa",
                        "adipisicing",
                        "elit",
                        "Lorem"
                    ],
                        "body": "Anim anim "
                    }
                )
                .then(function (response){
                    console.log(response);
                    let result = response.data.results;

                    console.log("result is ");
                    console.info(result);
                    this.setState({result: result
                    });
                    console.log("new result update ",this.state.result);
                }.bind(this));
        }
        handleIndex(){

            axios
                .get('/api')
                // .then(function (response){
                //     console.log(response);
                //     let result = response.data.results;
                //
                //     console.log("result is ");
                //     console.info(result);
                //     this.setState({result: result
                //     });
                //     console.log("new result update ",this.state.result);
                // }.bind(this));
//search



        }


    render() {
        return(
        <div className="Home">
            {console.log(this.state)}
            <h1>Elastic Search</h1>
            <Search handleSearch = {this.handleSearch}
                    handleUpdate={this.handleUpdate}
                    handleIndex = {this.handleIndex}
            />
            {/*//<SelectBar />*/}
            <Result
                result = {this.state.result}
            />
        </div>
        )
    }
}

class Search extends Component{
    render(){

        return(
            <div>
                {/*<form>*/}
                <Input
                    placeholder="Search..."
                    onChange = {this.props.handleSearch}
                />
                <Button onClick = {this.props.handleUpdate}>Update</Button>
                <Button onClick = {this.props.handleIndex}>Index</Button>
            </div>
        );
    }
}

class Result extends Component{
    render(){
        console.log('------------------3---------------',this.props);

        return(
            <div>
                {console.log("mapppp ",this.props.result)}
                {this.props.result.map((result) =>{
                    console.log('result', result);
                    return(
                        <div className = "set_col" >
                            <p>{result._source.title}</p>
                                {/*<Item.Group>*/}
                                    {/*<Item /*onClick = {this.props.handleClick}>*/}
                                        {/*<div className="inner">*/}
                                            {/*<Item.Content className = "content-home">*/}
                                                {/*<Item.Header></Item.Header>*/}
                                                {/*<Item.Header></Item.Header>*/}
                                            {/*</Item.Content>*/}
                                        {/*</div>*/}
                                    {/*</Item>*/}
                                {/*</Item.Group>*/}

                        </div>


                    );
                })}

            </div>
        );
    }
}


export default App;
