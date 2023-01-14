export const Loader = ({height = "20px", width = "20px"}) => {
    return <div className="loader" style={{height, width}}></div>
}

export const FullLoader = () => {
    return (
        <div className="loaderBackground">
            <div className="loader"></div>
        </div>
    )
}
