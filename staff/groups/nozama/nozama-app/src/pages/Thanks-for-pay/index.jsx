import React , {useState} from 'react'
import Title from '../../components/Products/Detail/Title'
import Subtitle from '../../components/Products/Detail/Subtitle'
import Logic from '../../logic'
import logic from '../../logic';


function ThanksForPay(props){
    let [name, setName] = useState([]);
    logic.retrieveUser()
        .then(user => setName(user.name))

  return(
    <div className="container">
      <div className="row">
      <div className="col-1">
        </div>
        <div className="col-">
        <Title title={`${name}, thanks for buying!`}/>
        </div>
          
      </div>

      <div className="row">
        <div className="col-1">
        </div>
        <div className="col">
          <Subtitle subtitle="Your payment has been received" />
        </div>
      </div>



      
    </div>
  )

}

export default ThanksForPay