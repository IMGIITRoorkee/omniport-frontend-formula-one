import React from 'react';
import axios from 'axios'
import { Divider, Dropdown, Button } from 'semantic-ui-react';

import {
    urlGetBranchAndDegreeData,
    urlGetFilteredStudents,
} from '../urls'

import '../css/search.css'

const yearOptions = [
    { key: 1, text: '1st Year', value: 1 },
    { key: 2, text: '2nd Year', value: 2 },
    { key: 3, text: '3rd Year', value: 3 },
    { key: 4, text: '4th Year', value: 4 },
    { key: 5, text: '5th Year', value: 5 },
    { key: 6, text: '6th Year', value: 6 },
    { key: 7, text: '7th Year', value: 7 },
    { key: 8, text: '8th Year', value: 8 },
    { key: 9, text: '9th Year', value: 9 },
    { key: 10, text: '10th Year', value: 10 },
]

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterYear: [],
            filterBranch: [],
            filterDegree: [],
            filterBY: [],
            branches: {},
            degrees: {},
            filterStudents: [],
        }
    }

    componentDidMount() {
        this.getBranchAndDegrees()
    }

    getBranchAndDegrees() {
        axios
            .get(urlGetBranchAndDegreeData())
            .then(res => {
                this.setState({
                    branches: res.data.branches,
                    degrees: res.data.degrees,
                })
            })
            .catch(() => {

            })
    }

    onChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value })
        }
    }

    filterStudents = () => {
        let filter = ''

        if (this.state.filterBranch != '') {
            filter = `${filter}branch=${this.state.filterBranch}&`
        }

        if (this.state.filterDegree != '') {
            filter = `${filter}degree=${this.state.filterDegree}&`
        }

        if (this.state.filterYear != '') {
            filter = `${filter}year=${this.state.filterYear}&`
        }

        if (this.state.filterBY != '') {
            filter = `${filter}by=${this.state.filterBY}&`
        }
        
        axios
        .get(urlGetFilteredStudents(filter))
        .then(res => {
           this.setState({
               filterStudents: res.data,
           })
        //    this.props.addFilteredStudents(res.data)
        })
        .catch(() => {

        })
    }

    render() {
        const { branches, degrees, filterYear, filterBranch, filterDegree, filterBY } = this.state
        let branchOptions = []
        let degreeOptions = []
        let byOptions = []

        for (const i in branches) {
            branchOptions.push({
                key: i.toString(),
                value: i.toString(),
                text: branches[i].toString(),
            });
        }
        for (const i in degrees) {
            degreeOptions.push({
                key: i.toString(),
                value: i.toString(),
                text: degrees[i].toString(),
            });
        }

        for (const i in yearOptions) {
            for (const j in branches) {
                byOptions.push({
                    key: yearOptions[i].value.toString() + '.' + j.toString(),
                    value: yearOptions[i].value.toString() + '.' + j.toString(),
                    text: yearOptions[i].text + " " + branches[j].toString(),
                });
            }
        }

        return (
            <div styleName='container'>
                <div styleName='filterContainer'>
                    <div styleName='filter-1'>
                        <Dropdown
                            name="filterYear"
                            clearable
                            multiple
                            search
                            options={yearOptions}
                            onChange={this.onChange}
                            placeholder="Filter by year"
                            value={filterYear}
                            selection
                        />
                        <Dropdown
                            name="filterDegree"
                            clearable
                            multiple
                            search
                            placeholder="Filter by degree"
                            value={filterDegree}
                            onChange={this.onChange}
                            options={degreeOptions}
                            selection
                        />
                        <Dropdown
                            name="filterBranch"
                            clearable
                            multiple
                            search
                            placeholder="Filter by branch"
                            value={filterBranch}
                            onChange={this.onChange}
                            options={branchOptions}
                            selection
                        />
                    </div>
                    <Divider />
                    <div styleName='filter-2'>
                        <Dropdown
                            name="filterBY"
                            clearable
                            multiple
                            search
                            placeholder="Filter by branch-year"
                            value={filterBY}
                            onChange={this.onChange}
                            options={byOptions}
                            selection
                        />
                    </div>

                </div>
                <div styleName='addButton'>
                    <Button
                        primary
                        fluid={false}
                        onClick={() => this.filterStudents()}>
                        Add
                    </Button>
                </div>
            </div>
        )
    }
}

export default Search
