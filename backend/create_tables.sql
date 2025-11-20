CREATE DATABASE ehealth_db;
USE ehealth_db;

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    code VARCHAR(20),
    salon VARCHAR(15)
);

CREATE TABLE readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    heart_rate INT,
    temperature FLOAT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    message VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

INSERT INTO patients (name, age, code, salon) VALUES
("Ana", 25, "Pacient001", "Salon 3"),
("Mihai", 60, "Pacient002", "Salon 9"),
("Radu", 47, "Pacient003", "Salon 1"),
("Catalina", 32, "Pacient004", "Salon 12");

INSERT INTO readings (patient_id, heart_rate, temperature) VALUES
(1, 85, 36.7),
(1, 90, 37.1),
(2, 70, 36.5),
(2, 100, 38.2),
(3, 75, 36.8);

INSERT INTO alerts (patient_id, message) VALUES
(1, "Temperatura ridicata"),
(2, "Puls anormal"),
(3, "Hipotermie"),
(2, "Puls foarte ridicat");