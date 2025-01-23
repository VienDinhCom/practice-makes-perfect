-- https://pgexercises.com/questions/recursive/getupwardall.html

with recursive recommenders as (
  select
    mems.memid,
    mems.recommendedby as recid
  from cd.members mems

  union all

  select
    recs.memid,
    mems.recommendedby as recid
  from recommenders recs
  inner join cd.members mems on recs.recid = mems.memid
)

select
  recs.memid,
  recs.recid,
  mems.firstname,
  mems.surname
from recommenders recs
inner join cd.members mems on recs.recid = mems.memid
where recs.memid = 12 or recs.memid = 22
order by memid, recid desc;
