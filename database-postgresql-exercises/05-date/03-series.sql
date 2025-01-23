-- https://pgexercises.com/questions/date/series.html

select generate_series('2012-10-01'::timestamp, timestamp '2012-10-31', interval '1 day');