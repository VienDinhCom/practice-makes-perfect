-- https://pgexercises.com/questions/date/utilisationpermonth.html

with subquery as (
  select
    facs.name,
    date_trunc('month', bks.starttime) as month,
    sum(slots) as slots,
	  (date_trunc('month', bks.starttime) + interval '1 month' - date_trunc('month', bks.starttime)) as days
  from cd.bookings bks
  inner join cd.facilities facs using(facid)
  group by bks.facid, facs.facid, month
)

select
  name,
  month,
  round(slots * 100 / (25 * (extract(epoch from days) / 60 / 60 / 24)), 1) as utilisation
from subquery
order by name, month;