const dbInitSql = `
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
);
`