-- https://pgexercises.com/questions/string/case.html

select * from cd.facilities where name ilike 'tennis%';

-- OR

select * from cd.facilities where upper(name) like 'TENNIS%';