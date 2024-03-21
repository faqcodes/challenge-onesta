# Desafío Onesta

A continuación se presenta la solución (diseño e implementación) del desafío Onesta correspondiente al desarrollo de una API Rest en NodeJS/Typescript/SQLite. El enunciado del desafío es el siguiente:

```
Construir una pequeña API en TypeScript, usando SQLite que permita agregar:

1.- Frutas y sus distintos tipos de Variedades.
2.- Cosechas.
3.- Agricultores y sus distintos Campos.
4.- Clientes.

También debe incluir una ruta que al enviarle un CSV lo lea y cargue su data dentro de la DDBB.

El mail debe ser único dentro de los agricultores.
El mail debe ser único dentro de los clientes.
La combinación Nombre Ubicación de los campos debe ser única.
El nombre de la fruta debe ser única.
La combinación fruta variedad debe ser única.

Se valorara:

1.- Orden de código.
2.- Orden de commits.
3.- Validaciones de schema.
4.- Separación de concerns.
5.- Manejo de errores.

Nice to Do:
Usar una arquitectura de DDD.
```

# Diseño

Se trata de dar solución al problema con un enfoque de "design-first". El problema comprende la creación de un conjunto de datos por medio de una API Rest (microservicio). Para el diseño de la solución se comienza definiendo las entidades del negocio (dominio), encontrándose: Agricultor, Cliente, Campos, Cosecha, Fruta y Variedades:

![Diagrama de componentes](docs/images/challenge-component.png)

En el esquema arriba, se agrupan las entidades de negocio según su funcionalidad. En Agricultura se establece el proceso agricola, desde la siembra hasta la cosecha. En Cliente se referencia a la comercialización de los productos agrícolas y, finalmente, en Cultivo se relaciona específicamente con los productos agrícolas que se involucran en el proceso agrícola. El fin de estas agrupaciones de negocio es comprender de mejor manera los casos de uso que se requieren implementar.
