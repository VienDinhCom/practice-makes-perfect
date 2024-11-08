-- https://pgexercises.com/questions/joins/simplejoin.html

select starttime from cd.bookings bks
inner join cd.members mems using(memid)
where mems.firstname = 'David' and mems.surname = 'Farrell';

-- OR

select bks.starttime from cd.bookings bks, cd.members mems
where mems.firstname='David'
      and mems.surname='Farrell'
      and mems.memid = bks.memid;