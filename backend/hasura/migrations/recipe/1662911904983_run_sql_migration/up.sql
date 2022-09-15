CREATE FUNCTION search_recipe(search text)
RETURNS SETOF recipe AS $$
    SELECT *
    FROM recipe
    WHERE
      title ilike ('%' || search || '%')
      OR description ilike ('%' || search || '%')
$$ LANGUAGE sql STABLE;
