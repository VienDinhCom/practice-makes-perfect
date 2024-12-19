-- https://pgexercises.com/questions/aggregates/classify.html

with subquery as (
  select
    facs.name,
    ntile(3) over(order by sum(case when memid=0 then facs.guestcost else facs.membercost end * slots) desc) as class
  from cd.bookings bks
  inner join cd.facilities facs using(facid)
  group by facs.facid, bks.facid
)

select
  name,
  case
    when class=1 then 'high'
    when class=2 then 'average'
    else 'low'
  end as revenue
from subquery
order by class, name;