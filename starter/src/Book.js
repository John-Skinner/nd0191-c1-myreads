import BookDialog from "./BookDialog";

/**
 * @description book represents ui of one book
 * @param shelfName The shelf the book is on.
 * @param bookEntry The database item representing one book.
 * @param onMoveBook callback when the user wants to move a book to a new shelf.
 * @returns {JSX.Element}
 */
const Book = ({shelfName, bookEntry, onMoveBook}) =>
{
    /**
     * called when the user selects a new shelf from the dialog selection.
     * @param shelfName The other bookshelf to move the book to.
     */
    const newShelfSelected = (shelfName) =>
    {
        onMoveBook(shelfName, bookEntry)
    }

    // found that some books don't have thumbnails, so we use '' for the
    // image url.
    let hasBackgroundImage = true;
    if (!bookEntry.imageLinks)
    {
        hasBackgroundImage = false;
    }
    if (hasBackgroundImage)
    {
        if (!bookEntry.imageLinks.thumbnail)
        {
            hasBackgroundImage = false;
        }
    }

    let imageUrl = '';
    if (hasBackgroundImage)
    {
        imageUrl = 'url(' + bookEntry.imageLinks.thumbnail + ')';
    }

    if (bookEntry.authors === undefined)
    {
        bookEntry.authors = [''];
    }
    let authorsList = '';
    bookEntry.authors.forEach((author) =>
    {
        if (authorsList.length === 0)
        {
            authorsList = author;
        } else
        {
            authorsList = authorsList + ', ' + author;
        }
    })
    return (
        <div className='book'>
            <div className='book-top'>
                <div className='book-cover'
                     style={{
                         width: 128,
                         height: 192,
                         backgroundImage: imageUrl
                     }}
                ></div>
                <BookDialog shelf={shelfName} onNewShelfSelected={newShelfSelected}/>
            </div>
            <div className='book-title'>
                {bookEntry.title}
            </div>
            <div className='book-authors'>
                {
                    authorsList
                }
            </div>
        </div>
    )

}
export default Book;
