CREATE DATABASE todoliste;
USE todoliste;

CREATE TABLE tache (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titre VARCHAR(255)  NULL,
    description VARCHAR(300)  NULL
);


-- cette table n'est pas utilisé
CREATE TABLE soustache (
    id_soustache INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tache_id INT NOT NULL,
    description VARCHAR(50) NOT NULL,
    FOREIGN KEY (tache_id) REFERENCES tache(id) ON DELETE CASCADE
);

INSERT INTO tache (titre, description) VALUES ('Tâche 1', 'Description de la tâche 1');
INSERT INTO tache (titre, description) VALUES ('Tâche 2', 'Description de la tâche 2');

INSERT INTO soustache (tache_id, description) VALUES (1, 'Description de la sous-tâche 1 pour la tâche 1');
INSERT INTO soustache (tache_id, description) VALUES (1, 'Description de la sous-tâche 2 pour la tâche 1');
INSERT INTO soustache (tache_id, description) VALUES (2, 'Description de la sous-tâche 1 pour la tâche 2');
INSERT INTO soustache (tache_id, description) VALUES (2, 'Description de la sous-tâche 2 pour la tâche 2');
