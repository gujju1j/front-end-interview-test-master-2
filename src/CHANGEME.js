import React, { Component } from 'react';
import _ from 'lodash';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      buildingTypes: [],
      selectedBuildingTypes: [],
      selectedBedNos: '',
      selectedBathNos: ''
    };
    this.applyFilter = this.applyFilter.bind(this);
    this.getSelectedBuildingTypes = this.getSelectedBuildingTypes.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    API.getLocations()
      .then(response => {
        this.allLocations = response.data;
        this.maxBedSize = _.maxBy(
          _.map(this.allLocations, 'beds'),
          bed => +bed
        );
        this.maxBathSize = _.max(_.map(this.allLocations, 'baths'));
        this.setState({ locations: this.allLocations });
      })
      .catch(e => {
        console.error(e);
      });

    API.getBuildingTypes()
      .then(response => {
        this.setState({ buildingTypes: response.data });
      })
      .catch(e => {
        console.error(e);
      });
  }

  applyFilter(e) {
    e.preventDefault();
    let filteredLocation = this.allLocations;
    if (this.state.selectedBuildingTypes.length) {
      filteredLocation = filteredLocation.filter(
        location =>
          this.state.selectedBuildingTypes.indexOf(location.buildingType) > -1
      );
    }
    if (this.state.selectedBedNos !== '') {
      filteredLocation = filteredLocation.filter(
        location => location.beds === this.state.selectedBedNos
      );
    }
    if (this.state.selectedBathNos !== '') {
      filteredLocation = filteredLocation.filter(
        location => location.baths === this.state.selectedBathNos
      );
    }

    this.setState({ locations: filteredLocation });
  }

  onReset() {
    this.setState({
      locations: this.allLocations,
      selectedBuildingTypes: [],
      selectedBedNos: '',
      selectedBathNos: ''
    });
  }

  getSelectedBuildingTypes(e) {
    const options = e.target.options;
    let selectedBuildingTypes = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedBuildingTypes.push(options[i].value);
      }
    }
    this.setState({ selectedBuildingTypes });
  }

  render() {
    return (
      <div className="testContainer">
        <div className="filterContainer">
          <form onSubmit={this.applyFilter} onReset={this.onReset}>
            <label htmlFor="beds">Beds: </label>
            <input
              id="beds"
              type="number"
              max={this.maxBedSize}
              value={this.state.selectedBedNos}
              onChange={e => {
                this.setState({
                  selectedBedNos: +e.target.value > -1 ? +e.target.value : ''
                });
              }}
            />{' '}
            <label htmlFor="rooms">Rooms: </label>
            <input
              id="rooms"
              type="number"
              max={this.maxBathSize}
              value={this.state.selectedBathNos}
              onChange={e => {
                this.setState({
                  selectedBathNos: +e.target.value > -1 ? +e.target.value : ''
                });
              }}
            />{' '}
            <label htmlFor="beds">
              Building Type (Hold ctrl for multiple select):{' '}
            </label>
            <select multiple onChange={this.getSelectedBuildingTypes}>
              {this.state.buildingTypes.map(buildingType => (
                <option key={buildingType.id} value={buildingType.name}>
                  {buildingType.name}
                </option>
              ))}
            </select>&nbsp;&nbsp;
            <input type="submit" />&nbsp;
            <input type="reset" />
          </form>
        </div>
        <RemineTable properties={this.state.locations} />
      </div>
    );
  }
}

export default Test;
