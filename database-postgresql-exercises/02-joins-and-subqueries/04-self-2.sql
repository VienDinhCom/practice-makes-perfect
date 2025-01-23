-- https://pgexercises.com/questions/joins/self.html

select
  mems.firstname as memfname,
  mems.surname as memsname,
  recs.firstname as recfname,
  recs.surname as recsname
from cd.members mems
left join cd.members recs on mems.recommendedby = recs.memid
order by
  memsname,
  memfname;

