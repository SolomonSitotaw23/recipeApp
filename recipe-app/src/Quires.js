import gql from "graphql-tag";

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      fullname
      id
      password
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation SIGNUP($email: String!, $fullname: String!, $password: String!) {
    signup(email: $email, fullname: $fullname, password: $password) {
      email
      fullname
      token
    }
  }
`;

export const INSERTFOOD = gql`
  mutation INSERTFOOD(
    $title: String!
    $description: String!
    $image: String!
    $timeItTakes: String!
    $userId: uuid!
  ) {
    insert_food(
      objects: {
        title: $title
        description: $description
        image: $image
        timeItTakes: $timeItTakes
        userId: $userId
      }
    ) {
      returning {
        id
        image
        timeItTakes
        title
        userId
        description
      }
    }
  }
`;

export const ALLFOODS = gql`
  query ALLFOODS {
    food {
      description
      id
      image
      timeItTakes
      title
    }
  }
`;
export const ONE_FOOD = gql`
  query ONE_FOOD($id: uuid!) {
    food_by_pk(id: $id) {
      description
      id
      image
      timeItTakes
      title
    }
  }
`;
