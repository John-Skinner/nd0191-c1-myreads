import "./App.css";
import {useEffect, useState} from "react";

import {Route, Routes} from "react-router-dom";
import Library from "./Library";
import SearchPage from "./SearchPage";
import {getAll, update} from "./BooksAPI";

/**
 * @description main react application.

 */

function App()
{
    let createEmptyShelves = () =>
    {
        let newShelves = [];
        bareShelves.forEach((shelf) =>
        {
            newShelves.push(Object.assign(shelf));
        });
        return newShelves;
    }
    useEffect(() =>
    {
        // perform the initial loading of the bookshelves.

        let startShelves = createEmptyShelves();

        getAll().then((books) =>
        {
            books.forEach((book) =>
            {
                // this call to reassignShelf updates startShelves with the
                // book assignment.  But does not setShelves() until all the
                // books are assigned.
                reassignShelf('', book.shelf, book, startShelves);
            })
            setShelves(startShelves);
        })
    }, []);
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
     * @param library Optional name for temporary library when reloading all the shelves
     * so that the shelves state is updated once for the next render.  When library
     * is provided, then the reassignment is incrementally applied to the input library
     * rather than creating a copy of the library and updating the shelves state with the library.
     */
    const reassignShelf = (oldShelf, newShelf, book, library) =>
    {
        // need to create a complete deep copy to assure the
        // setstate triggers new renders.
        let newShelves = library ? library : JSON.parse(JSON.stringify(shelves));

        // if an old bookshelf is given, the remove the book from oldShelf.
        // if no old bookShelf is given (ie ''), then skip the removal as we
        // are adding a new book from the db.
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
        // find what shelf the new book belongs on.

        let newShelfIndex = newShelves.findIndex((currentShelf) =>
        {
            return currentShelf.shelfName === newShelf
        })
        if (newShelfIndex >= 0)
        {
            newShelves[newShelfIndex].books.push(book);
            if (!library)
            {
                // if we are not doing a reload, then update the db to reflect the
                // new bookshelf assignment.
                update(book, newShelf).then(() =>
                {
                    console.log('updated the book re-assignment to the db');
                    setShelves(newShelves);
                })
            }
        } else
        {
            console.error(`could not find a shelf of name:${newShelf}`)
        }


    }

    // initial bookshelves
    let bareShelves = [
        {

            shelfName: 'wantToRead',
            books: []
        },
        {

            shelfName: 'read',
            books: []
        },
        {

            shelfName: 'currentlyReading',
            books: []
        }
    ]

    const [shelves, setShelves] = useState(bareShelves);


    return (
        <Routes>
            <Route exact path='/' element={<Library shelves={shelves} reassignShelf={reassignShelf}/>}/>
            <Route exact path='/search'
                   element={<SearchPage reassignToLibrary={reassignShelf}
                                        whichShelfForBook={findBookInShelf}>

                   </SearchPage>}/>
        </Routes>

    );

}

export default App;
