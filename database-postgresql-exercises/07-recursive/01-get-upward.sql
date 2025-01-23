-- https://pgexercises.com/questions/recursive/getupward.html

with recursive recommenders as (
  select
    mems.recommendedby as recid
  from cd.members mems
  where mems.memid = 27

  union all

  select
    mems.recommendedby as recid
  from recommenders recs
  inner join cd.members mems on recs.recid = mems.memid
)

select
  recs.recid,
  mems.firstname,
  mems.surname
from recommenders recs
inner join cd.members mems on recid = memid;