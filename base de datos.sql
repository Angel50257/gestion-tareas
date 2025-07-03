-- Crear base de datos
CREATE DATABASE SistemaTareas;
GO

USE SistemaTareas;
GO

-- Tabla de roles (admin, usuario, etc.)
CREATE TABLE Roles (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(50) NOT NULL UNIQUE
);
GO

-- Tabla de usuarios
CREATE TABLE Usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    contrasena NVARCHAR(255) NOT NULL, -- Hashed
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES Roles(id)
);
GO

-- Tabla de tareas
CREATE TABLE Tareas (
    id INT PRIMARY KEY IDENTITY(1,1),
    titulo NVARCHAR(255) NOT NULL,
    descripcion NVARCHAR(MAX),
    estado NVARCHAR(50) NOT NULL DEFAULT 'pendiente', -- pendiente, en progreso, completada
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_actualizacion DATETIME DEFAULT GETDATE(),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
GO

-- Tabla de etiquetas
CREATE TABLE Etiquetas (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(50) NOT NULL UNIQUE
);
GO

-- Relación muchos a muchos entre tareas y etiquetas
CREATE TABLE TareaEtiquetas (
    tarea_id INT,
    etiqueta_id INT,
    PRIMARY KEY (tarea_id, etiqueta_id),
    FOREIGN KEY (tarea_id) REFERENCES Tareas(id) ON DELETE CASCADE,
    FOREIGN KEY (etiqueta_id) REFERENCES Etiquetas(id) ON DELETE CASCADE
);
GO

-- Archivos adjuntos a tareas
CREATE TABLE Archivos (
    id INT PRIMARY KEY IDENTITY(1,1),
    tarea_id INT NOT NULL,
    nombre_archivo NVARCHAR(255) NOT NULL,
    ruta_archivo NVARCHAR(500) NOT NULL,
    fecha_subida DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (tarea_id) REFERENCES Tareas(id) ON DELETE CASCADE
);
GO

-- modificando tabla archivos
ALTER TABLE Archivos
ADD nombre_original NVARCHAR(255) NOT NULL DEFAULT '';


-- Bitácora de acciones del sistema
CREATE TABLE Bitacora (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT,
    accion NVARCHAR(255),
    fecha DATETIME DEFAULT GETDATE(),
    descripcion NVARCHAR(MAX),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
GO


INSERT INTO Roles (nombre) VALUES ('admin'), ('usuario'), ('invitado');


SELECT * FROM TareaEtiquetas;
SELECT * FROM Usuarios;
SELECT * FROM Archivos;
SELECT * FROM Tareas;

DELETE FROM Usuarios WHERE id = 9;

INSERT INTO Usuarios (nombre, correo, contrasena, rol_id)
VALUES (
  'admin',
  'admin@gmail.com',
  '123456',
  1
);

-- insertar etiquetas
INSERT INTO Etiquetas (nombre) VALUES 
('Importante'),
('Personal'),
('Trabajo'),
('Reunión'),
('Entrega'),
('Investigación'),
('Desarrollo'),
('Corrección'),
('Prioridad Alta'),
('Prioridad Media'),
('Prioridad Baja'),
('Revisión'),
('En Espera'),
('Finalizado');




DECLARE @usuarioId INT = 8; 

SELECT A.*
FROM Archivos A
INNER JOIN Tareas T ON A.tarea_id = T.id
WHERE T.usuario_id = @usuarioId;


SELECT * FROM Tareas WHERE usuario_id = 8; -- reemplaza 8 por el id que usas
