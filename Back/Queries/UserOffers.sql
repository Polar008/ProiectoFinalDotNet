INSERT INTO [dbo].[UserOffers] 
    ([UserId], [OfferId])
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 7),
    (7, 8),
    (8, 9),
    (9, 10),
    (10, 1);

-- Verifica las inserciones
SELECT * FROM UserOffers;

UPDATE Users
SET Points = Points + 5
WHERE Id IN (1, 2, 3, 4);


SELECT * FROM Users