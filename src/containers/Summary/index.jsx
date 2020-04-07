import React from 'react'
import {store} from '../../store';
import { useStoreState } from 'pullstate';
import { Link } from 'react-router-dom';

const Summary = () => {
    // Should only have one product when we come to this component
    // Will put into useState hook
    let finalProduct = useStoreState(store, s => s.products );
    finalProduct = finalProduct[0];
    
    const onStartOverHandler = () => {
        store.update(s => {
            s.journey = null;
            s.choice = null;
            s.step = 1 ;
            s.order = [];
            s.products = s.productsList
        })
        console.log(store);
    }


    return (
        <div>
            <p>We think this dishwasher suits you best<br/>{finalProduct.productTitle}</p>
            {/* USPs came with <strong> tags */}
            {/* Component USP's? */}
            {/* Some USPs retrieved from XML are null. */}
            <p>{finalProduct.usp_1 ? finalProduct.usp_1.replace(/(<([^>]+)>)/ig,""): null}</p>
            <p>{finalProduct.usp_2 ? finalProduct.usp_2.replace(/(<([^>]+)>)/ig,""): null}</p>
            <p>{finalProduct.usp_3 ? finalProduct.usp_3.replace(/(<([^>]+)>)/ig,""): null}</p>
            <p>{finalProduct.usp_4 ? finalProduct.usp_4.replace(/(<([^>]+)>)/ig,""): null}</p>
            <p>{finalProduct.usp_5 ? finalProduct.usp_5.replace(/(<([^>]+)>)/ig,""): null}</p>
            <p>{finalProduct.msrp}</p>
            <img src={`${finalProduct.ImageIDLowRes}`} alt ="dishwasher"/>
            <Link to="/">
                <button onClick={onStartOverHandler}>Start Over</button>
            </Link>
            <button>Learn more</button>
            <button>Where to buy</button>
        </div>
    )
}

export default Summary
