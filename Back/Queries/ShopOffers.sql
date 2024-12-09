INSERT INTO [dbo].[ShopOffers] 
    ([Cost], [Title], [Description])
VALUES
    (500, 'Gift Card', 'A $50 gift card for popular stores.'),
    (300, 'Movie Tickets', 'Two tickets to any movie of your choice.'),
    (800, 'Fitness Tracker', 'A fitness tracker to help you stay healthy.'),
    (1000, 'Bluetooth Headphones', 'High-quality wireless headphones.'),
    (200, 'Coffee Mug', 'A stylish coffee mug with a unique design.'),
    (150, 'Keychain', 'A custom keychain to personalize your style.'),
    (750, 'Backpack', 'A durable and spacious backpack for daily use.'),
    (400, 'Water Bottle', 'A leak-proof water bottle for your adventures.'),
    (600, 'Wireless Mouse', 'A comfortable and reliable wireless mouse.'),
    (900, 'Portable Charger', 'A high-capacity portable charger for your devices.');

-- Verifica las inserciones
-- SELECT * FROM ShopOffers;

SELECT * FROM Rewards


SELECT DISTINCT S.Id, S.Title, S.Description, S.Cost
FROM ShopOffers AS S
JOIN Rewards AS R ON S.Id = R.ShopOfferId
WHERE R.UserId = -1;
