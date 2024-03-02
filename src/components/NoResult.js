import noImage from "../assets/Image_not_available.png"

function NoResult() {
    return (
        <div className="no_result_container">
            <img src={noImage} alt="not found" />
            <h2>Sorry, No Results Found</h2>
            <h3>search for another image</h3>
        </div>
    )
}

export default NoResult;