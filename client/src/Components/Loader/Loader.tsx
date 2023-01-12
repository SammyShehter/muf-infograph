import React from "react"

export const Loader = ({height = "20px", width = "20px"}) => {
    return (
        <div
            className={`loader
        ease-linear
        rounded-full
        border-4
        border-t-4
        border-gray-200
        mx-auto
        `}
            style={{height, width}}
        ></div>
    )
}

export const FullLoader = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-green-400 opacity-75 flex flex-col items-center justify-center">
            <div className={`loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4`}></div>
        </div>
    )
}
