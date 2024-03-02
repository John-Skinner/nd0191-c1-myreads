import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

/**
 * @description UI to display a set of bookshelves (a library).
 * @param shelves array of shelves.
 * @param reassignShelf method for moving a book to another bookshelf.

 */
const Library = ({shelves, reassignShelf}) =>
{

    return (


        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {
                shelves.map((shelf) =>
                    {
                        return (
                            <div key={shelf.shelfName} className="list-books-content">
                                <BookShelf key={shelf.shelfName} reassignBook={reassignShelf} booksList={shelf}/>
                            </div>
                        )
                    }
                )
            }

            <div className='open-search'>
                <Link to='/search'>Search</Link>
            </div>
        </div>
    )
}
Library.propTypes = {
    shelves: PropTypes.array.isRequired,
    reassignShelf: PropTypes.func.isRequired
}

export default Library
