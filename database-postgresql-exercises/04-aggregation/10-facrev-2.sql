-- https://pgexercises.com/questions/aggregates/facrev2.html

select
  name,
  sum(slots * (case when bks.memid=0 then facs.guestcost else facs.membercost end)) as revenue
from cd.facilities facs
inner join cd.bookings bks using(facid)
group by facs.facid, bks.facid having sum(slots * (case when bks.memid=0 then facs.guestcost else facs.membercost end)) < 1000
order by revenue;

-- OR

with revenue as (
  select
    name,
    sum(slots * (case when bks.memid=0 then facs.guestcost else facs.membercost end)) as revenue
  from cd.facilities facs
  inner join cd.bookings bks using(facid)
  group by facs.facid, bks.facid
  order by revenue
)

select * from revenue where revenue < 1000;