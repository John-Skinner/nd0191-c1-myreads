import Book from "./Book";
import PropTypes from 'prop-types'

/**
 * @description UI for displaying one bookshelf
 * @param booksList object with 1) shelf name, and 2) array of books
 * @param reassignBook callback to move a book from this shelf to another shelf.
 * @param inExistingShelf service function that must be provided to report back what shelf a book is already on.

 */
const BookShelf = ({booksList, reassignBook, inExistingShelf}) =>
{
    let myShelfName = booksList.shelfName;
    const onReassign = (newShelfName, item) =>
    {
        reassignBook(myShelfName, newShelfName, item);
    }

    return (
        <div className='bookshelf'>
            <h2 className='bookshelf-title'>{myShelfName}</h2>
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {
                        booksList.books.map((bookItem, index) =>
                        {
                            // referenceShelfName is used to possibly show the book
                            // on another shelf than the shelf used to display the book
                            // This only occurs with the 'new' bookshelf that is used to
                            // show the books in the remote library
                            let referenceShelfName = myShelfName;
                            if (inExistingShelf)
                            {
                                let alreadyInShelf = inExistingShelf(bookItem.id);
                                if (alreadyInShelf)
                                {
                                    referenceShelfName = alreadyInShelf;
                                }
                            }
                            return (
                                <Book key={index} bookEntry={bookItem} shelfName={referenceShelfName}
                                      onMoveBook={onReassign}/>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
}
BookShelf.propTypes = {
    booksList: PropTypes.object.isRequired,
    reassignBook: PropTypes.func.isRequired,
    inExistingShelf: PropTypes.func
}
export default BookShelf;
