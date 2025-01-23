-- https://pgexercises.com/questions/basic/date.html

select
  memid,
  surname,
  firstname,
  joindate
from cd.members
where joindate > '2012-09-01';