import React from 'react'

const Notification = ({message}) => {

    const notificationStyle = {
        color: 'green',
        background: 'lightyellow',
        fontSize: 18,
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 8,
        margin: 5
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification