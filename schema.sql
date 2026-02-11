--
-- PostgreSQL database dump
--

\restrict qzPIts1vD3EQ4pTz819VxSBInVgvcechld44TYeCOiPZakAY5CSajUFkPiFxf4a

-- Dumped from database version 18.1 (Ubuntu 18.1-1.pgdg22.04+2)
-- Dumped by pg_dump version 18.1 (Ubuntu 18.1-1.pgdg22.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: appointment_status; Type: TYPE; Schema: public; Owner: hashpatal
--

CREATE TYPE public.appointment_status AS ENUM (
    'SCHEDULED',
    'COMPLETED',
    'CANCELLED',
    'DIDNTSHOW'
);


ALTER TYPE public.appointment_status OWNER TO hashpatal;

--
-- Name: role; Type: TYPE; Schema: public; Owner: hashpatal
--

CREATE TYPE public.role AS ENUM (
    'ADMIN',
    'DOCTOR',
    'LAB_NURSE',
    'LAB_TECHNICIAN',
    'PATIENT'
);


ALTER TYPE public.role OWNER TO hashpatal;

--
-- Name: schedulable_type; Type: TYPE; Schema: public; Owner: hashpatal
--

CREATE TYPE public.schedulable_type AS ENUM (
    'DOCTOR'
);


ALTER TYPE public.schedulable_type OWNER TO hashpatal;

--
-- Name: weekday_type; Type: TYPE; Schema: public; Owner: hashpatal
--

CREATE TYPE public.weekday_type AS ENUM (
    'SATURDAY',
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY'
);


ALTER TYPE public.weekday_type OWNER TO hashpatal;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: academic_record; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.academic_record (
    id integer NOT NULL,
    "doctorProfileId" integer NOT NULL,
    degree text NOT NULL,
    institute text NOT NULL,
    year date NOT NULL
);


ALTER TABLE public.academic_record OWNER TO hashpatal;

--
-- Name: academic_record_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.academic_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.academic_record_id_seq OWNER TO hashpatal;

--
-- Name: academic_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.academic_record_id_seq OWNED BY public.academic_record.id;


--
-- Name: appointment; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.appointment (
    id integer NOT NULL,
    "schedulableId" integer NOT NULL,
    "startTime" time without time zone NOT NULL,
    "endTime" time without time zone NOT NULL,
    "slotDurationMinutes" integer NOT NULL,
    status public.appointment_status NOT NULL
);


ALTER TABLE public.appointment OWNER TO hashpatal;

--
-- Name: appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointment_id_seq OWNER TO hashpatal;

--
-- Name: appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;


--
-- Name: doctor_experience; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.doctor_experience (
    id integer NOT NULL,
    "doctorProfileId" integer NOT NULL,
    "startYear" date NOT NULL,
    "endYear" date,
    title text NOT NULL,
    organization text NOT NULL,
    location text
);


ALTER TABLE public.doctor_experience OWNER TO hashpatal;

--
-- Name: doctor_experience_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.doctor_experience_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_experience_id_seq OWNER TO hashpatal;

--
-- Name: doctor_experience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.doctor_experience_id_seq OWNED BY public.doctor_experience.id;


--
-- Name: doctor_profile; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.doctor_profile (
    id integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.doctor_profile OWNER TO hashpatal;

--
-- Name: doctor_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.doctor_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_profile_id_seq OWNER TO hashpatal;

--
-- Name: doctor_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.doctor_profile_id_seq OWNED BY public.doctor_profile.id;


--
-- Name: override_routine; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.override_routine (
    id integer NOT NULL,
    date date NOT NULL,
    "weekDay" public.weekday_type NOT NULL,
    "startTime" time without time zone NOT NULL,
    "endTime" time without time zone NOT NULL,
    "schedulableId" integer NOT NULL
);


ALTER TABLE public.override_routine OWNER TO hashpatal;

--
-- Name: override_routine_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.override_routine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.override_routine_id_seq OWNER TO hashpatal;

--
-- Name: override_routine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.override_routine_id_seq OWNED BY public.override_routine.id;


--
-- Name: refresh_token; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.refresh_token (
    id integer NOT NULL,
    jit uuid NOT NULL,
    "tokenHash" text CONSTRAINT refresh_token_token_hash_not_null NOT NULL,
    "expiresAt" timestamp without time zone CONSTRAINT refresh_token_expires_at_not_null NOT NULL,
    "userId" integer CONSTRAINT refresh_token_user_id_not_null NOT NULL
);


ALTER TABLE public.refresh_token OWNER TO hashpatal;

--
-- Name: refresh_token_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.refresh_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_token_id_seq OWNER TO hashpatal;

--
-- Name: refresh_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.refresh_token_id_seq OWNED BY public.refresh_token.id;


--
-- Name: regular_routine; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.regular_routine (
    id integer NOT NULL,
    "weekDay" public.weekday_type NOT NULL,
    "startTime" time without time zone NOT NULL,
    "endTime" time without time zone NOT NULL,
    "schedulableId" integer NOT NULL
);


ALTER TABLE public.regular_routine OWNER TO hashpatal;

--
-- Name: regular_routine_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.regular_routine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.regular_routine_id_seq OWNER TO hashpatal;

--
-- Name: regular_routine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.regular_routine_id_seq OWNED BY public.regular_routine.id;


--
-- Name: schedulable; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.schedulable (
    id integer NOT NULL,
    "entityId" integer NOT NULL,
    type public.schedulable_type NOT NULL,
    "slotDurationMinutes" integer NOT NULL
);


ALTER TABLE public.schedulable OWNER TO hashpatal;

--
-- Name: schedulable_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.schedulable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schedulable_id_seq OWNER TO hashpatal;

--
-- Name: schedulable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.schedulable_id_seq OWNED BY public.schedulable.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    "passwordHash" text CONSTRAINT user_passwordhash_not_null NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    "birthDate" date CONSTRAINT user_birthdate_not_null NOT NULL
);


ALTER TABLE public."user" OWNER TO hashpatal;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO hashpatal;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_role; Type: TABLE; Schema: public; Owner: hashpatal
--

CREATE TABLE public.user_role (
    id integer NOT NULL,
    role public.role NOT NULL,
    "userId" integer CONSTRAINT user_role_userid_not_null NOT NULL
);


ALTER TABLE public.user_role OWNER TO hashpatal;

--
-- Name: user_role_id_seq; Type: SEQUENCE; Schema: public; Owner: hashpatal
--

CREATE SEQUENCE public.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_role_id_seq OWNER TO hashpatal;

--
-- Name: user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hashpatal
--

ALTER SEQUENCE public.user_role_id_seq OWNED BY public.user_role.id;


--
-- Name: academic_record id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.academic_record ALTER COLUMN id SET DEFAULT nextval('public.academic_record_id_seq'::regclass);


--
-- Name: appointment id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);


