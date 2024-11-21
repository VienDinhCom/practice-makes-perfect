-- https://pgexercises.com/questions/date/interval2.html

select extract(epoch from '2012-09-02 00:00:00'::timestamp - '2012-08-31 01:00:00'::timestamp)::integer;