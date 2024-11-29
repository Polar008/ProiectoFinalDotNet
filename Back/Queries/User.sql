INSERT INTO [dbo].[Users] 
    ([Name], [Email], [Password], [Photo], [DateOfBirth], [IsEnterprise], [IsCharity], [Points], [PostalCode])
VALUES
    ('User1', 'user1@example.com', 'password1', NULL, '1990-01-01', 0, 0, 100, '12345'),
    ('User2', 'user2@example.com', 'password2', NULL, '1992-02-02', 0, 0, 200, '12346'),
    ('User3', 'user3@example.com', 'password3', NULL, '1993-03-03', 1, 0, 300, '12347'),
    ('User4', 'user4@example.com', 'password4', NULL, '1994-04-04', 0, 1, 400, '12348'),
    ('User5', 'user5@example.com', 'password5', NULL, '1995-05-05', 0, 0, 500, '12349'),
    ('User6', 'user6@example.com', 'password6', NULL, '1996-06-06', 1, 0, 600, '12350'),
    ('User7', 'user7@example.com', 'password7', NULL, '1997-07-07', 0, 1, 700, '12351'),
    ('User8', 'user8@example.com', 'password8', NULL, '1998-08-08', 0, 0, 800, '12352'),
    ('User9', 'user9@example.com', 'password9', NULL, '1999-09-09', 1, 0, 900, '12353'),
    ('User10', 'user10@example.com', 'password10', NULL, '2000-10-10', 0, 1, 1000, '12354'),
    ('User11', 'user11@example.com', 'password11', NULL, '1990-11-11', 0, 0, 1100, '12355'),
    ('User12', 'user12@example.com', 'password12', NULL, '1992-12-12', 1, 0, 1200, '12356'),
    ('User13', 'user13@example.com', 'password13', NULL, '1993-01-13', 0, 1, 1300, '12357'),
    ('User14', 'user14@example.com', 'password14', NULL, '1994-02-14', 0, 0, 1400, '12358'),
    ('User15', 'user15@example.com', 'password15', NULL, '1995-03-15', 1, 0, 1500, '12359'),
    ('User16', 'user16@example.com', 'password16', NULL, '1996-04-16', 0, 1, 1600, '12360'),
    ('User17', 'user17@example.com', 'password17', NULL, '1997-05-17', 0, 0, 1700, '12361'),
    ('User18', 'user18@example.com', 'password18', NULL, '1998-06-18', 1, 0, 1800, '12362'),
    ('User19', 'user19@example.com', 'password19', NULL, '1999-07-19', 0, 1, 1900, '12363'),
    ('User20', 'user20@example.com', 'password20', NULL, '2000-08-20', 0, 0, 2000, '12364');


SELECT * FROM Users