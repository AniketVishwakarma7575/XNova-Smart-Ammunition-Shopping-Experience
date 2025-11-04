import React from 'react'

const Placholder = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="border rounded-2xl p-4 shadow-sm bg-white animate-pulse"
                    >
                        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Placholder
