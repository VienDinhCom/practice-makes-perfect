-- https://pgexercises.com/questions/aggregates/nummembers.html

select
  row_number() over(order by joindate asc),
  firstname,
  surname
from cd.members
order by joindate;