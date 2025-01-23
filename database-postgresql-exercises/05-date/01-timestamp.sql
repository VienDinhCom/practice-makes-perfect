-- https://pgexercises.com/questions/date/timestamp.html

select '2012-08-31 01:00:00'::timestamp;

-- OR

select timestamp '2012-08-31 01:00:00';

-- OR

select cast('2012-08-31 01:00:00' as timestamp);
