import { LogicError, ConnectionError } from 'auction-errors'
import UIkit from 'uikit'

function handleErrors(error) {
    if(error instanceof LogicError) {
        const re = /ObjectId/gm;
        if (re.test(String(error.message))) UIkit.notification({message: 'Invalid item id', status: 'warning'})  
        else UIkit.notification({message: error.message, status: 'warning'})  
    } 

    else if(error instanceof ConnectionError) UIkit.notification({message: error.message, status: 'danger'})

    else UIkit.notification({message: error.message, status: 'primary'})
}

export default handleErrors