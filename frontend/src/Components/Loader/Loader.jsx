import React from 'react'
import { Dna } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div>
            <Dna
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    )
}

export default Loader