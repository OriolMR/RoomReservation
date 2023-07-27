# DOCUMENTACIÓN TÉCNICA

## Entorno de desarrollo:
**Entorno de desarollo:**
<br>
Microsoft Visual Studio

**Lenguaje:**
<br>
C# con ASP.NET Core para la reserva de salas de reuniones de las diferentes oficinas de la empresa ACME (backend). La aplicación gestiona mediante una API REST las operaciones de reserva de salas. Angular como framework para la interficie de usuario (frontend).

<!-- aaaaaaaaaaaaaaaa -->

## MySQL (Base de datos)
**api.service.ts**
<br>

**dbo._EFMigrationsHistory**
<br>
lorem ipsum

**dbo.AspNetRoleClaims**
<br>
lorem ipsum

**dbo.AspNetRoles**
<br>
lorem ipsum

**dbo.AspNetUserClaims**
<br>
lorem ipsum

**dbo.AspNetUserLogins**
<br>
lorem ipsum

**dbo.AspNetUsers**
<br>
lorem ipsum

**dbo.AspNetUserTokens**
<br>
lorem ipsum

**dbo.Cities**
<br>
lorem ipsum

**dbo.Countries**
<br>
lorem ipsum

**dbo.MeetingRooms**
<br>
lorem ipsum

**dbo.Offices**
<br>
lorem ipsum

**dbo.Reserves**
<br>
lorem ipsum

## Angular (Framework)

**Esqueletos de las vistas (HTML):**
<br>
Cada pagina esta formada por un esqueleto (documento html) que en general sigue unas directrices: 
- Tienen una cabezera (es la misma para todas, no se dublica en el codigo) con las opciones del usuario ("profile" y "log out") y las opciones para ver las reservas hechas, para hacerlas o para volver a la pagina principal ("home"). En caso de ser administrador tambien tendras la opcion "admin", la cual permite gestionar las diferentes entidades de la aplicacion.
- Todas las paginas tienen un boton para volver a la pagina anterior aunque no indique explicitamente "atras", y otro boton, que por convencion, vendria a ser el boton "siguiente". Un ejemplo de ello es la vista login. Esta, tiene dos botones ubicados al final del archivo, donde uno indica "sign up" (referenciando al boton de "atras" y ubicado a la izquierda) y otro "sign in" (referenciando el boton de "siguiente" y ubicado a la derecha). Esto se ha decidio de esta forma debido a que en general cuando a un usuario se le presenta una serie de opciones en forma de botones, el boton que realiza el acto de "continuar", suele estar a la derecha y el de "cancelar" o "atras" a la izquierda.
- La vista de los recuadros, opciones, textos, botones, etc esta centralizada.
- Una vez se ha verificado tu identidad se te dirige automaticamente al home.

Por ultimo cabe destacar que las paginas html de la aplicacion estan dentro de otro html que a su vez lo esta en otro, ya que esta es la forma de trabajar con angular.
Encima de todos los documentos html esta "index" que luego utiliza a "app" que posteriormente utiliza los documentos html de los componentes que nosotros hayamos creado. Lo mismo ocurre con los archivos de estilos referenciados por cada uno de los archivos html correspondientes.

**Estilos de las vistas (CSS):**
<br>
Cada pagina tiene un documento de estilos (CSS) que en general sigue unas directrices: 
- La tipografia para los titulos es "Calibri".
- La tipografia para el resto de textos, sean botones, labels, inputs, etc. Es "Rubik".
- La cabecera que (que tiene sus propios estilos) ha sido hecha con bootstrap. El logo de usuario se ha ubicado a la drecha del todo mientras que el resto a la izquierda.
- El fondo de la aplicacion es una imagen de formas triangulares, que parecieran estar en diferentes capas. En un principio hiba a ser un degradado de azules, pero luego se opto por algo mas convencional como el blanco y finalmente la imagen predeterminada que hay de fondo en todas las vistas.
- Los colores (excluyendo el blanco y el fondo) son unas tonalidades de azules oscuros y claros. Los oscuros se utilizan de forma predeterminada para que cuando el usuario interactue con algun componente de la vista que lo permita se aclarezca con una de las tonalidades mas claras de azul que hayamos escogido.
- Por otra parte para centrar la vista del usuario en el centro (donde se encuentra lo relevanete) hemos optado por un trasfondo oscuro con sombreado.
- En cuanto a los botones todos tienen los mismos estilos. Cuando se pasa el raton por encima o se interactua con ellos gracias a la opcion "hover" cambiamos la tonalidad del color del boton. Estos estan redondeados y el texto de su interior es blanco.
- Tienen una cabezera (refiriendonos al codigo y no a la vista como tal) donde se indica el contexto de cada una de las partes que forman el docuemnto html correspondiente. De esta forma es facil identificar que estilos se estan aplicando en un lugar y en que lugar.
- Disponen de secciones ordenadas dentro del codigo por comentarios. Para una facil legibilidad y edicion.

