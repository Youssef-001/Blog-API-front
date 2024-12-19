import React from 'react';
import DOMPurify from 'dompurify';


const ContentComponent = ({ description }) => {
    console.log("here", description)
    return (
        <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
    );
};

export default ContentComponent;