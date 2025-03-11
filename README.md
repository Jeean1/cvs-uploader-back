---

# 📌 **Proyecto Backend - API con Node.js y SQL Server**  

## 📖 **Descripción**  

Proyecto en Node.js para procesar, analizar y validar datos de archivos CSV antes de almacenarlos en una base de datos.  

--- 
## 🚀 **DEMO** 
Link demo del proyecto: https://youtu.be/7cAOi8J_bBY
---

## 🚀 **Requisitos**  

Antes de empezar, asegúrate de tener instalado:  

- **Node.js** (v16 o superior) 👉 [Descargar aquí](https://nodejs.org/)  
- **SQL Server** 👉 [Descargar aquí](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)  
- **Git** (opcional) 👉 [Descargar aquí](https://git-scm.com/)  

---  

## 🔧 **Instalación y Configuración**  

### 1️⃣ **Clonar el Repositorio**  

```bash
git clone git@github.com:Jeean1/cvs-uploader-back.git
```  

### 2️⃣ **Instalar Dependencias**  

```bash
npm install
```  

### 3️⃣ **Configurar Variables de Entorno**  

Crea un archivo **`.env`** en la raíz del proyecto y agrega la configuración de la base de datos:  

```env
DB_USER=sa
DB_PASS=tu_password
DB_HOST=localhost
DB_NAME=cvsDataBase
PORT=4000
```  

> 📌 **Nota:** Cambia los valores según tu entorno.  

---  

## 🛠 **Configuración de la Base de Datos**  

Ejecuta el siguiente script en **SQL Server** para crear la base de datos y las tablas necesarias:  

```sql
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'cvsDataBase')
BEGIN
    CREATE DATABASE cvsDataBase;
END
GO

USE cvsDataBase;
GO

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
```  

---  

## ▶️ **Ejecutar el Proyecto**  

### **1️⃣ Modo Desarrollo**  

```bash
npm run dev
```  

### **2️⃣ Modo Producción**  

```bash
npm start
```  

---  

## 🛠 **Endpoints Disponibles**  

| Método | Ruta       | Descripción                                 |
| ------ | ---------- | ------------------------------------------- |
| POST   | `/upload`  | Subir un archivo CSV para su procesamiento  |
| GET    | `/general` | Obtener la lista general de clientes        |
| GET    | `/detail`  | Buscar clientes según criterios específicos |  

📌 **Ejemplo de Uso con `cURL`**  

```bash
# Subir un archivo CSV
curl -X POST -F "file=@archivo.csv" http://localhost:4000/upload

# Obtener la lista de clientes
curl -X GET http://localhost:4000/general

# Buscar clientes con parámetros (ejemplo con query params)
curl -X GET "http://localhost:4000/detail?query=John"
```  

---  

## 🔥 **Herramientas Utilizadas**  

- **Node.js** y **Express.js** 🚀  
- **SQL Server** para la base de datos 🏛️  
- **Dotenv** para configuración de variables de entorno 🔧  

## 📬 **Contacto**  

Si tienes dudas o sugerencias, contáctame en:  
✉️ **giraldojeanpool@hotmail.com**  
📌 **GitHub**: [https://github.com/Jeean1](https://github.com/Jeean1)  

---  
