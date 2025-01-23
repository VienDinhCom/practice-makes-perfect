-- https://pgexercises.com/questions/recursive/getdownward.html

with recursive recommendeds as (
  select
    mems.memid as memid
  from cd.members mems
  where mems.recommendedby = 1

  union all

  select
    mems.memid as memid
  from recommendeds recs
  inner join cd.members mems on mems.recommendedby = recs.memid
)

select
  recs.memid,
  firstname,
  surname
from recommendeds recs
inner join cd.members using (memid)
order by recs.memid;
