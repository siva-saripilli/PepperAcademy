import React from 'react';

const Loader = () => {
    return (
        <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="text-container-loading">
                <p>ChatGPT Response may Take Some Time...</p>
            </div>
        </div>
    );
};

export default Loader;
