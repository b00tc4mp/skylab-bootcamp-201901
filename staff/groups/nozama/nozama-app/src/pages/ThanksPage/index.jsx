import React, { useState } from 'react';
import Subtitle from '../../components/Products/Detail/Subtitle';
import logic from '../../logic';
import { Link } from 'react-router-dom'

function ThanksForPay(props) {
  let [name, setName] = useState([]);
  logic.retrieveUser().then(user => setName(user.name));

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-1" />
        <div className="col">
          <h5>{`${name}, thanks for buying!`}</h5>
        </div>
        <div className="col-1" />
      </div>

      <div className="row">
        <div className="col-1" />
        <div className="col">
          <Subtitle subtitle="Your payment has been received" />
        </div>
      </div>

      <div className="row">
        <div className="col"/>
        <Link to ="/" className="btn btn-primary my-5">Check more products</Link>
        <div className="col"/>
      </div>
    </div>
  );
}

export default ThanksForPay;
