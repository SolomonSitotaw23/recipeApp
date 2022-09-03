const SIGNUP_HASURA_OPERATION = `
mutation sign_up($email: String!, $first_name: String,$last_name: String,, $password: String = "") {
  insert_user_one(object: {email: $email, first_name: $first_name,last_name: $last_name,  password: $password }) {
    id
    email
   first_name
   last_name
    password
  }
}
`;

module.exports = SIGNUP_HASURA_OPERATION;
