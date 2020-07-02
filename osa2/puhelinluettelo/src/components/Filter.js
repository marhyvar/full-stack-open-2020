import React from 'react'

const Filter = ({search, handleSearchChange}) => {
    return (
        <div>
            Filter shown with: <input 
                value={search}
                onChange={handleSearchChange}
            />
      </div>
    )
}

export default Filter