--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bikes; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.bikes (
    bike_id integer NOT NULL,
    type character varying(50) NOT NULL,
    size integer NOT NULL,
    available boolean DEFAULT true NOT NULL
);


ALTER TABLE public.bikes OWNER TO freecodecamp;

--
-- Name: bikes_bike_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.bikes_bike_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bikes_bike_id_seq OWNER TO freecodecamp;

--
-- Name: bikes_bike_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.bikes_bike_id_seq OWNED BY public.bikes.bike_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    phone character varying(15) NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE public.customers OWNER TO freecodecamp;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_customer_id_seq OWNER TO freecodecamp;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- Name: rentals; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.rentals (
    rental_id integer NOT NULL,
    customer_id integer NOT NULL,
    bike_id integer NOT NULL,
    date_rented date DEFAULT now() NOT NULL,
    date_returned date
);


ALTER TABLE public.rentals OWNER TO freecodecamp;

--
-- Name: rentals_rental_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.rentals_rental_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rentals_rental_id_seq OWNER TO freecodecamp;

--
-- Name: rentals_rental_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.rentals_rental_id_seq OWNED BY public.rentals.rental_id;


--
-- Name: bikes bike_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.bikes ALTER COLUMN bike_id SET DEFAULT nextval('public.bikes_bike_id_seq'::regclass);


--
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- Name: rentals rental_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.rentals ALTER COLUMN rental_id SET DEFAULT nextval('public.rentals_rental_id_seq'::regclass);


--
-- Data for Name: bikes; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

COPY public.bikes (bike_id, type, size, available) FROM stdin;
2	Mountain	28	t
3	Mountain	29	t
4	Road	27	t
5	Road	28	t
6	Road	29	t
7	BMX	19	t
1	Mountain	27	t
8	BMX	20	t
9	BMX	21	t
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

COPY public.customers (customer_id, phone, name) FROM stdin;
1	555-5555	Me
2	000-0000	Test
3	111-1111	Vien
\.


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

COPY public.rentals (rental_id, customer_id, bike_id, date_rented, date_returned) FROM stdin;
1	1	1	2021-05-25	2021-05-27
2	1	2	2021-05-25	2024-07-23
3	1	3	2021-05-27	2024-07-23
4	1	4	2021-05-27	2024-07-23
5	1	5	2021-05-27	2024-07-23
6	2	6	2021-05-27	2024-07-23
7	2	7	2021-05-27	2024-07-23
8	3	1	2024-07-23	2024-07-23
9	3	8	2024-07-23	2024-07-23
10	3	9	2024-07-23	2024-07-23
\.


--
-- Name: bikes_bike_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.bikes_bike_id_seq', 9, true);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 3, true);


--
-- Name: rentals_rental_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.rentals_rental_id_seq', 10, true);


--
-- Name: bikes bikes_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.bikes
    ADD CONSTRAINT bikes_pkey PRIMARY KEY (bike_id);


--
-- Name: customers customers_phone_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_phone_key UNIQUE (phone);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (rental_id);


--
-- Name: rentals rentals_bike_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_bike_id_fkey FOREIGN KEY (bike_id) REFERENCES public.bikes(bike_id);


--
-- Name: rentals rentals_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);


--
-- PostgreSQL database dump complete
--

