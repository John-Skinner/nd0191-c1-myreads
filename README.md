# MyReads Project


This is the project submission for the Udacity for John Skinner
It meets the project rubrics, and does not include any extra features.
Some design choices that may be unique:

1) The bookshelves are modeled as an extendable array of bookshelves to allow any number of shelves in the library.
2) The state for the bookshelves is updated by duplicating the json object for the entire library with JSON.parse(
   JSON.stringify) to do a deep copy. Is there a better way?

# Build

```
cd starter
npm install
```

# Launch

```
npm start
```
# Second Submission notes
```
Hi Learner,

I cannot grade your project at this time due to one of the core specifications not being implemented correctly-
No book is displayed on the main page on the launch of the application.
```

Updated to call `getAll()` from `useEffects` within  `App`, and set each book on it's bookshelf.

`Made a few other cosmetic changes regarding bookshelf internal names vs displayed names`
```
Note: I can add books from the search page but books should be fetched on the launch of the application BooksAPI.getAll server endpoint.
See attached:
```
# Third Submission notes
```
Multiple authors are not displayed for books with it.
```
Fixed by assembling a string that lists all the authors and referencing the assembled string in the virtual dom tree.
```angular2html
The prior search results are shown. Books are shown when all text is deleted from the search input box.
```
Fixed by adding an else clause that still updates the search string state (setMatches) when the search string 
length is 0.
```angular2html
The "None" option is NOT selected if a book has not been assigned to a shelf.
```
Fix made to BookDialog.js by setting the select's value to None when the shelf name property is undefined.

