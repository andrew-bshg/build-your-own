import React from 'react'
import {store} from '../../store';
import { useStoreState } from 'pullstate';

const Summary = () => {
    // Should only have one product when we come to this component
    // Will put into useState hook
    let finalProduct = useStoreState(store, s => s.products );
    finalProduct = finalProduct[0];
  
    return (
        <div>
            <p>We think this dishwasher suits you best<br/>{finalProduct.productTitle}</p>
            {/* USPs came with <strong> tags */}
            {/* Component USP's? */}
            <p>{finalProduct.usp_1.replace(/(<([^>]+)>)/ig,"")}</p>
            <p>{finalProduct.usp_2.replace(/(<([^>]+)>)/ig,"")}</p>
            <p>{finalProduct.usp_3.replace(/(<([^>]+)>)/ig,"")}</p>
            <p>{finalProduct.usp_4.replace(/(<([^>]+)>)/ig,"")}</p>
            <p>{finalProduct.usp_5.replace(/(<([^>]+)>)/ig,"")}</p>
            <p>{finalProduct.msrp}</p>
            <img src={`${finalProduct.ImageIDLowRes}`} alt ="dishwasher"/>
        </div>
    )
}

export default Summary
