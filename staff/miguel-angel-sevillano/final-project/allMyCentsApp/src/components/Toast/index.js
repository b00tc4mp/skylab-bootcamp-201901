import React from 'react'
import { toast } from "bulma-toast";


function Toast({ error ,toastType }) {

    toast({
        message: `${error}`,
        type:`${toastType}`,
        dismissible: true,
        pauseOnHover: true,
        position: "center"
    })

    return <script src="bulma-toast.min.js" className="is-danger"></script>
}

export default Toast




