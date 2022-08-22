const fs = require("fs");

const fileUpload = async (req, res, next) => {
  const {
    sample_file_type,
    sample_file_name,
    cover_photo_type,
    book_file_name,
    book_file_type,
    cover_photo_name,
    book_file_base64str,
    cover_photo_base64str,
    sample_file_base64str,
    comment,
    description,
    ISBN,
    edition,
    page_size,
    price,
    title,
    rating,
    author,
  } = req.body.input;

  let textfileBuffer = Buffer.from(book_file_base64str, "base64");
  let imagefileBuffer = Buffer.from(cover_photo_base64str, "base64");
  let samplefileBuffer = Buffer.from(sample_file_base64str, "base64");
  try {
    fs.writeFileSync(
      "./public/files/" + book_file_name,
      textfileBuffer,
      "base64"
    );
    fs.writeFileSync(
      "./public/files/" + cover_photo_name,
      imagefileBuffer,
      "base64"
    );
    fs.writeFileSync(
      "./public/files/" + sample_file_name,
      samplefileBuffer,
      "base64"
    );

    // insert into db
    const HASURA_MUTATION = `
        mutation ($comment: String!, $description: String!, $ISBN: String!, $edition: Int!, $page_size: Int!, $price: numeric!, $title: String!, $rating: Float!, $cover_photo: String = "", $file: String = "",$sample: String = "" ,$author_id: uuid = "") {
            insert_books_one(object: {comment: $comment, description: $description, ISBN: $ISBN, edition: $edition, page_size: $page_size, price: $price, title: $title, rating: $rating, cover_photo: $cover_photo, file: $file, sample_file: $sample , author_id: $author_id}) {
              id
            }
          }
      `;
    const variables = {
      //  file_path: "/files/" + name
      comment: comment,
      description: description,
      ISBN: ISBN,
      edition: edition,
      page_size: page_size,
      price: price,
      title: title,
      rating: rating,
      author_id: author,
      cover_photo: "/files/" + cover_photo_name,
      file: "/files/" + book_file_name,
      sample: "/files/" + sample_file_name,
    };

    // execute the parent mutation in Hasura
    const fetchResponse = await fetch("http://localhost:8080/v1/graphql", {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": "myadminsecretkey",
      },
      body: JSON.stringify({
        query: HASURA_MUTATION,
        variables,
      }),
    });
    const { data, errors } = await fetchResponse.json();
    console.log(data);

    // if Hasura operation errors, then throw error
    if (errors) {
    console.log(errors)
      return res.status(400).json({
        message: errors.message,
      });
    }

    // success
    return res.json({
      file: "/files/" + book_file_name,
      cover_photo: "/files/" + cover_photo_name,
      sample: "/files/" + sample_file_name,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = fileUpload;
