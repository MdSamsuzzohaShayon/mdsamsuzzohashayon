import React from 'react'

const Loader = ({ text }: { text: string }) => {
    return (
        <div className="bg-tansparent w-full flex justify-center flex-col items-center mt-8">
            <svg className="animate-spin h-24 w-24 mr-3" fill='rgb(225, 29, 72)' viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
            <p>{text}</p>
        </div>
    )
}

export default Loader