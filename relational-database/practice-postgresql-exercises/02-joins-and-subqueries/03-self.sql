-- https://pgexercises.com/questions/joins/self.html

select distinct
  recs.firstname,
  recs.surname
from cd.members mems 
inner join cd.members recs on mems.recommendedby = recs.memid
order by recs.surname, recs.firstname;