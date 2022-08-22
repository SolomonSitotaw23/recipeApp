// Login Query
const LOGIN_HASURA_OPERATION = `
query login($email: String!){
  user(where: {email: {_eq: $email}}){
		id
    email
    password
   fullname
  }
}
`;

module.exports = LOGIN_HASURA_OPERATION;
