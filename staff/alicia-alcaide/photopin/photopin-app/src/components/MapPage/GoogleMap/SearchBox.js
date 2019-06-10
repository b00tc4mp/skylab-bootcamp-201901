import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  z-index: 1;
  margin-bottom: -60px;
`;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener("places_changed", this.onPlacesChanged);
    this.searchBox.bindTo("bounds", map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi && mapApi.event && mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlacesChanged = ({ onSearchResult } = this.props) => {
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    onSearchResult(place);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = "";
  }

  render() {
    return (
      <Wrapper>
        <input
          ref={ref => {
            this.searchInput = ref;
          }}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Enter a location"
        />
      </Wrapper>
    );
  }
}

SearchBox.propTypes = {
  map: PropTypes.object.isRequired,
  mapApi: PropTypes.object.isRequired,
  onSearchResult: PropTypes.func.isRequired
};

export default SearchBox;
