import React, { Component } from "react";
import PropTypes from "prop-types";
import literals from "./literals";
import "./index.css";

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
    const { placeholder } = literals[this.props.lang];
    return (
      this.props.enabled && (
        <div className="searchbox">
          <input
            ref={ref => {
              this.searchInput = ref;
            }}
            type="text"
            onFocus={this.clearSearchBox}
            placeholder={placeholder}
          />
        </div>
      )
    );
  }
}

SearchBox.defaultProps = {
  enabled: true
};

SearchBox.propTypes = {
  map: PropTypes.object.isRequired,
  mapApi: PropTypes.object.isRequired,
  onSearchResult: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  enabled: PropTypes.bool
};

export default SearchBox;
