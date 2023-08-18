const dbInitSql = `

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  phone_number VARCHAR(50) NOT NULL
);

-- Books
CREATE TABLE IF NOT EXISTS books(
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
);

-- Libraries
CREATE TABLE IF NOT EXISTS libraries (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Bookshelves
CREATE TABLE IF NOT EXISTS bookshelves(
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    library_id UUID NOT NULL,
    user_id UUID NOT NULL,
    organization VARCHAR(255) NOT NULL
    FOREIGN KEY (library_id) REFERENCES libraries(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS bookshelf_book(
    book_id UUID NOT NULL,
    bookshelf_id UUID NOT NULL,
    PRIMARY KEY (bookshelf_id, book_id),
    FOREIGN KEY (bookshelf_id) REFERENCES bookshelves(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS library_user (
    library_id UUID NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (library_id, user_id),
    FOREIGN KEY (library_id) REFERENCES libraries(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- User Registration
CREATE TABLE IF NOT EXISTS auth_tokens (
    id VARCHAR(255) PRIMARY KEY,
    otp_code VARCHAR(255) NOT NULL,
    expiry TIMESTAMP NOT NULL,
    retries INTEGER NOT NULL DEFAULT 3,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`