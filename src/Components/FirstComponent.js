import React, { Component } from 'react';
import Axios from 'axios';

export class FirstComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props.test);
        this.state = {
            loading: true,
            people: []
        }
    }

    componentWillMount() {
        this.setState({ loading: false });
        setTimeout( () => {
            Axios.get("https://randomuser.me/api/?results=50").then(response => {
                this.setState({ loading: false, people: response.data.results })
            })
        }, 3000);
    }

    render() {
        const { people, loading } = this.state;
        console.log(this.state);
        return (
            loading ? <h1>Ładowanie</h1> :
                <table>
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Full Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person, index) => (
                            <tr key={index}>
                                <td><img src={person.picture.medium} /></td>
                                <td>{person.name.first} {person.name.last}</td>
                                <td>{person.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        )
    }
}