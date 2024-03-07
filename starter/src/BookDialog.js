
import {
    WantToReadDisplayName,
    CurrentlyReadingDisplayName,
    ReadDisplayName,
    CurrentlyReadingInternalName,
    WantToReadInternalName,
    ReadInternalName,
    NoneInternalName,
    NoneDisplayName
} from './bookDisplayName'

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
    console.log(`book dialog assigned to shelf:${shelf}`);
    let shelfValue = shelf ? shelf : "new";


    return (
        <div className="book-shelf-changer">
            <select onChange={itemSelected} value={shelfValue}>
                <option value="new" disabled>
                    add to ...
                </option>
                <option id='selectorOption' value={CurrentlyReadingInternalName}>
                    {CurrentlyReadingDisplayName}
                </option>
                <option value={WantToReadInternalName}>{WantToReadDisplayName}</option>
                <option value={ReadInternalName}>{ReadDisplayName}</option>
                <option value={NoneInternalName}>{NoneDisplayName}</option>
            </select>
        </div>
    )


}
export default BookDialog;
