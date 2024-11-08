-- https://pgexercises.com/questions/joins/sub.html

select distinct
  mems.firstname || ' ' || mems.surname as member,
  (select recs.firstname || ' ' || recs.surname from cd.members recs where mems.recommendedby = recs.memid) as recommender
from cd.members as mems
order by member, recommender;