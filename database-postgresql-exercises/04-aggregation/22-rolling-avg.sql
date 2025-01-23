-- https://pgexercises.com/questions/aggregates/rollingavg.html

with dates as (
  select generate_series(timestamp '2012-08-01', '2012-08-31', '1 day')::date as date
)

select
  date,
  (
    select
      sum(
        case
          when bks.memid=0 then facs.guestcost
          else facs.membercost
        end * bks.slots
      )
    from cd.bookings bks
    inner join cd.facilities facs using(facid)
    where
      bks.starttime > dates.date - interval '14 days'
      and bks.starttime < dates.date + interval '1 day'
  ) / 15 as revenue
from dates
order by date;
