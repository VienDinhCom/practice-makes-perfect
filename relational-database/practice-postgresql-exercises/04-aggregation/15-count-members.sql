-- https://pgexercises.com/questions/aggregates/countmembers.html

select
  count(*) over(),
  firstname,
  surname
from cd.members
order by joindate;

-- OR

select
  (select count(*) from cd.members),
  firstname,
  surname
from cd.members
order by joindate;