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

export const ALL_RECIPE = gql`
  query ALL_RECIPE($limit: Int, $offset: Int) {
    recipe(limit: $limit, offset: $offset) {
      created_at
      description
      food_category
      id
      preparation_time
      ingredients {
        ingredients
      }
      title
      user_id
    }
    steps {
      steps
    }
  }
`;
export const ONE_RECIPE = gql`
  query ONE_RECIPE($id: uuid!) {
    recipe_by_pk(id: $id) {
      created_at
      description
      food_category
      id
      ingredients {
        ingredients
      }
      preparation_time
      steps {
        steps
      }
      title
      user_id
      imagesByRecipeId {
        thumbnail_index
        urls
      }
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
