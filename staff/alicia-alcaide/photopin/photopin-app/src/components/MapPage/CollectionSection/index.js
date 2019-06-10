import React, { Component } from "react";
import PropTypes from "prop-types";
import { pmapType } from "../../../types";
import { withRouter } from "react-router-dom";
import CollectionPin from "./CollectionPin";
import CollectionForm from "./CollectionForm";
import literals from "./literals";

class CollectionSection extends Component {
  state = { error: null, addingCollection: false, editingCollection: null };

  handleNewCollection = () => {
    this.setState({ addingCollection: true });
  };

  handleEditCollection = collection => {
    this.setState({ editingCollection: collection });
  };

  handleSubmitNewCollection = collection => {
    this.setState({ addingCollection: false });
    this.props.onNewCollection(collection.title);
  };

  handleSubmitEditCollection = newCollection => {
    const oldCollection = this.state.editingCollection;
    this.setState({ editingCollection: null });
    this.props.onCollectionEdit(oldCollection.title, newCollection.title);
  };

  handleNewCollectionCancel = () => this.setState({ addingCollection: false });

  handleEditCollectionCancel = () => this.setState({ editingCollection: null });

  render() {
    const { props, state } = this;
    const literal = literals[props.lang];

    return (
      <>
        <section className="collections__addCollection">
          <button className="button--addCollection" onClick={() => this.handleNewCollection()}>
            {literal.addCollection}
          </button>
          {state.addingCollection && (
            <CollectionForm
              collection={{ title: "" }}
              onSubmit={this.handleSubmitNewCollection}
              onCancel={this.handleNewCollectionCancel}
              lang={props.lang}
            />
          )}
          {state.editingCollection && (
            <CollectionForm
              collection={state.editingCollection}
              onSubmit={this.handleSubmitEditCollection}
              onCancel={this.handleEditCollectionCancel}
              lang={props.lang}
            />
          )}
        </section>
        <section className="collections">
          {props.pmap && props.pmap.collections && (
            <ul uk-accordion="multiple: true">
              {props.pmap.collections.map(collection => {
                return (
                  <li key={collection.title} className="uk-open">
                    <h6 className="uk-margin-left uk-accordion-title">
                      <button onClick={() => props.onCollectionVisibilityToggle(collection.title)}>T</button>
                      {collection.title}
                      <button onClick={() => this.handleEditCollection(collection)}>E</button>
                      <button onClick={() => props.onCollectionDelete(collection.title)}>D</button>
                    </h6>
                    {collection.pins && (
                      <ul className="uk-margin-left uk-accordion-content">
                        {collection.pins.map(pin => (
                          <CollectionPin
                            key={pin._id}
                            pin={pin}
                            onSelect={props.onPinSelect}
                            onDelete={props.onPinDelete}
                          />
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </>
    );
  }
}

CollectionSection.propTypes = {
  pmap: pmapType,
  lang: PropTypes.string.isRequired,
  onNewCollection: PropTypes.func.isRequired,
  onCollectionDelete: PropTypes.func.isRequired,
  onCollectionEdit: PropTypes.func.isRequired,
  onCollectionVisibilityToggle: PropTypes.func.isRequired,
  onPinSelect: PropTypes.func.isRequired,
  onPinDelete: PropTypes.func.isRequired
};

export default withRouter(CollectionSection);
