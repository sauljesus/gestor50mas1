import React from 'react';
import Index from '../pages/index';

const IndexContainer = () =>{

    const scrollDown = () => {
        window.scrollBy(0, window.innerHeight, {behavior: "smooth",});

    };

    return(
        <Index scrollDown={scrollDown}/>
    )
};

export default IndexContainer;