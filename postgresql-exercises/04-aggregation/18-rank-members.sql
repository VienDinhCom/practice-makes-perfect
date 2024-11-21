-- https://pgexercises.com/questions/aggregates/rankmembers.html

select
  mems.firstname,
  mems.surname,
  ((sum(bks.slots)+10)/20)*10 as hours,
  rank() over (order by ((sum(bks.slots)+10)/20)*10 desc) as rank
from cd.bookings bks
inner join cd.members mems using(memid)
group by bks.memid, mems.memid
order by rank, surname, firstname;