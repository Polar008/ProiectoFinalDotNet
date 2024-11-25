Descargar dependencias:

dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer

Restarura paquetes:
dotnet restore



Dependencia para crear controladores:

dotnet tool install --global dotnet-aspnet-codegenerator
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
Ejemplo:

dotnet aspnet-codegenerator controller -name NombreControlador -async -api -m NombreModelo -dc ApplicationDbContext -outDir Controllers

dotnet aspnet-codegenerator controller -name UsersController -async -api -m User -dc ApplicationDbContext -outDir Controllers


Crear una migración:
dotnet ef migrations add InitialCreate

Aplicar la migración:
dotnet ef database update

Eliminar una migraciòn:
dotnet ef migrations remove

Listar paquetes:
dotnet list package