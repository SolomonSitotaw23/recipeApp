const SIGNUP_HASURA_OPERATION = `
mutation sign_up($email: String!, $fullname: String, $password: String = "") {
  insert_user_one(object: {email: $email, fullname: $fullname,  password: $password }) {
    id
    email
  fullname
    password
  }
}
`;

module.exports = SIGNUP_HASURA_OPERATION;
