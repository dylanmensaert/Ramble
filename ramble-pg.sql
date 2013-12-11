--
-- PostgreSQL database dump
--

-- Dumped from database version 9.1.10
-- Dumped by pg_dump version 9.1.10
-- Started on 2013-12-11 13:12:54 CET

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 167 (class 3079 OID 11679)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1927 (class 0 OID 0)
-- Dependencies: 167
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 161 (class 1259 OID 16387)
-- Dependencies: 5
-- Name: lobbies; Type: TABLE; Schema: public; Owner: root; Tablespace: 
--

CREATE TABLE lobbies (
    title character varying(50) NOT NULL,
    password character varying NOT NULL,
    "maxMembers" integer NOT NULL,
    owner integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.lobbies OWNER TO root;

--
-- TOC entry 162 (class 1259 OID 16411)
-- Dependencies: 5 161
-- Name: lobbies_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE lobbies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lobbies_id_seq OWNER TO root;

--
-- TOC entry 1928 (class 0 OID 0)
-- Dependencies: 162
-- Name: lobbies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE lobbies_id_seq OWNED BY lobbies.id;


--
-- TOC entry 165 (class 1259 OID 16446)
-- Dependencies: 5
-- Name: memberships; Type: TABLE; Schema: public; Owner: root; Tablespace: 
--

CREATE TABLE memberships (
    player_id integer NOT NULL,
    lobby_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.memberships OWNER TO root;

--
-- TOC entry 166 (class 1259 OID 16556)
-- Dependencies: 165 5
-- Name: memberships_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE memberships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.memberships_id_seq OWNER TO root;

--
-- TOC entry 1929 (class 0 OID 0)
-- Dependencies: 166
-- Name: memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE memberships_id_seq OWNED BY memberships.id;


--
-- TOC entry 164 (class 1259 OID 16437)
-- Dependencies: 5
-- Name: players; Type: TABLE; Schema: public; Owner: root; Tablespace: 
--

CREATE TABLE players (
    username character varying(50) NOT NULL,
    password character varying NOT NULL,
    email character varying(50) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.players OWNER TO root;

--
-- TOC entry 163 (class 1259 OID 16435)
-- Dependencies: 5 164
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.players_id_seq OWNER TO root;

--
-- TOC entry 1930 (class 0 OID 0)
-- Dependencies: 163
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE players_id_seq OWNED BY players.id;


--
-- TOC entry 1799 (class 2604 OID 16413)
-- Dependencies: 162 161
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY lobbies ALTER COLUMN id SET DEFAULT nextval('lobbies_id_seq'::regclass);


--
-- TOC entry 1801 (class 2604 OID 16558)
-- Dependencies: 166 165
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY memberships ALTER COLUMN id SET DEFAULT nextval('memberships_id_seq'::regclass);


--
-- TOC entry 1800 (class 2604 OID 16440)
-- Dependencies: 163 164 164
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY players ALTER COLUMN id SET DEFAULT nextval('players_id_seq'::regclass);


--
-- TOC entry 1803 (class 2606 OID 16422)
-- Dependencies: 161 161 1921
-- Name: lobbies_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY lobbies
    ADD CONSTRAINT lobbies_pkey PRIMARY KEY (id);


--
-- TOC entry 1805 (class 2606 OID 16396)
-- Dependencies: 161 161 1921
-- Name: lobbies_title_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY lobbies
    ADD CONSTRAINT lobbies_title_key UNIQUE (title);


--
-- TOC entry 1813 (class 2606 OID 16584)
-- Dependencies: 165 165 1921
-- Name: memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- TOC entry 1815 (class 2606 OID 16586)
-- Dependencies: 165 165 165 1921
-- Name: memberships_player_id_lobby_id_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT memberships_player_id_lobby_id_key UNIQUE (player_id, lobby_id);


--
-- TOC entry 1807 (class 2606 OID 16454)
-- Dependencies: 164 164 1921
-- Name: players_email_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_email_key UNIQUE (email);


--
-- TOC entry 1809 (class 2606 OID 16445)
-- Dependencies: 164 164 1921
-- Name: players_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- TOC entry 1811 (class 2606 OID 16450)
-- Dependencies: 164 164 1921
-- Name: players_username_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_username_key UNIQUE (username);


--
-- TOC entry 1816 (class 2606 OID 16541)
-- Dependencies: 161 164 1808 1921
-- Name: lobbies_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY lobbies
    ADD CONSTRAINT lobbies_owner_fkey FOREIGN KEY (owner) REFERENCES players(id);


--
-- TOC entry 1817 (class 2606 OID 16573)
-- Dependencies: 161 165 1802 1921
-- Name: player_lobby_lobby_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT player_lobby_lobby_id_fkey FOREIGN KEY (lobby_id) REFERENCES lobbies(id);


--
-- TOC entry 1818 (class 2606 OID 16578)
-- Dependencies: 164 1808 165 1921
-- Name: player_lobby_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT player_lobby_player_id_fkey FOREIGN KEY (player_id) REFERENCES players(id);


--
-- TOC entry 1926 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2013-12-11 13:12:54 CET

--
-- PostgreSQL database dump complete
--