--
-- Name: doctor_experience id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.doctor_experience ALTER COLUMN id SET DEFAULT nextval('public.doctor_experience_id_seq'::regclass);


--
-- Name: doctor_profile id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.doctor_profile ALTER COLUMN id SET DEFAULT nextval('public.doctor_profile_id_seq'::regclass);


--
-- Name: override_routine id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.override_routine ALTER COLUMN id SET DEFAULT nextval('public.override_routine_id_seq'::regclass);


--
-- Name: refresh_token id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.refresh_token ALTER COLUMN id SET DEFAULT nextval('public.refresh_token_id_seq'::regclass);


--
-- Name: regular_routine id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.regular_routine ALTER COLUMN id SET DEFAULT nextval('public.regular_routine_id_seq'::regclass);


--
-- Name: schedulable id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.schedulable ALTER COLUMN id SET DEFAULT nextval('public.schedulable_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_role id; Type: DEFAULT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.user_role ALTER COLUMN id SET DEFAULT nextval('public.user_role_id_seq'::regclass);


--
-- Name: academic_record academic_record_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.academic_record
    ADD CONSTRAINT academic_record_pkey PRIMARY KEY (id);


--
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);


--
-- Name: doctor_experience doctor_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.doctor_experience
    ADD CONSTRAINT doctor_experience_pkey PRIMARY KEY (id);


--
-- Name: doctor_profile doctor_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.doctor_profile
    ADD CONSTRAINT doctor_profile_pkey PRIMARY KEY (id);


--
-- Name: doctor_profile doctor_profile_userId_unique; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.doctor_profile
    ADD CONSTRAINT "doctor_profile_userId_unique" UNIQUE ("userId");


--
-- Name: override_routine override_routine_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.override_routine
    ADD CONSTRAINT override_routine_pkey PRIMARY KEY (id);


--
-- Name: refresh_token refresh_token_jit_unique; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT refresh_token_jit_unique UNIQUE (jit);


--
-- Name: refresh_token refresh_token_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT refresh_token_pkey PRIMARY KEY (id);


--
-- Name: refresh_token refresh_token_tokenHash_unique; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT "refresh_token_tokenHash_unique" UNIQUE ("tokenHash");


--
-- Name: regular_routine regular_routine_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.regular_routine
    ADD CONSTRAINT regular_routine_pkey PRIMARY KEY (id);


--
-- Name: schedulable schedulable_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.schedulable
    ADD CONSTRAINT schedulable_pkey PRIMARY KEY (id);


--
-- Name: user user_email_unique; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_composite_pk; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_composite_pk UNIQUE ("userId", role);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- Name: user user_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_uuid_unique UNIQUE (uuid);


--
-- Name: academic_record academic_record_doctorProfileId_doctor_profile_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.academic_record
    ADD CONSTRAINT "academic_record_doctorProfileId_doctor_profile_id_fk" FOREIGN KEY ("doctorProfileId") REFERENCES public.doctor_profile(id) ON DELETE CASCADE;


--
-- Name: appointment appointment_schedulableId_schedulable_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "appointment_schedulableId_schedulable_id_fk" FOREIGN KEY ("schedulableId") REFERENCES public.schedulable(id) ON DELETE CASCADE;


--
-- Name: doctor_experience doctor_experience_doctorProfileId_doctor_profile_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.doctor_experience
    ADD CONSTRAINT "doctor_experience_doctorProfileId_doctor_profile_id_fk" FOREIGN KEY ("doctorProfileId") REFERENCES public.doctor_profile(id) ON DELETE CASCADE;


--
-- Name: doctor_profile doctor_profile_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.doctor_profile
    ADD CONSTRAINT "doctor_profile_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: override_routine override_routine_schedulableId_schedulable_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.override_routine
    ADD CONSTRAINT "override_routine_schedulableId_schedulable_id_fk" FOREIGN KEY ("schedulableId") REFERENCES public.schedulable(id) ON DELETE CASCADE;


--
-- Name: refresh_token refresh_token_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT "refresh_token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: regular_routine regular_routine_schedulableId_schedulable_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.regular_routine
    ADD CONSTRAINT "regular_routine_schedulableId_schedulable_id_fk" FOREIGN KEY ("schedulableId") REFERENCES public.schedulable(id) ON DELETE CASCADE;


--
-- Name: user_role user_role_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hashpatal
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT "user_role_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO hashpatal;


--
-- PostgreSQL database dump complete
--

\unrestrict qzPIts1vD3EQ4pTz819VxSBInVgvcechld44TYeCOiPZakAY5CSajUFkPiFxf4a

