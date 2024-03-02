import React from "react";
import { render } from '@testing-library/react'
import BookDialog from './BookDialog'

test('renders dialog',()=>{
    const newShelf = (name) => {
        console.log(`new name:${name}`)
    }
    render(<BookDialog shelf='Read' visible={true} onNewShelfSelected={newShelf} />);
})
