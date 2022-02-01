import {TailSpin} from "react-loader-spinner";
import React from 'react';

const Spinner = ({color}) => {
    return (
        <> 
        <TailSpin color={color?color:'#fff'} height={20} width={20} />
        </>
    )
}

export default Spinner
