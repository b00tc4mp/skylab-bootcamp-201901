import React, { Component } from "react";
import PropTypes from "prop-types";
import { pmapType } from "../../../types";
import { withRouter, Redirect } from "react-router-dom";
import CollectionPin from "./CollectionPin";
import CollectionForm from "./CollectionForm";
import literals from "./literals";
import './index.css'
import YesNoModal from "../../Common/YesNoModal";
import logic from "../../../logic";
import iconShow from "../../../assets/icons/icon_eye.png";
import iconEdit from "../../../assets/icons/icon_pencil.png";
import iconDelete from "../../../assets/icons/icon_trash.png";


class CollectionSection extends Component {
  state = { error: null, addingCollection: false, editingCollection: null, deletingCollection: false };

  handleNewCollection = () => {
    this.setState({ addingCollection: true });
  };

  handleEditCollection = collection => {
    this.setState({ editingCollection: collection });
  };

  handleDeleteCollection = collection => {
    this.setState({ deletingCollection: collection });
  };

  handleSubmitNewCollection = collection => {
    this.setState({ addingCollection: false });
    this.props.onNewCollection(collection.title);
  };

  handleSubmitEditCollection = collection => {
    const oldCollection = this.state.editingCollection;
    this.setState({ editingCollection: null });
    this.props.onCollectionEdit(oldCollection.title, collection.title);
  };

  handleSubmitDeleteCollection = () => {
    this.setState({ deletingCollection: null });
    const title = this.state.deletingCollection.title;
    this.props.onCollectionDelete(title);
  };

  handleNewCollectionCancel = () => this.setState({ addingCollection: false });

  handleEditCollectionCancel = () => this.setState({ editingCollection: null });

  handleDeleteCollectionCancel = () => this.setState({ deletingCollection: null });

  render() {
    const { props, state } = this;
    const literal = literals[props.lang];

    return (
      <>
        {!logic.isUserLoggedIn && <Redirect to="/logout" />}
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
          {state.deletingCollection && (
            <YesNoModal
              title={literal.deleteColectionTitle}
              desc={literal.deleteColectionDesc}
              onYes={this.handleSubmitDeleteCollection}
              onNo={this.handleDeleteCollectionCancel}
              lang={props.lang}
            />
          )}
        </section>
        <section className="collections">
          {props.pmap && props.pmap.collections && (
            // ---------  VIEJO  -------------
            // <ul uk-accordion="multiple: true">
            //   {props.pmap.collections.map(collection => {
            //     return (
            //       <li key={collection.title} className="uk-open">
            //         <h6 className="uk-margin-left uk-accordion-title">
            //           <button onClick={() => props.onCollectionVisibilityToggle(collection.title)}>T</button>
            //           {collection.title}
            //           <button onClick={() => this.handleEditCollection(collection)}>E</button>
            //           <button onClick={() => this.handleDeleteCollection(collection)}>D</button>
            //         </h6>
            //         {collection.pins && (
            //           <ul className="uk-margin-left uk-accordion-content">
            //             {collection.pins.map(pin => (
            //               <CollectionPin
            //                 key={pin.id}
            //                 pin={pin}
            //                 onSelect={props.onPinSelect}
            //                 onDelete={props.onPinDelete}
            //               />
            //             ))}
            //           </ul>
            //         )}
            //       </li>
            //     );
            //   })}
            // </ul>
            // ---------  NUEVO pero solo sale +  -------------
            <ul uk-accordion="multiple: true">
              {props.pmap.collections.map(collection => {
                return (
                  <li key={collection.title} className="uk-open">
                    <div className="uk-accordion-title uk-flex uk-column uk-flex-between" >
                      <div className="uk-left">
                        <h6 className="uk-accordion-title custom-accordion-title">
                          {collection.title}
                        </h6>
                      </div>
                      <div className="uk-right">
                        <button className="uk-button uk-button-default uk-button-small custom-buttom-mini"
                          onClick={() => props.onCollectionVisibilityToggle(collection.title)}>
                          <img className="" src={iconShow} height="18" width="18" alt="" />
                        </button>
                        <button className="uk-button uk-button-default uk-button-small custom-buttom-mini"
                          onClick={() => this.handleEditCollection(collection)}>
                          <img className="" src={iconEdit} height="15" width="15" alt="" />
                        </button>
                        <button className="uk-button uk-button-default uk-button-small custom-buttom-mini"
                          onClick={() => this.handleDeleteCollection(collection)}>
                          <img className="" src={iconDelete} height="15" width="15" alt="" />
                        </button>
                      </div>
                    </div >
                    {collection.pins && (
                      <ul className="uk-accordion-content custom-accordion-content custom-ul">
                        {collection.pins.map(pin => (
                          <CollectionPin
                            key={pin.id}
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
