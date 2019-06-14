import React, { useState } from 'react'
import { css } from '@emotion/core';
// First way to import
import { BarLoader } from 'react-spinners';



function Loader() {

    return (

        <BarLoader
            sizeUnit={"px"}
            size={30}
            color={'#7E75AD'}
            loading={Loader}
        />

    )
}

export default Loader