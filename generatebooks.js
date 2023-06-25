const faker = require('faker');
const fs = require('fs');

// Generate a random book
function generateRandomBooks() {
  function generateBook() {
    const genres = [
      'Mystery',
      'Fantasy',
      'Sci-Fi',
      'Romance',
      'Thriller',
      'Historical Fiction',
    ];
    const title = faker.lorem.words(3);
    const genre = faker.random.arrayElement(genres);
    const publishedDate = faker.date
      .between('2000-01-01', '2023-6-31')
      .toISOString()
      .split('T')[0];
    return {
      title,
      genre,
      published_date: publishedDate,
    };
  }

  // Generate a list of random books
  function generateBooks(numBooks) {
    const books = [];
    for (let i = 0; i < numBooks; i++) {
      const book = generateBook();
      books.push(book);
    }
    return books;
  }

  // Write books to a JSON file
  function writeBooksToFile(books, filePath) {
    const data = JSON.stringify(books, null, 2);
    fs.writeFileSync(filePath, data, 'utf8');
  }

  // Generate 100,000 books
  const numBooks = 100000;
  const books = generateBooks(numBooks);

  // Write books to a JSON file
  const outputFile = 'books.json';
  writeBooksToFile(books, outputFile);

  console.log('Books file generated successfully.');
}

module.exports = { generateRandomBooks };
