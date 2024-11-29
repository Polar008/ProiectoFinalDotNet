INSERT INTO [dbo].[Rewards] 
    ([ShopOfferId], [ReedemableCode], [UserId])
VALUES
    (1, 'REWARD001', 1),
    (2, 'REWARD002', 2),
    (3, 'REWARD003', 3),
    (4, 'REWARD004', 4),
    (5, 'REWARD005', 5),
    (6, 'REWARD006', 6),
    (7, 'REWARD007', 7),
    (8, 'REWARD008', 8),
    (9, 'REWARD009', 9),
    (10, 'REWARD010', 10);

-- Verifica las inserciones
SELECT * FROM Rewards;
