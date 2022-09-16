CREATE OR REPLACE FUNCTION IS_LIKED (recipe_row recipe, hasura_session json)
RETURNS boolean AS $$
SELECT EXISTS (
    SELECT 1
    FROM likes A
    WHERE A.user_id = CAST((hasura_session ->> 'x-hasura-user-id') as UUID)  AND A.recipe_id = recipe_row.id
);
$$ LANGUAGE sql STABLE;
