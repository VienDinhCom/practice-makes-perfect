-- https://pgexercises.com/questions/updates/updatemultiple.html

update cd.facilities
set membercost=6, guestcost=30
where facid in (0, 1);