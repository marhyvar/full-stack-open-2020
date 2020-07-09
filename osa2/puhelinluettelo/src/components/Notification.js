import React from 'react'

const Notification = ({message, error}) => {

    const notificationStyle = {
        color: 'green',
        background: 'lightyellow',
        fontSize: 18,
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 8,
        margin: 5
    }
    const errorStyle = {
        color: 'red', 
        background: 'lightyellow',
        fontSize: 18,
        borderStyle: 'dotted',
        borderRadius: 3,
        padding: 8,
        margin: 5
    }

    if (message === null) {
        return null
    }

    const divStyle = () => (
         error === true ? errorStyle : notificationStyle
    )

    return (
        <div style={divStyle()}>
            {message}
        </div>
    )
}

export default Notification