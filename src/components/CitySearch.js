import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
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
    this.setState({ query: value, suggestions });
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
        <input
          type="text"
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
