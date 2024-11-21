-- https://pgexercises.com/questions/basic/where2.html

select facid, name, membercost, monthlymaintenance from cd.facilities
where membercost > 0 and membercost < (monthlymaintenance / 50);