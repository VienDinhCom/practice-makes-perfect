-- https://pgexercises.com/questions/updates/updatecalculated.html

update cd.facilities 
set
  membercost = (select membercost from cd.facilities where facid=0) * 1.1,
  guestcost = (select guestcost from cd.facilities where facid=0) * 1.1
where facid=1;

-- OR

update cd.facilities fac1
  set
    membercost = fac0.membercost * 1.1,
    guestcost = fac0.guestcost * 1.1
  from (select * from cd.facilities where facid=0) fac0
where fac1.facid=1;
