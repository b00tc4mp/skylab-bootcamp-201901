import React, { useState, useEffect } from 'react';
import logic from '../../logic';
import Cart from '../Cart';

export default function UserProfile(props) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [historicCarts, setHistoricCarts] = useState([]);

  useEffect(() => {
    logic.retrieveUser().then(user => {
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
      setHistoricCarts(user.historicCarts);
    });
  }, logic.userId);

  return (
    <div className="container mt-3">
      <h4>User Profile</h4>

      {!email && (
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <form>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={name}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder="Surname"
                value={surname}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
            </div>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={email}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
      </form>

      <h5 className="mt-3">Last purchases</h5>

      {!historicCarts ? (
        <p>No purchases yet</p>
      ) : (
        <table class="table table-striped table-sm">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Items</th>
              <th scope="col">$</th>
            </tr>
          </thead>
          <tbody>
            {historicCarts.map((_cart, i) => {
              let {
                cart,
                payDetails: { date, numItems, amount },
              } = _cart;
              date = new Date(date);
              return (
                <tr>
                  <th scope="row">{`${i + 1}`}</th>
                  <td>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</td>
                  <td>{numItems}</td>
                  <td>{`${amount} $`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
