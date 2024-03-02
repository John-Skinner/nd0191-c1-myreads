/**
 * @description Displays the option to move the book to another bookshelf.
 * @param shelf Mark this shelf as the current shelf of the book
 * @param onNewShelfSelected callback when user changes bookshelf selection.

 */
const BookDialog = ({shelf, onNewShelfSelected}) =>
{
    const itemSelected = (event) =>
    {
        console.log(` item selected:${event.target.value}`);
        onNewShelfSelected(event.target.value);
    }

    return (
        <div className="book-shelf-changer">
            <select onChange={itemSelected} value={shelf}>
                <option value="new" disabled>
                    Move to... In Container
                </option>
                <option id='selectorOption' value="Currently Reading">
                    Currently Reading
                </option>
                <option value="Want to Read">Want to Read</option>
                <option value="Read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )


}
export default BookDialog;
