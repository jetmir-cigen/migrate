export const sql = `
-- query_name = find_users
select
	u.id,
  u.username
from
	control.user u
where
	id = 9061`;
