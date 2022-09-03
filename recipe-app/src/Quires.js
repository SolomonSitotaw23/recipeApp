import gql from "graphql-tag";

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      first_name
      last_name
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
      first_name
      last_name
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

export const INSERT_RECIPE = gql`
  mutation INSERT_RECIPE(
    $title: String!
    $description: String!
    $category: String!
    $ingredients: String!
    $preparation_time: String!
    $steps: String!
  ) {
    insert_recipe_one(
      object: {
        description: $description
        food_category: $category
        preparation_time: $preparation_time
        title: $title
        ingredients: { data: { ingredients: $ingredients } }
        steps: { data: { steps: $steps } }
      }
    ) {
      created_at
      description
      food_category
      id
      ingredients {
        ingredients
        id
        recipe_id
      }
      preparation_time
      steps {
        steps
        id
        recipe_id
      }
      title
      user_id
    }
  }
`;
