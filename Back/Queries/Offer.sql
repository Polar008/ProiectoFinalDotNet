INSERT INTO [dbo].[Offers] 
    ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [Street], [City])
VALUES
    ('Food Drive', 'Collecting food for the needy', 'banner1.jpg', 100, 1, 10, 'Main Street 123', 'Springfield'),
    ('Clothes Donation', 'Help us gather warm clothes for winter', 'banner2.jpg', 50, 2, 22, 'Elm Street 456', 'Shelbyville'),
    ('Blood Donation', 'Save lives by donating blood', 'banner3.jpg', 30, 9, 33, 'Oak Avenue 789', 'Capital City'),
    ('Book Drive', 'Providing books for underprivileged children', 'banner4.jpg', 75, 13, 44, 'Pine Road 321', 'Ogdenville'),
    ('Toy Collection', 'Bring smiles to kids with toy donations', 'banner5.jpg', 200, 18, 8, 'Maple Street 654', 'North Haverbrook'),
    ('Tree Planting', 'Join us in planting trees for a greener future', 'banner6.jpg', 25, 6, 17, 'Cedar Way 987', 'Monorail Town'),
    ('Charity Run', 'A run to support local charities', 'banner7.jpg', 150, 7, 27, 'Birch Lane 159', 'East Shelbyville'),
    ('Art Auction', 'Buy art to support creative initiatives', 'banner8.jpg', 40, 8, 36, 'Willow Avenue 753', 'South Ogdenville'),
    ('Community Cleanup', 'Help us clean up the local park', 'banner9.jpg', 60, 9, 45, 'Spruce Boulevard 951', 'Green City'),
    ('Tech Workshop', 'Teaching technology skills to youth', 'banner10.jpg', 80, 10, 51, 'Ash Lane 357', 'Silicon Valley');

-- Verifica las inserciones
SELECT * FROM Offers;

SELECT * FROM Offers WHERE CharityId = 1;



