CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS advertisement (
    advertisement_id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    view_count BIGINT DEFAULT 0,
    contact_count BIGINT DEFAULT 0,
    like_count BIGINT DEFAULT 0,
    image BYTEA,
    embedding vector(1536),
    car_id BIGINT NOT NULL UNIQUE,
    user_id BIGINT NOT NULL
);
