import React, { useState, useEffect } from 'react';


const Counter = () => {
    const [ count, setCount ] = useState(0);

    useEffect(() => {
      console.log('mounting');
    }, []);

    console.log('rendering');

    return (
        <>
            <h4>hello again {count}</h4>
            <button onClick={() => setCount(count + 1)}>increase</button>
        </>
    );
};



// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export default Counter;