### App component
**app.component.html**
<br>
App.component.html tiene una referencia a router-outlet, una clase que se encarga de interpretar las rutas de la api para mostrar las vistas adecuadas (componentes).

**app.component.css**
<br>
Los estilos en este caso nos indican una serie de directrices acerca de que tan grande debe ser la pagina (centralizar textos etc.), el fondo de esta y poco mas, pues solo actua como pagina de fondo.

**app.component.ts**
<br>
lorem ipsum

**app.module.ts**
<br>
lorem ipsum

### Menu component
**menu.component.html**
<br>
El menu component, mas reconocido como header, es la cabecera de la aplicacion. Esta hecho con botstrap y aplica unos estilos para mantener el logo de usuario a la derecha del todo. Cuando se pasa el raton por encima del logo se desplegan unas opciones en forma de lista, que a su vez optienen un efecto hover. El resto de opciones estan a la izquierda del todo, separadas del logo de usuario a drede.

**menu.component.css**
<br>
Bastante parecido a su archivo .css el html de este componente consta de dos zonas. La de las opciones generales (home, reservas y reservar) y la relacionada con el usuario. En caso de ser admin junto a las opciones generales disponemos de una opcion "admin" para poder editar las instancias de la base de datos. Cada una de estas opciones nos llevara a su pagina correspondiente. En el caso de las opciones del usuario tenemos "profile" y "log out". Para ver y editar nuestro perfil y cerrar cesion respectivamente.

**menu.component.ts**
<br>
lorem ipsum

### Service folder
**api.service.ts**
<br>
lorem ipsum

### Shared folder
#### Interfaces
**interfaces.ts**
<br>
lorem ipsum

**ireserves.ts**
<br>
lorem ipsum

### Views folder

#### Admin View:
**admin .component.html**
<br>
lorem ipsum

**admin.component.css**
<br>
lorem ipsum

**admin.component.ts**
<br>
lorem ipsum

#### Home View:
**home.component.html**
<br>
lorem ipsum

**home.component.css**
<br>
lorem ipsum

**home.component.ts**
<br>
lorem ipsum

#### Login View:
**login.component.html**
<br>
lorem ipsum

**login.component.css**
<br>
lorem ipsum

**login.component.ts**
<br>
lorem ipsum

#### Page-not-found View:
**page-not-found.component.html**
<br>
lorem ipsum

**page-not-found.component.css**
<br>
lorem ipsum

**page-not-found.component.ts**
<br>
lorem ipsum

#### Profile View:
**profile.component.html**
<br>
Los dos divs que se encargan de mostrar ambas vistas del perfil y de modificar perfil que tienen un *ngIf 

**profile.component.css**
<br>
lorem ipsum

**page-profile.component.ts**
<br>
lorem ipsum

#### Register View:
**register.component.html**
<br>
lorem ipsum

**register.component.css**
<br>
lorem ipsum

**register.component.ts**
<br>
lorem ipsum

#### Reservation View:
**reservation.component.html**
<br>
lorem ipsum

**reservation.component.css**
<br>
lorem ipsum

**reservation.component.ts**
<br>
lorem ipsum

#### Reservation-modal View:
**reservation-modal.component.html**
<br>
lorem ipsum

**reservation-modal.component.css**
<br>
lorem ipsum

**reservation-modal.component.ts**
<br>
lorem ipsum

#### Reserves View:
**reserves.component.html**
<br>
lorem ipsum

**reserves.component.css**
<br>
lorem ipsum

**reserves.component.ts**
<br>
lorem ipsum

#### Update-modal View:
**update-modal.component.html**
<br>
lorem ipsum

**update-modal.component.css**
<br>
lorem ipsum

**update-modal.component.ts**
<br>
lorem ipsum
