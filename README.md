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

