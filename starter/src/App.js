import "./App.css";
import { useState} from "react";

import {Route, Routes} from "react-router-dom";
import Library from "./Library";
import SearchPage from "./SearchPage";

/**
 * @description main react application.

 */

function App()
{
    /**
     * find if a given book already exists in any of the bookshelves for the search
     * tool to show when a book is on a shelf.
     * @param bookID
     * @returns {string} The bookshelf the book is on.
     */
    const findBookInShelf = (bookID) =>
    {
        let foundOnShelf = '';
        shelves.forEach((shelf) =>
        {
            let currentShelf = shelf.shelfName;
            let match = shelf.books.findIndex((shelfBook) =>
            {
                return shelfBook.id === bookID;
            })
            if (match >= 0)
            {
                foundOnShelf = currentShelf
            }
        });
        return foundOnShelf;
    };

    /**
     * print out the bookshelf, just used for debugging.
     * @param title A title for the listing.
     * @param someShelves An array of shelves.
     */
    const logShelves = (title, someShelves) =>
    {
        console.log(`---- library:${title}`);
        someShelves.forEach((shelf) =>
        {

            console.log(`shelf:${shelf.shelfName}`);
            shelf.books.forEach((book) =>
            {
                console.log(`book title:${book.id} `)
                console.dir(book);
            })
        })
    }


    /**
     * Move a book from one shelf to another shelf.
     * But if the old shelf if is '', then don't remove
     * it from the old shelf.  This occurs in the case of
     * the search feature.
     * @param oldShelf original shelf, if '', then don't attempt to remove.
     * @param newShelf new shelf of the move.
     * @param book the book object.
     */
    const reassignShelf = (oldShelf, newShelf, book) =>
    {
        // need to create a complete deep copy to assure the
        // setstate triggers new renders.
        let newShelves = JSON.parse(JSON.stringify(shelves))

        if (oldShelf.length > 0)
        {
            let oldShelfIndex = newShelves.findIndex((currentShelf) =>
            {
                return currentShelf.shelfName === oldShelf
            });
            let bookList = newShelves[oldShelfIndex];
            let oldBookIndex = bookList.books.findIndex((bookOnShelf) =>
            {
                return bookOnShelf.id === book.id;
            })
            if (oldShelfIndex >= 0)
            {
                bookList.books.splice(oldBookIndex, 1);
            }
        }
        // find book

        let newShelfIndex = newShelves.findIndex((currentShelf) =>
        {
            return currentShelf.shelfName === newShelf
        })
        if (newShelfIndex >= 0)
        {
            newShelves[newShelfIndex].books.push(book);
            setShelves(newShelves);
        }


    }

    // initial bookshelves
    let bareShelves = [
        {
            shelfName: 'Want to Read',
            books: []
        },
        {
            shelfName: 'Read',
            books: []
        },
        {
            shelfName: 'Currently Reading',
            books: []
        }
    ]

    const [shelves, setShelves] = useState(bareShelves);





    return (
        <Routes>
            <Route exact path='/' element={<Library shelves={shelves} reassignShelf={reassignShelf}/>}/>
            <Route exact path='/search' element={<SearchPage reassignToLibrary={reassignShelf}
                                                             whichShelfForBook={findBookInShelf}></SearchPage>}/>
        </Routes>

    );

}

export default App;
