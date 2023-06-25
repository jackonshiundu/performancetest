const express = require('express');
const { generateRandomBooks } = require('./generatebooks');
const {
  readDatasetFromFile,
  filterBooksByGenre,
  writeBooksToFile,
  sortBooksByPublishedDate,
} = require('./readDatafilterthensort');
const app = express();
const port = 3000;

//generate books
//generateRandomBooks();
// Start the server

function main() {
  const inputFile = 'books.json';
  const outputFile = 'filtered_books.json';

  const dataset = readDatasetFromFile(inputFile);
  const filteredBooks = filterBooksByGenre(dataset, 'Mystery');
  const sortedBooks = sortBooksByPublishedDate(filteredBooks);
  writeBooksToFile(sortedBooks, outputFile);

  console.log('Script completed successfully.');
}
main();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
