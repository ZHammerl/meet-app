import React, { Component } from 'react';
import { InfoAlert } from '../Alert/Alert';
import './citySearch.css';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
    infoText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter(
      (location) => {
        return (
          location
            .toUpperCase()
            .indexOf(value.toUpperCase()) > -1
        );
      }
    );
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'City not found. Please try another city',
      });
    } else {
      this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClick = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
    });
    //triggers function of parent component <App/>
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <label htmlFor="city" className="label">
          Search for a City
        </label>
        <InfoAlert text={this.state.infoText} />
        <input
          type="text"
          id="city"
          className="city"
          placeholder={'Filter by city'}
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={
            this.state.showSuggestions
              ? {}
              : { display: 'none' }
          }>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() =>
                this.handleItemClick(suggestion)
              }>
              {suggestion}
            </li>
          ))}
          <li
            key="all"
            onClick={() => this.handleItemClick('all')}>
            <b>See all cities</b>
          </li>
          <li
            key="close"
            onClick={() =>
              this.setState({ showSuggestions: false })
            }>
            x
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
