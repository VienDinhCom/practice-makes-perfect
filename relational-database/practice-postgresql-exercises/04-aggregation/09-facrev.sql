-- https://pgexercises.com/questions/aggregates/facrev.html


select
  name,
  sum(slots * (case when bks.memid=0 then facs.guestcost else facs.membercost end)) as revenue
from cd.facilities facs
inner join cd.bookings bks using(facid)
group by facs.facid, bks.facid
order by revenue;