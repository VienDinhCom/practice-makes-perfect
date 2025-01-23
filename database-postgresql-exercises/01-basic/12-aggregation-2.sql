-- https://pgexercises.com/questions/basic/agg2.html

select
  firstname,
  surname,
  joindate
from cd.members
order by joindate desc
limit 1;

-- OR

select
  firstname,
  surname,
  joindate
from cd.members
where joindate = (select max(joindate) from cd.members);