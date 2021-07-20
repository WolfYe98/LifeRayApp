# LifeRayApp
## LifeRay test app

Esta aplicación está realizado con React.

Para ejecutarlo primero hay que instalar ```npm```, más tarde hay que ir al directorio ```liferay-app```, ejecutar
```npm install``` para instalar las dependencias y finalmente ejecutar ```npm start``` para ejecutar la aplicación.


## IMPORTANTE!
Al introducir un producto, se debe introducir el texto entero, por ejemplo:

```1 libro a 19,75 €```

luego se debe seleccionar el tipo de impuesto.
Si son libros, alimentos o productos médicos se debe seleccionar el tipo ```Exentos```, si son libros, alimentos o productos médicos importados se debe seleccionar ```Importados Exentos```.

En caso contrario se debe seleccionar ```Básico``` o ```Importados Básico```.

### Fichero App.js
En el fichero ```App.js``` se encuentra todo el código que he realizado para esta prueba, en ```App.css``` se encuentra los estilos.
## Test

Lo que nos interesa es la función que calcula los impuestos y el precio final de un producto, dicha función podemos testearlo con unit testing, usando de entrada una entrada que sabemos el resultado, y esperando que se devuelva un resultado.
Por ejemplo para el unit testing:
De entrada podemos utilizar:
```1 CD de música importado a 14,99 €```
Sabemos que la salida debe de valer
```14,99*0,1+14,99*0,05+14,99 = 17,24```
Con unit testing podemos indicar que expectamos una respuesta de 17,24, entonces en caso de que el resultado devuelto por la función sea diferente que el resultado, no pasaría el test y en caso contrario si pasaría el test.
