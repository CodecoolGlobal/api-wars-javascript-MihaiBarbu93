
CREATE TABLE users (
    id serial NOT NULL,
    user_name VARCHAR UNIQUE,
    password VARCHAR,
    PRIMARY KEY (id)
);

CREATE TABLE planet_votes
(
    id serial NOT NULL,
    planet_id integer,
    planet_name VARCHAR,
    user_id integer,
    submission_time timestamp without time zone,
    votes integer,
    PRIMARY KEY (id)
);

ALTER TABLE only users
    ADD CONSTRAINT pk_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT pk_id PRIMARY KEY (id);


ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);

