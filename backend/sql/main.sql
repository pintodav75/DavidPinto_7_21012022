
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'ubuntu';
flush privileges;

use groupomania;

DROP table if EXISTS users;
CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    age INT
);

