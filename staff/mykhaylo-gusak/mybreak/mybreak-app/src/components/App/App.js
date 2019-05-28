import React, { useState } from 'react';

import Header from '../Header'
import Order from '../Order'
import Footer from '../Footer'
import Landing from '../Landing'


function App() {

  const [order, setOrder] = useState(null);
  const [landing, setLanding] = useState(null);



  return <div>
    <Header />
    <Order/>
    <Footer />
  </div>

}

export default App;
