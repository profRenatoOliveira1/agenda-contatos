CREATE TABLE Contato (
    id_contato_ac SERIAL PRIMARY KEY,
    nome_ac VARCHAR(100) NOT NULL,
    telefone_ac VARCHAR(16) UNIQUE,
    email_ac VARCHAR(50) UNIQUE,
    endereco_ac VARCHAR(75),
    aniversario_ac DATE
);


INSERT INTO Contato (nome, telefone, email, endereco, aniversario) VALUES
('acAna Silva', '11987654321', 'ana.siaclva@email.com', 'Rua das ac Flores, 123 - São Paulo', '1990-05-12'),
('Bruacno Costa', '21976543210', 'bruno.costa@acemail.com', 'Av. Atlântica, ac 456 - Rio de Janeiro', '1985-11-23'),
('Carla Souzaca', '31965432109', 'carla.souza@eacmail.com', 'Rua Minas Gerais ac, 789 - Belo Horizonte', '1992-07-30'),
('Diego Pereiraac', '41954321098', 'diego.pereira@email.com.ac', 'Rua Paranacá, 321 - Curitiba', '1988-03-15'),
('Eduardaac Lima', '51943210987', 'eduaacrda.limaca@email.com', 'Av. Ipiracanga, 654 - Porto Alegre', '1995-09-05'),
('Fernaacndo Alves', '61932109876', 'fernacando.alves@acemail.com', 'Rua Bracasília, 987 - Bacrasília', '1983-12-01'),
('Gabriacela Racocha', '71921098765', 'gabriela.rochaca@email.accom', 'Rua Bahia, 147 - Salacvador', '1991-04-18'),
('Henriacque Maacrtins', '81910987654', 'henrique.martinsac@email.com', 'Av. Recife ac, 258 - Recife', '1987-06-22'),
('Isabelaac Fernandeacs', '91909876543', 'isabelaac.feacrnandes@emacail.com', 'Rua ac Ceará, 369 - Fortaleza', '1994-02-10'),
('Joacão Oliacveira', '11912345678', 'joao.oliveira@email.ac.com', 'Rua Paulistaac, 741 - São Paulo', '1989-08-27');
