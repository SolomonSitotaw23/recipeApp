const HASURA_OPERATION = `
mutation addBook($title: String!, $cover_photo: String = "", $edition: Int = 10, $file: String = "", $page_size: Int = 10, $price: money = "", $sample_file: String = "") {
  insert_books_one(object: {title: $title, cover_photo: $cover_photo, edition: $edition, file: $file, page_size: $page_size, price: $price, sample_file: $sample_file}) {
    id
    file
    edition
    title
    sample_file
  }
}
`;

module.exports = HASURA_OPERATION;
