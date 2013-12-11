--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
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
-- Name: lobbies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE lobbies_id_seq OWNED BY lobbies.id;


--
-- Name: memberships; Type: TABLE; Schema: public; Owner: root; Tablespace: 
--

CREATE TABLE memberships (
    player_id integer NOT NULL,
    lobby_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.memberships OWNER TO root;

--
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
-- Name: memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE memberships_id_seq OWNED BY memberships.id;


--
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
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE players_id_seq OWNED BY players.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY lobbies ALTER COLUMN id SET DEFAULT nextval('lobbies_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY memberships ALTER COLUMN id SET DEFAULT nextval('memberships_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY players ALTER COLUMN id SET DEFAULT nextval('players_id_seq'::regclass);


--
-- Name: lobbies_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY lobbies
    ADD CONSTRAINT lobbies_pkey PRIMARY KEY (id);


--
-- Name: lobbies_title_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY lobbies
    ADD CONSTRAINT lobbies_title_key UNIQUE (title);


--
-- Name: memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- Name: memberships_player_id_lobby_id_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT memberships_player_id_lobby_id_key UNIQUE (player_id, lobby_id);


--
-- Name: players_email_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_email_key UNIQUE (email);


--
-- Name: players_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: players_username_key; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_username_key UNIQUE (username);


--
-- Name: lobbies_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY lobbies
    ADD CONSTRAINT lobbies_owner_fkey FOREIGN KEY (owner) REFERENCES players(id);


--
-- Name: player_lobby_lobby_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT player_lobby_lobby_id_fkey FOREIGN KEY (lobby_id) REFERENCES lobbies(id);


--
-- Name: player_lobby_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT player_lobby_player_id_fkey FOREIGN KEY (player_id) REFERENCES players(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
