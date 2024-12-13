INSERT INTO [dbo].[ShopOffers] 
    ([Cost], [Title], [Description], [ImgBanner], [CharityId])
VALUES
    (500, 'Gift Card', 'A $50 gift card for popular stores.', 'dream.webp', 1),
    (300, 'Movie Tickets', 'Two tickets to any movie of your choice.', 'dream.webp', 1),
    (800, 'Fitness Tracker', 'A fitness tracker to help you stay healthy.', 'dream.webp', 1),
    (1000, 'Bluetooth Headphones', 'High-quality wireless headphones.', 'dream.webp', 1),
    (200, 'Coffee Mug', 'A stylish coffee mug with a unique design.', 'dream.webp', 1),
    (150, 'Keychain', 'A custom keychain to personalize your style.', 'dream.webp', 1),
    (750, 'Backpack', 'A durable and spacious backpack for daily use.', 'dream.webp', 1),
    (400, 'Water Bottle', 'A leak-proof water bottle for your adventures.', 'dream.webp', 1),
    (600, 'Wireless Mouse', 'A comfortable and reliable wireless mouse.', 'dream.webp', 1),
    (900, 'Portable Charger', 'A high-capacity portable charger for your devices.', 'dream.webp', 1);

-- Verifica las inserciones
-- SELECT * FROM ShopOffers;

SELECT * FROM Rewards


SELECT  
    S.Id, 
    S.Title, 
    S.Description, 
    S.Cost, 
    S.ImgBanner,
    U.Id as CharityId,
    U.Name as Propietary
FROM ShopOffers AS S
JOIN Users AS U 
    ON U.Id = S.CharityId and U.Id = 2
WHERE U.IsEnterprise = 1;


