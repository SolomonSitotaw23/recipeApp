CREATE OR REPLACE FUNCTION IS_LIKED (recipe_row recipe, hasura_session json)
RETURNS boolean AS $$
SELECT EXISTS (
    SELECT 1
    FROM likes RES
    WHERE RES.user_id = CAST((hasura_session ->> 'x-hasura-user-id') as UUID)  AND RES.recipe_id = recipe_row.id
);
$$ LANGUAGE sql STABLE;
