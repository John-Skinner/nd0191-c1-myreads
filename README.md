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

