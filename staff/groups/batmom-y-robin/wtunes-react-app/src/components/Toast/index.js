import React from 'react'
import { toast } from "bulma-toast";


function Toast({error}){

    toast({
        message: `${error}`,
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true
    })

    return <script src="bulma-toast.min.js" className="is-danger"></script>
}

export default Toast