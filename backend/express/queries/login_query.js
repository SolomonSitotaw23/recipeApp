// Login Query
const LOGIN_HASURA_OPERATION = `
query login($email: String!){
  user(where: {email: {_eq: $email}}){
		id
    email
    password
   first_name
   last_name
  }
}
`;

module.exports = LOGIN_HASURA_OPERATION;
