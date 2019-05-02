import React, {useState, useEffect}from 'react'
import logic from '../../logic'


function ThanksPage(){

  const [user, setUser] = useState({})

  useEffect(()=> {  
      logic.retrieveUser()
      .then(user => {
        setUser(user)
      })
    
  }, user)
  return(
    <div>{user.name}</div>
  )
}

export default ThanksPage