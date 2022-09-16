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
  mutation SIGNUP(
    $email: String
    $first_name: String
    $last_name: String
    $password: String
  ) {
    signup(
      email: $email
      first_name: $first_name
      last_name: $last_name
      password: $password
    ) {
      email
      first_name
      id
      last_name
      token
    }
  }
`;
export const GIVE_COMMENT = gql`
  mutation ADD_COMMENT(
    $author: String
    $content: String
    $recipe_id: uuid!
    $user_id: uuid!
  ) {
    insert_comment_one(
      object: {
        author: $author
        content: $content
        recipe_id: $recipe_id
        user_id: $user_id
      }
    ) {
      author
      content
      created_at
      id
      recipe_id
      user_id
    }
  }
`;

export const ALL_RECIPE = gql`
  query ALL_RECIPE($limit: Int, $offset: Int) {
    recipe(
      limit: $limit
      offset: $offset
      order_by: { created_at: asc_nulls_last }
    ) {
      created_at
      description
      food_category
      id
      average_rating
      preparation_time
      ingredients {
        ingredients
      }
      title
      user_id
      user_who_likes_aggregate {
        aggregate {
          count
        }
      }
      user_who_likes {
        user_id
      }
      imagesByRecipeId {
        thumbnail_index
        urls
      }
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
      ratings {
        rating
      }
      comments {
        author
        content
        created_at
        id
        user_id
        recipe_id
      }
    }
  }
`;
export const COMMENTS = gql`
  query COMMENTS($recipe_id: uuid) {
    comment(where: { recipe_id: { _eq: $recipe_id } }) {
      author
      content
      created_at
      id
      recipe_id
      user_id
    }
  }
`;
export const INSERT_RECIPE_AFTER_IMAGE_UPLOAD = gql`
  mutation INSERT_RECIPE_AFTER_IMAGE_UPLOAD(
    $description: String
    $food_category: String
    $preparation_time: String
    $title: String
    $ingredients: String
    $Steps: String
    $urls: String
    $thumbnail_index: Int
    $user_id: uuid
  ) {
    insert_images_one(
      object: {
        recipe: {
          data: {
            description: $description
            food_category: $food_category
            preparation_time: $preparation_time
            title: $title
            ingredients: { data: { ingredients: $ingredients } }
            steps: { data: { steps: $Steps } }
            user_id: $user_id
          }
        }
        urls: $urls
        thumbnail_index: $thumbnail_index
      }
    ) {
      id
      recipe_id
      thumbnail_index
      urls
      recipe {
        created_at
        description
        id
        food_category
        preparation_time
        title
        user_id
        ingredients {
          id
          ingredients
          recipe_id
        }
        steps {
          id
          recipe_id
          steps
        }
        user_who_likes_aggregate {
          aggregate {
            count
          }
        }
        user_who_likes {
          user_id
        }
        imagesByRecipeId {
          thumbnail_index
          urls
        }
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
export const NUMBER_OF_LIKES = gql`
  query NUMBER_OF_LIKES($recipe_id: uuid!) {
    likes_aggregate(where: { recipe_id: { _eq: $recipe_id } }) {
      aggregate {
        count(columns: user_id, distinct: true)
      }
    }
  }
`;
export const IS_LIKED = gql`
  query IS_LIKED($recipe_id: uuid!, $user_id: uuid!) {
    likes(
      where: { recipe_id: { _eq: $recipe_id }, user_id: { _eq: $user_id } }
    ) {
      id
      recipe_id
      user_id
    }
  }
`;
export const INSERT_LIKE = gql`
  mutation INSERT_LIKE($recipe_id: uuid!, $user_id: uuid!) {
    insert_likes(objects: { recipe_id: $recipe_id, user_id: $user_id }) {
      returning {
        id
        user_id
        recipe_id
      }
    }
  }
`;

export const UNLIKE = gql`
  mutation UNLIKE($recipe_id: uuid!, $user_id: uuid!) {
    delete_likes(
      where: { recipe_id: { _eq: $recipe_id }, user_id: { _eq: $user_id } }
    ) {
      returning {
        id
        user_id
        recipe_id
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation ADD_TO_FAVORITES($recipe_id: uuid, $user_id: uuid) {
    insert_favorites_one(object: { recipe_id: $recipe_id, user_id: $user_id }) {
      created_at
      id
      recipe_id
      user_id
    }
  }
`;
export const MY_FAVORITES = gql`
  query MY_FAVORITES {
    favorites {
      id
      recipe {
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
        user_who_likes_aggregate {
          aggregate {
            count
          }
        }
        user_who_likes {
          user_id
        }
        imagesByRecipeId {
          thumbnail_index
          urls
        }
      }
    }
  }
`;
export const FAVORITES_WITH_RECIPE_ID = gql`
  query FAVORITES_WITH_RECIPE_ID($recipe_id: uuid) {
    favorites(where: { recipe_id: { _eq: $recipe_id } }) {
      user_id
      recipe_id
      created_at
      id
    }
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation REMOVE_FROM_FAVORITES($recipe_id: uuid!, $user_id: uuid!) {
    delete_favorites(
      where: { recipe_id: { _eq: $recipe_id }, user_id: { _eq: $user_id } }
    ) {
      affected_rows
      returning {
        id
        recipe_id
        user_id
      }
    }
  }
`;

export const SEARCH_RECIPE = gql`
  query SEARCH_RECIPE($keyword: String) {
    search_recipe(args: { search: $keyword }) {
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
      user_who_likes_aggregate {
        aggregate {
          count
        }
      }
      user_who_likes {
        user_id
      }
      imagesByRecipeId {
        thumbnail_index
        urls
      }
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DELETE_RECIPE($recipe_id: uuid!) {
    delete_recipe_by_pk(id: $recipe_id) {
      id
    }
  }
`;
export const RATE_RECIPE = gql`
  mutation RATE_RECIPE($recipe_id: uuid, $user_id: uuid!, $rating: float8) {
    insert_rating(
      objects: { recipe_id: $recipe_id, user_id: $user_id, rating: $rating }
    ) {
      returning {
        rating
        recipe_id
        user_id
        recipe {
          average_rating
        }
      }
    }
  }
`;

export const UPDATE_RATING_RECIPE = gql`
  mutation UPDATE_RATING_RECIPE(
    $recipe_id: uuid
    $user_id: uuid!
    $rating: float8
  ) {
    update_rating(
      where: { recipe_id: { _eq: $recipe_id }, user_id: { _eq: $user_id } }
      _set: { rating: $rating }
    ) {
      returning {
        rating
        recipe_id
        user_id
        recipe {
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
          ratings {
            rating
          }
          comments {
            author
            content
            created_at
            id
            user_id
            recipe_id
          }
        }
      }
    }
  }
`;
export const IS_RATED = gql`
  query IS_RATED($recipe_id: uuid!) {
    recipe_by_pk(id: $recipe_id) {
      is_rated
    }
  }
`;
