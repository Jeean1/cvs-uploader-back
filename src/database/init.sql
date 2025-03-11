-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'cvsDataBase')
BEGIN
    CREATE DATABASE cvsDataBase;
END
GO

-- Usar la base de datos
USE cvsDataBase;
GO

-- Crear la tabla 'customers' si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'customers')
BEGIN
    CREATE TABLE customers (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        age INT NOT NULL,
        email NVARCHAR(100) UNIQUE NOT NULL
    );
END
GO

-- Insertar datos de prueba (opcional)
INSERT INTO customers (name, age, email)
SELECT 'Alice Johnson', 28, 'alice@example.com'
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE email = 'alice@example.com');
GO
