const fs = require('fs');

// Function to filter books by genre
function filterBooksByGenre(books, genre) {
  return books.filter((book) => book.genre === genre);
}

// Function to sort books by published date in descending order
function sortBooksByPublishedDate(books) {
  // Base case: if the array has 0 or 1 element, it is already sorted
  if (books.length <= 1) {
    return books;
  }

  // Divide the array into two halves
  const midIndex = Math.floor(books.length / 2);
  const leftHalf = books.slice(0, midIndex);
  const rightHalf = books.slice(midIndex);

  // Recursively sort the left and right halves
  const sortedLeftHalf = sortBooksByPublishedDate(leftHalf);
  const sortedRightHalf = sortBooksByPublishedDate(rightHalf);

  // Merge the sorted halves
  return mergeSortedBooks(sortedLeftHalf, sortedRightHalf);
}

function mergeSortedBooks(leftHalf, rightHalf) {
  const merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Merge the two sorted arrays into a single sorted array
  while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
    const leftBook = leftHalf[leftIndex];
    const rightBook = rightHalf[rightIndex];

    if (
      new Date(rightBook.published_date) > new Date(leftBook.published_date)
    ) {
      merged.push(rightBook);
      rightIndex++;
    } else {
      merged.push(leftBook);
      leftIndex++;
    }
  }

  // Append any remaining elements from the left half
  while (leftIndex < leftHalf.length) {
    merged.push(leftHalf[leftIndex]);
    leftIndex++;
  }

  // Append any remaining elements from the right half
  while (rightIndex < rightHalf.length) {
    merged.push(rightHalf[rightIndex]);
    rightIndex++;
  }

  return merged;
}

// Read the dataset from a file
function readDatasetFromFile(file) {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

// Write books to a new file in JSON format
function writeBooksToFile(books, file) {
  const data = JSON.stringify(books, null, 2);
  fs.writeFileSync(file, data, 'utf8');
}

module.exports = {
  writeBooksToFile,
  readDatasetFromFile,
  sortBooksByPublishedDate,
  filterBooksByGenre,
};
