

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Donación de ropa', 'Campaña para recolectar ropa para familias necesitadas.', 'https://source.unsplash.com/600x400/?clothes,donation', 200, 1, 5, '2024-01-10 09:00:00', '2024-01-20 17:00:00', 'Calle Solidaridad 123', 'Madrid');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Recolección de alimentos', 'Evento para recolectar alimentos no perecederos.', 'https://source.unsplash.com/600x400/?food,donation', 300, 2, 8, '2024-02-01 10:00:00', '2024-02-15 16:00:00', 'Avenida Esperanza 456', 'Barcelona');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Voluntariado escolar', 'Programa para apoyo escolar a niños en situación vulnerable.', 'https://source.unsplash.com/600x400/?school,volunteer', 50, 3, 12, '2024-03-01 08:00:00', '2024-03-31 18:00:00', 'Plaza Educación 789', 'Valencia');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Reforestación comunitaria', 'Únete a plantar árboles en zonas urbanas.', 'https://source.unsplash.com/600x400/?trees,planting', 100, 4, 2, '2024-04-22 08:00:00', '2024-04-22 15:00:00', 'Calle Verde 321', 'Sevilla');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Donación de sangre', 'Ayuda con la donación de sangre para hospitales locales.', 'https://source.unsplash.com/600x400/?blood,donation', 150, 5, 3, '2024-05-10 09:00:00', '2024-05-10 14:00:00', 'Avenida Salud 654', 'Málaga');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Clases de arte', 'Ofrecemos clases de arte gratuitas para niños.', 'https://source.unsplash.com/600x400/?art,class', 30, 6, 7, '2024-06-05 10:00:00', '2024-06-30 12:00:00', 'Calle Creatividad 987', 'Zaragoza');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Campaña de reciclaje', 'Trae materiales reciclables y ayuda al medio ambiente.', 'https://source.unsplash.com/600x400/?recycling', 200, 7, 1, '2024-07-15 08:00:00', '2024-07-15 16:00:00', 'Calle Limpieza 159', 'Bilbao');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Concierto benéfico', 'Concierto a beneficio de niños con enfermedades raras.', 'https://source.unsplash.com/600x400/?concert,charity', 500, 8, 4, '2024-08-20 18:00:00', '2024-08-20 22:00:00', 'Avenida Música 753', 'Granada');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Entrenamiento deportivo', 'Sesiones deportivas gratuitas para jóvenes.', 'https://source.unsplash.com/600x400/?sports,training', 40, 9, 9, '2024-09-01 09:00:00', '2024-09-30 17:00:00', 'Calle Deporte 246', 'Valladolid');

INSERT INTO [dbo].[Offers] ([Title], [Description], [ImgBanner], [Capacity], [CharityId], [ProvinceId], [DateBegin], [DateEnd], [Street], [City]) 
VALUES 
('Taller de cocina saludable', 'Aprende a preparar comidas saludables y económicas.', 'https://source.unsplash.com/600x400/?cooking,healthy', 25, 10, 10, '2024-10-05 10:00:00', '2024-10-05 14:00:00', 'Avenida Sabor 852', 'Alicante');


-- Verifica las inserciones
SELECT * FROM Offers;

SELECT * FROM Offers WHERE CharityId = 1;


SELECT * FROM UserOffers

DELETE FROM UserOffers WHERE OfferId = 10


