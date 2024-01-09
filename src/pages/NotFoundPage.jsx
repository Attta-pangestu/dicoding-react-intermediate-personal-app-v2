import React from "react";
import Lottie from "lottie-react";
import PageNotFoundAnimation from "../asset/Animation - 1704781241204.json";

function NotFoundPage () {
    return (
        <div className="notes-list-empty">
            <p>Not Found page</p>
            <Lottie animationData={PageNotFoundAnimation} />
        </div>
    )
}

export default NotFoundPage; 