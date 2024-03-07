import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {search} from './BooksAPI';
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

/**
 * @description UI for the search based on subsequence of chars.
 * @param reassignToLibrary utility to move book to shelves. Used to move a book from db to the library.
 * @param whichShelfForBook utility to find if a book already exists in the library.

 */
const SearchPage = ({reassignToLibrary, whichShelfForBook}) =>
{
    let emptyShelves = {
        shelfName: 'add',
        books: []
    }
    // searchString state triggers side-effect to do background fetch with new search string.
    const [searchString, setSearchString] = useState('');

    // matches state triggers new bookshelf display for the special 'search' bookshelf.

    const [matches, setMatches] = useState(emptyShelves);
    useEffect(() =>
    {
        try
        {

            console.log(`try searching for ${searchString}`);
            if (searchString.length > 0)
            {
                search(searchString, 20).then((result) =>
                {
                    // if no matches are found, then the response will contain an error property and not be an array.
                    // with empty responses, make an empty bookshelf.

                    let shelvedResult = {
                        shelfName: 'new',
                        books: []
                    }
                    if (result.error)
                    {
                        console.log('empty query')

                    } else
                    {
                        console.log('matches found')

                        shelvedResult = {
                            shelfDisplayName: 'new',
                            books: result
                        }
                    }
                    setMatches(shelvedResult);
                }).catch((reason) =>
                {
                    console.error(`Error in fetch reason:${reason}`);
                });
            }

        } catch (e)
        {
            console.error("Error fetching books:" + e)
        }


    }, [searchString]);
    const reassign = (oldShelf, newShelf, book) =>
    {
        console.log(`shelf:${newShelf}`)
        console.dir(book);
        reassignToLibrary("", newShelf, book);
    }


    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/' className="close-search">Close Search Page</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(event) =>
                        {
                            setSearchString(event.target.value)
                        }}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
            <BookShelf reassignBook={reassign} booksList={matches} inExistingShelf={whichShelfForBook}/>
        </div>
    )
}
SearchPage.propTypes = {
    reassignToLibrary: PropTypes.func.isRequired,
    whichShelfForBook: PropTypes.func.isRequired
}
export default SearchPage
