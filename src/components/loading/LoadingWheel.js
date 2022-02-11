import React from 'react'

export const LoadingWheel = () => {
    return (
        <div>
            <div className='loading__center'>
                <div className="loading__lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
