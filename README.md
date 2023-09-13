-------------------------------------------------------------------------------------------
# DOCUMENTACIÓN TÉCNICA
-------------------------------------------------------------------------------------------

## Entorno de desarrollo:
**Entorno de desarollo:**
<br>
Microsoft Visual Studio

**Lenguaje:**
<br>
C# con ASP.NET Core para la reserva de salas de reuniones de las diferentes oficinas de la empresa ACME (backend). La aplicación gestiona mediante una API REST las operaciones de reserva de salas. Angular como framework para la interficie de usuario (frontend).

<!-- aaaaaaaaaaaaaaaa -->

-------------------------------------------------------------------------------------------

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

**dboffices**
<br>

lorem ipsum

**dbo.Reserves**
<br>

lorem ipsum

-------------------------------------------------------------------------------------------

## FRONT-END: Angular (Framework)

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

Bastante parecido a su archivo .css el html de este componente consta de dos zonas. La de las opciones generales (home, reservas y reservar) y la relacionada con el usuario. En caso de ser admin junto a las opciones generales disponemos de una opcion "admin" para poder editar las instancias de la base de datos. Cada una de estas opciones nos llevara a su pagina correspondiente. En el caso de las opciones del usuario tenemos "profile" y "log out". Para ver y editar nuestro perfil y cerrar cesion respectivamente.

**menu.component.css**
<br>

El menu component, mas reconocido como header, es la cabecera de la aplicacion. Esta hecho con botstrap y aplica unos estilos para mantener el logo de usuario a la derecha del todo. Cuando se pasa el raton por encima del logo se desplegan unas opciones en forma de lista, que a su vez optienen un efecto hover. El resto de opciones estan a la izquierda del todo, separadas del logo de usuario a drede.

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

La vista home esta compuesta por un listado de tres opciones: perfil, reservar y reservas. 
Cada una de estas opciones tiene un pequeño texto al lado indicando brevemente para que sirve cada opcion.

**home.component.css**
<br>

Trasfondo redondeado, rectangular, oscuro y sombreado en el que se ven las 3 opciones antes mencionadas de color azul.
Las opciones tienen sombreado bajo de color negro. Con el atributo hover el sombreado de sustitiye por un borde oscuro.

**home.component.ts**
<br>

lorem ipsum

#### Login View:
**login.component.html**
<br>

Componente que actua de pagina principal cuando se intenta acceder a la aplicacion. Dispone de dos inputs para introducir tus credenciales y de dos botones. El boton de "sign up" que te dirige a la pagina register y el de "sign in" para iniciar sesion.

**login.component.css**
<br>

Titulo centrado encima del trasfondo.
Trasfondo redondeado, rectangular, oscuro y sombreado con dos inputs que contienen un placeholder indicando que es lo que se espera del usuario.
Estos inputs estan redondeados.
Color del texto de los componentes blanco y con tipografia Rubik.
2 botones de color azul redondeados. se aclarecen gracias al atributo hover.
La tipografia de los textos es Rubik.

**login.component.ts**
<br>

lorem ipsum

#### Profile View:
**profile.component.html**
<br>

Pagina compuesta por dos grupos. Uno donde se ve la informacion y otro donde se edita.
Para mostrar la informacion de hace uso de 4 labels. 2 indicando que es lo que representa el label que hay inmediatamente despues y estos ultimos mostrando la informacion que se precisa.
Debajo de estos 4 labels se encuentran dos botones. Uno para ir atras "back" y otro para acceder a la vista de edicion "update".

La vista update es similar pero los labels que antes indicaban lo que correspondia han sido sustituidos por dos inputs para poder editar la informacion.
Los botones siguen siendo iguales, solo que el "update" actualiza la informacion y te devuelve a la pagina para verla.

**profile.component.css**
<br>

Trasfondo redondeado, rectangular, oscuro y sombreado.
Color del texto de los componentes blanco y con tipografia Rubik.
2 botones de color azul redondeados. se aclarecen gracias al atributo hover.
2 inputs en la version "update". Cuadrados y de color blanco de fondo.

**page-profile.component.ts**
<br>

lorem ipsum

#### Register View:
**register.component.html**
<br>

Componente que actua de pagina secundaria cuando se intenta registrar a la aplicacion. Dispone de 4 inputs para introducir tus credenciales y confirmarlos, y de dos botones. El boton de "sign up" que te registra si todo esta correcto y el de "sign in" para ir a la pagina de inicio de sesion.

**register.component.css**
<br>

Titulo centrado dentro, arriba del trasfondo.
Trasfondo redondeado, rectangular, oscuro y sombreado con dos inputs que contienen un placeholder indicando que es lo que se espera del usuario.
Estos inputs estan redondeados.
Color del texto de los componentes blanco y con tipografia Rubik.
2 botones de color azul redondeados. se aclarecen gracias al atributo hover.
La tipografia de los textos es Rubik.

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

-----------------------------------------------------------------------------------------------------

## BACKEND: ASP.NET CORE (Framework)

#### Identity:
#### Data:
**webapiContext.cs**
...
**webapiUser.cs**
<br>

Esta clase utiliza para definir la estructura de los usuarios de la aplicación web. ASP.NET Identity se encarga de la mayoría de las operaciones de autenticación y autorización, utilizando esta clase como base para representar a los usuarios.

### Controllers:

Un controlador es una parte fundamental de una aplicación web que sigue el patrón de diseño Modelo-Vista-Controlador (MVC). Su función principal es manejar las solicitudes HTTP entrantes, procesar los datos, interactuar con el modelo de datos subyacente y devolver una respuesta adecuada al cliente. Los controladores actúan como intermediarios entre las solicitudes del usuario y la lógica de negocio de la aplicación.

- **Recibe Solicitudes**: Los controladores escuchan las solicitudes HTTP entrantes, como peticiones de página web o solicitudes de recursos estáticos.

- **Procesa Datos**: Los controladores procesan los datos proporcionados en la solicitud. Esto puede incluir la validación de datos o la realización de operaciones en la base de datos.

- **Interactúa con el Modelo**: Los controladores interactúan con el modelo de datos de la aplicación. El modelo representa la estructura y la lógica subyacente de la aplicación, como las entidades de la base de datos y las operaciones que se pueden realizar en ellas.

- **Devuelve Respuestas**: Una vez que se ha procesado la solicitud y se ha interactuado con el modelo (si es necesario), el controlador devuelve una respuesta al cliente. Esta respuesta puede ser una página HTML completa, datos en formato JSON para una API, una redirección a otra URL o un código de error.

- **Gestión de Flujo**: Los controladores también pueden tomar decisiones basadas en la solicitud y la lógica de la aplicación para determinar cómo responder. Por ejemplo, pueden realizar redirecciones, cargar diferentes vistas o realizar acciones específicas según la solicitud.

**AuthenticationController.cs**
<br>

Esta clase se encarga de gestionar tanto la autenticación como la autorización de usuarios. Sus funciones incluyen:

 - **Registro de Usuarios**: El controlador permite a los usuarios crear nuevas cuentas en la aplicación. Esta acción se encarga de validar y almacenar la información de registro proporcionada, como nombre de usuario, contraseña y correo electrónico. Un registro exitoso permite a los usuarios acceder a la aplicación con las credenciales recién creadas.

 - **Inicio de Sesión**: La acción de inicio de sesión verifica las credenciales proporcionadas por el usuario (nombre de usuario y contraseña) y les concede acceso a la aplicación si son válidas. En caso de credenciales incorrectas, se muestra un mensaje de error.

 - **Cierre de Sesión**: Esta acción permite a los usuarios cerrar su sesión actual en la aplicación, lo que implica que ya no están autenticados. Normalmente, se redirige al usuario a la página de inicio de sesión o al inicio de la aplicación.

El AuthenticationController es una parte fundamental para garantizar la seguridad y la autenticación de los usuarios en la aplicación. Sus acciones clave facilitan la experiencia de registro y acceso, lo que a su vez permite a los usuarios disfrutar de las funcionalidades protegidas de la aplicación una vez que han iniciado sesión correctamente.

**CitiesController.cs**
<br>

Este controlador se encarga de gestionar información relacionada con las ciudades. Las principales funciones de este controlador incluyen:

- **Obtener Todas las Ciudades**: La acción _GetAllCities_ permite recuperar todas las ciudades disponibles en la base de datos y devuelve una respuesta con la lista de ciudades en formato JSON.

- **Obtener Ciudad por ID**: La acción _GetCityById_ permite obtener detalles específicos de una ciudad por su identificador único. Si la ciudad existe, se devuelve una respuesta con los detalles de la ciudad en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Obtener Ciudades por ID de País**: La acción _GetCitiesByCountryId_ permite recuperar todas las ciudades asociadas a un país específico, identificado por su ID. Si existen ciudades para el país proporcionado, se devuelve una respuesta con la lista de ciudades en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Agregar una Ciudad**: La acción _AddCity_ permite agregar una nueva ciudad a la base de datos. Antes de agregar la ciudad, se valida y se asigna un valor inicial al cityId. Una vez agregada la ciudad, se devuelve una respuesta "Created" con los detalles de la ciudad agregada.

- **Actualizar una Ciudad**: La acción _UpdateCity_ permite actualizar los detalles de una ciudad existente en la base de datos según su ID. Si la ciudad existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados de la ciudad.

- **Eliminar una Ciudad**: La acción _DeleteCity_ permite eliminar una ciudad de la base de datos según su ID. Si la ciudad existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador facilita la gestión de datos relacionados con las ciudades en la aplicación y se asegura de que estas operaciones estén protegidas mediante la autorización. Por ejemplo, se requiere el rol de "Administrador" para realizar operaciones de creación, actualización y eliminación de ciudades.

**CountriesController.cs**
<br>

Este controlador se encarga de administrar la información relacionada con países en la aplicación. Sus acciones principales incluyen:

- **Obtener Todos los Países**: La acción _GetAllCountries_ permite recuperar todos los países disponibles en la base de datos y devuelve una respuesta con la lista de países en formato JSON.

- **Obtener País por ID**: La acción _GetCountryById_ permite obtener detalles específicos de un país por su identificador único. Si el país existe, se devuelve una respuesta con los detalles del país en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Agregar un País**: La acción _AddCountry_ permite agregar un nuevo país a la base de datos. Antes de agregar el país, se valida y se asigna un valor inicial al countryId. Una vez agregado el país, se devuelve una respuesta "Created" con los detalles del país agregado.

- **Actualizar un País**: La acción _UpdateCountry_ permite actualizar los detalles de un país existente en la base de datos según su ID. Si el país existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados del país.

- **Eliminar un País**: La acción _DeleteCountry_ permite eliminar un país de la base de datos según su ID. Si el país existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador también asegura que las operaciones de creación, actualización y eliminación de países estén protegidas mediante la autorización. Se requiere el rol de "Administrador" para realizar estas operaciones.


**MeetingRoomsController.cs**
<br>

Este controlador se encarga de administrar las operaciones relacionadas con las salas de reuniones en la aplicación. Sus acciones principales incluyen:

Obtener Todas las Salas de Reuniones: La acción _GetAllRooms_ permite recuperar todas las salas de reuniones disponibles en la base de datos y devuelve una respuesta con la lista de salas de reuniones en formato JSON.

- **Obtener Sala de Reuniones por ID**: La acción GetRoomById permite obtener detalles específicos de una sala de reuniones por su identificador único. Si la sala de reuniones existe, se devuelve una respuesta con los detalles de la sala en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Obtener Salas de Reuniones por ID de Oficina**: La acción _GetMeetingRoomsByOfficeId_ permite recuperar todas las salas de reuniones asociadas a una oficina específica, identificada por su ID. Si existen salas de reuniones para la oficina proporcionada, se devuelve una respuesta con la lista de salas de reuniones en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Agregar una Sala de Reuniones**: La acción _AddRoom_ permite agregar una nueva sala de reuniones a la base de datos. Antes de agregar la sala de reuniones, se valida y se asigna un valor inicial al meetingRoomId. Una vez agregada la sala de reuniones, se devuelve una respuesta "Created" con los detalles de la sala agregada.

- **Actualizar una Sala de Reuniones**: La acción _UpdateRoom_ permite actualizar los detalles de una sala de reuniones existente en la base de datos según su ID. Si la sala de reuniones existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados de la sala de reuniones.

- **Eliminar una Sala de Reuniones**: La acción _DeleteRoom_ permite eliminar una sala de reuniones de la base de datos según su ID. Si la sala de reuniones existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre las salas de reuniones en la aplicación. Las operaciones de creación, actualización y eliminación de salas de reuniones no requieren autorización específica en este caso.


**OfficesController.cs**
<br>

Este controlador se encarga de administrar las operaciones relacionadas con las oficinas en la aplicación. Las principales funciones de este controlador incluyen:

- **Obtener Todas las Oficinas**: La acción _GetAllOffices_ permite recuperar todas las oficinas disponibles en la base de datos y devuelve una respuesta con la lista de oficinas en formato JSON.-

- **Obtener Oficina por ID**: La acción _GetOfficeById_ permite obtener detalles específicos de una oficina por su identificador único. Si la oficina existe, se devuelve una respuesta con los detalles de la oficina en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Obtener Oficinas por ID de Ciudad**: La acción GetOfficesByCityId permite recuperar todas las oficinas asociadas a una ciudad específica, identificada por su ID. Si existen oficinas para la ciudad proporcionada, se devuelve una respuesta con la lista de oficinas en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Agregar una Oficina**: La acción _AddOffice_ permite agregar una nueva oficina a la base de datos. Antes de agregar la oficina, se valida y se asigna un valor inicial al officeId. Una vez agregada la oficina, se devuelve una respuesta "Created" con los detalles de la oficina agregada.

- **Actualizar una Oficina**: La acción _UpdateOffice_ permite actualizar los detalles de una oficina existente en la base de datos según su ID. Si la oficina existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados de la oficina.

- **Eliminar una Oficina**: La acción _DeleteOffice_ permite eliminar una oficina de la base de datos según su ID. Si la oficina existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre las oficinas en la aplicación. Las operaciones de creación, actualización y eliminación de oficinas no requieren autorización específica en este caso.


**ReservesController.cs**
<br>

Este controlador se encarga de gestionar las operaciones relacionadas con las reservas de salas de reuniones en la aplicación. Las acciones principales que realiza incluyen:

- **Obtener Todas las Reservas**: La acción _GetAllReserves_ permite recuperar todas las reservas disponibles en la base de datos y devuelve una respuesta con la lista de reservas en formato JSON.

- **Obtener Reserva por ID**: La acción _GetReserveById_ permite obtener detalles específicos de una reserva por su identificador único. Si la reserva existe, se devuelve una respuesta con los detalles de la reserva en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Obtener Reservas por ID de Usuario**: La acción _GetReservesByUserId_ permite recuperar todas las reservas asociadas a un usuario específico, identificado por su ID. Si existen reservas para el usuario proporcionado, se devuelve una respuesta con la lista de reservas en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Obtener Reservas por ID de Sala de Reuniones**: La acción _GetReservesByMeetingRoomId_ permite recuperar todas las reservas asociadas a una sala de reuniones específica, identificada por su ID. Si existen reservas para la sala de reuniones proporcionada, se devuelve una respuesta con la lista de reservas en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Agregar una Reserva**: La acción _AddReserve_ permite agregar una nueva reserva de sala de reuniones a la base de datos. Antes de agregar la reserva, se verifica si hay solapamientos con otras reservas existentes. Si no hay solapamientos, se crea la nueva reserva y se devuelve una respuesta "Ok". Si hay solapamientos, se devuelve un mensaje de error "BadRequest".

- **Actualizar una Reserva**: La acción _UpdateReserve_ permite actualizar los detalles de una reserva existente en la base de datos según su ID. Antes de realizar la actualización, se verifica si la nueva reserva entra en conflicto con otras reservas existentes. Si no hay conflictos, se actualizan los detalles y se devuelve una respuesta "Ok". Si hay conflictos, se devuelve un mensaje de error "BadRequest".

- **Eliminar una Reserva**: La acción _DeleteReserve_ permite eliminar una reserva de la base de datos según su ID. Si la reserva existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre las reservas de salas de reuniones en la aplicación, garantizando que se eviten conflictos de programación y se verifiquen las disponibilidades de las salas.

**UsersController.cs**
<br>

Este controlador se encarga de administrar las operaciones relacionadas con los usuarios en la aplicación. Sus acciones principales incluyen:

- **Obtener Todos los Usuarios**: La acción _GetAllUsers_ permite recuperar todos los usuarios disponibles en la base de datos y devuelve una respuesta con la lista de usuarios en formato JSON.

- **Obtener Usuario por ID**: La acción _GetUserById_ permite obtener detalles específicos de un usuario por su identificador único. Si el usuario existe, se devuelve una respuesta con los detalles del usuario en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Obtener Usuario por Nombre de Usuario**: La acción _GetUserByUsername_ permite obtener detalles de un usuario por su nombre de usuario. Si el usuario existe, se devuelve una respuesta con los detalles del usuario en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

- **Actualizar Usuario**: La acción _UpdateUser_ permite actualizar los detalles de un usuario existente en la base de datos según su ID. Se admite la actualización del nombre de usuario, el correo electrónico y la contraseña del usuario. La acción valida si se proporciona la contraseña actual y la nueva contraseña antes de cambiarla. Si la actualización es exitosa, se devuelve una respuesta "Ok" con los detalles actualizados del usuario. Si hay errores durante la actualización, se devuelve una respuesta "BadRequest" con los errores específicos.

- **Eliminar Usuario**: La acción _DeleteUser_ permite eliminar un usuario de la base de datos según su ID. Si el usuario existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre los usuarios en la aplicación. Permite realizar operaciones como obtener, actualizar y eliminar usuarios, así como buscar usuarios por su nombre de usuario o ID. También proporciona funcionalidad de cambio de contraseña de usuario cuando se proporcionan tanto la contraseña actual como la nueva contraseña.

### DataAccess

Este módulo contiene los contextos de bases de datos utilizados en la aplicación para administrar la persistencia de datos. Los contextos de bases de datos son componentes esenciales que facilitan la comunicación entre la aplicación y la base de datos subyacente. 

**IdentityAppDbContext.cs**
<br>

Este contexto se basa en IdentityDbContext<webapiUser> y se utiliza para administrar la persistencia de datos relacionados con la autenticación y la autorización proporcionados por ASP.NET Identity.

**RoomReservationDbContext.cs**
<br>

Este contexto se encarga de gestionar la persistencia de datos relacionados con la aplicación de reserva de salas. Contiene propiedades DbSet que representan las tablas de la base de datos, como países, ciudades, oficinas, salas de reuniones y reservas. Además, proporciona un método SaveChangesAsync para guardar cambios en la base de datos de manera asincrónica.

### Models

En la arquitectura Modelo-Vista-Controlador (MVC), los modelos son componentes que representan y gestionan los datos de la aplicación. Los modelos son responsables de interactuar con la capa de datos subyacente, validar la integridad de los datos y proporcionar métodos para acceder y modificar esos datos. Los modelos actúan como la capa de acceso a la base de datos y encapsulan la lógica relacionada con los datos.

**Definición de un Modelo**:

Un modelo es una clase (o una entidad) que define la estructura de los datos que se manejarán en la aplicación, se compone de:

- **Atributos de Datos**: Los atributos como [Key] y [DatabaseGenerated] proporcionan información adicional sobre cómo se deben tratar las propiedades en la base de datos. Por ejemplo, [Key] indica que un atributo es la clave primaria de la tabla, y [DatabaseGenerated(DatabaseGeneratedOption.Identity)] indica que un atributo se genera automáticamente por la base de datos.

- **Constructores**: Los constructores son métodos especiales utilizados para crear instancias de la clase. 

- **Funciones y Métodos Adicionales**: Los modelos pueden incluir métodos adicionales para realizar operaciones específicas relacionadas con los datos. 

**City.cs**
<br>

Este modelo representa una entidad que almacena información sobre **ciudades**.

- **cityId**: Esta propiedad representa el identificador único de la ciudad.

- **countryId**: Representa el identificador del país al que pertenece esta ciudad.

- **cityName**: Almacena el nombre de la ciudad.

**Country.cs**
<br>

Este modelo representa una entidad que almacena información sobre **países**. 

- **countryId**: Esta propiedad representa el identificador único del país.

- **countryName**: Almacena el nombre del país.

**Office.cs**
<br>

Este modelo representa una entidad que almacena información sobre **oficinas**.

- **officeId**: Esta propiedad representa el identificador único de la oficina.

- **cityId**: Representa el identificador de la ciudad a la que pertenece esta oficina.

- **officeName**: Almacena el nombre de la oficina.

**MeetingRoom.cs**
<br>

Este modelo representa una entidad que almacena información sobre **salas de reuniones**.

- **meetingRoomId**: Esta propiedad representa el identificador único de la sala de reuniones.

- **officeId**: Representa el identificador de la oficina a la que pertenece esta sala de reuniones.

- **meetingRoomName**: Almacena el nombre de la sala de reuniones.

**Reserve.cs**
<br>

Este modelo representa una entidad que almacena información sobre **reservas de salas**.

- **reserveId**: Esta propiedad representa el identificador único de la reserva.

- **meetingRoomId**: Representa el identificador de la sala de reuniones que se ha reservado.

- **userId**: Almacena el identificador del usuario que realizó la reserva.

- **reserveDate**: Indica la fecha en la que se realiza la reserva.

- **startingHour**: Representa la hora de inicio de la reserva.

- **endingHour**: Indica la hora de finalización de la reserva.

**LoginViewModel.cs**
<br>

Este modelo se utiliza para representar los datos de **inicio de sesión** de un usuario en la aplicación.

- **UserName**: Almacena el nombre de usuario con el que el usuario intenta iniciar sesión.

- **PasswordHash**: Contiene el valor hash de la contraseña proporcionada por el usuario para el inicio de sesión.

- _**ValidateUserInput()**_: Este método se utiliza para validar los datos de entrada del usuario antes de intentar el inicio de sesión. Verifica que ambos campos, UserName y PasswordHash, estén completos.

Este modelo se utiliza para recopilar y validar la información de inicio de sesión proporcionada por un usuario antes de procesarla. La lógica relacionada con la autenticación y el inicio de sesión se implementa en otros componentes de la aplicación, como el controlador de autenticación.

**RegisterViewModel.cs**
<br>

Este modelo se utiliza para representar los datos de **registro de un usuario** en la aplicación. 

- **UserName**: Almacena el nombre de usuario que el usuario desea registrar.

- **Email**: Contiene la dirección de correo electrónico del usuario que se utiliza para el registro.

- **PasswordHash**: Contiene el valor hash de la contraseña proporcionada por el usuario durante el registro.

- _**ValidateUserInput()**_: Este método se utiliza para validar los datos de entrada del usuario antes de procesar el registro. Verifica que todos los campos, UserName, Email y PasswordHash, estén completos.

Este modelo se utiliza para recopilar y validar la información de registro proporcionada por un usuario antes de procesarla. La lógica relacionada con la creación de cuentas de usuario se implementa en otros componentes de la aplicación, como el controlador de autenticación.

**ReserveData.cs**
<br>

Este modelo se utiliza para reperesentar los datos al crear una **reserva** en la aplicación.

- **ReserveDate**: Esta propiedad almacena la fecha en la que se desea realizar la reserva. Indica el día en el que se planea utilizar la sala de reuniones.

- **StartingHour**: Contiene la hora de inicio de la reserva. Representa el momento en el que la reserva comienza y se puede acceder a la sala de reuniones.

- **EndingHour**: Almacena la hora de finalización de la reserva. Indica el momento en el que la reserva concluye y la sala de reuniones queda disponible para otros usuarios.

- **MeetingRoomId**: Representa el identificador único de la sala de reuniones para la cual se está creando la reserva. Este identificador se utiliza para asociar la reserva a una sala de reuniones específica.

- **UserId**: Contiene el identificador único del usuario que está realizando la reserva. Indica quién ha programado la reserva de la sala de reuniones.

Se utiliza para transmitir información al sistema sobre la reserva que un usuario desea realizar. Los controladores y la lógica de la aplicación procesarán esta información para crear una nueva reserva en la base de datos, asegurando que la sala de reuniones esté disponible durante el período especificado por el usuario.


------------------------
**UpdateReserveModel.cs**
<br>
**UpdateCountryModel.cs**
<br>
**UpdateCityModel.cs**
<br>
**UpdateOfficeModel.cs**
<br>
**UpdateMeetingRoomModel.cs**
<br>
-------------------------


### Pages
### Repositories

Este módulo se emplea para abstraer y administrar la lógica de acceso a datos y las interacciones con la base de datos. Este repositorio contiene interfaces que definen las operaciones o métodos que pueden llevarse a cabo en la capa de acceso a datos, sin detallar cómo se implementan realmente esas operaciones. Representan controladores relacionados con la autenticación y la gestión de usuarios en la aplicación en el contexto de una aplicación web API.

Al definir estas interfaces, se facilita la separación de preocupaciones y la modularidad del código, lo que permite un mejor mantenimiento y pruebas unitarias de las funcionalidades.

**IAuthenticationController.cs**
<br>

Esta interfaz define un conjunto de métodos relacionados con la autenticación y la autorización de **usuarios**.

**ICitiesController.cs**
<br>

Esta interfaz define un conjunto de métodos que representan operaciones relacionadas con la gestión de **ciudades**.

**ICountriesController.cs**
<br>

Esta interfaz define un conjunto de métodos que representan operaciones relacionadas con la gestión de **países**.

**IMeetingRoomsController.cs**
<br>

Esta interfaz define un conjunto de métodos que representan operaciones relacionadas con la gestión de **salas**.

**IOfficesController.cs**
<br>

Esta interfaz define un conjunto de métodos que representan operaciones relacionadas con la gestión de **oficinas**.

**IReservesController.cs**
<br>

Esta interfaz define un conjunto de métodos que representan operaciones relacionadas con la gestión de **reserva**s.

**IUsersController.cs**
<br>

Esta interfaz define un conjunto de métodos que representan operaciones relacionadas con la gestión de **usuarios**.

**appsettings.json**
<br>

Este archivo se utiliza para configurar diferentes aspectos de la aplicación. Proporciona información de los niveles de registro, las cadenas de conexión a las bases de datos y la clave secreta para tokens JWT.

- **Logging**: Esta sección configura la información relacionada con el registro (logging) de la aplicación. Define los niveles de registro para diferentes componentes. El nivel de registro predeterminado (Default) está configurado en "Information", lo que significa que la aplicación registrará mensajes de información. El nivel de registro para los componentes de Microsoft.AspNetCore está configurado en "Warning", lo que significa que solo se registrarán mensajes de advertencia y errores relacionados con ASP.NET Core.

- **AllowedHosts**: Este valor permite especificar qué hosts están permitidos para acceder a la aplicación. En este caso, el asterisco (*) indica que se permite el acceso desde cualquier host.

- **ConnectionStrings**: Esta sección define las cadenas de conexión a las bases de datos utilizadas por la aplicación. Hay dos cadenas de conexión definidas:

    - **"RoomReservationConnection"**: Esta cadena de conexión está configurada para la base de datos "RoomReservation" en un servidor local. Utiliza la autenticación de Windows (Trusted_Connection=True) para la conexión.

    - **"IdentityConnection"**: Esta cadena de conexión está configurada para la misma base de datos "RoomReservation" en un servidor local diferente (posiblemente para una instancia diferente). También utiliza la autenticación de Windows y permite múltiples conjuntos de resultados activos (MultipleActiveResultSets=true).

- **Jwt**: Esta sección define una clave secreta (SecretKey) que se utiliza para la generación y validación de tokens JWT (JSON Web Tokens) en la aplicación.


**Program.cs**
<br>

En este archivo, se configura y arranca la aplicación web ASP.NET Core, estableciendo servicios, bases de datos, autenticación, autorización y otras configuraciones necesarias para su funcionamiento.

- Se utiliza _WebApplication.CreateBuilder(args)_ para crear una instancia de **WebApplicationBuilder**, que es la base para configurar y construir la aplicación web.

- Se obtienen las cadenas de conexión desde la configuración de la aplicación utilizando _builder.Configuration.GetConnectionString_. Estas cadenas de conexión se utilizan posteriormente para configurar los contextos de la base de datos.

- Se configuran los contextos de la base de datos utilizando Entity Framework Core. Se agregan los servicios de **RoomReservationDbContext** y **IdentityAppDbContext** con las respectivas cadenas de conexión. Estos contextos representan las bases de datos utilizadas por la aplicación.

- Se configura la autenticación y autorización utilizando el servicio _AddDefaultIdentity_. Se establecen varias opciones relacionadas con los requisitos de contraseña, como no requerir caracteres no alfanuméricos, no requerir confirmación de cuenta, no requerir mayúsculas, etc. Además, se configura la política de nombres de usuario permitidos y si se requiere un correo electrónico único.

- Se verifica si existe un rol llamado "ADMINISTRADOR" en la base de datos y, si no existe, se crea. Esto es importante para la gestión de roles y permisos en la aplicación.

- Se configura la política CORS con el nombre "AllowLocalhost4200", que permite las solicitudes desde el origen "https://localhost:4200". Esto es útil para permitir solicitudes desde un front-end alojado en ese origen.

- Se registran los controladores con _builder.Services.AddControllers()_ y se agrega la documentación de **Swagger** con _builder.Services.AddSwaggerGen()_.

- Se crea la instancia de la aplicación con _builder.Build()_.

- Se configura el uso de CORS con _app.UseCors("AllowLocalhost4200")_.

- Si la aplicación está en modo de desarrollo (_app.Environment.IsDevelopment()_), se habilita **Swagger** para documentar la API. De lo contrario, se habilita la redirección HTTPS y se sirven archivos estáticos.

- Se usa _app.UseAuthorization()_ para habilitar la autorización en la aplicación.

- Finalmente, se mapean los controladores con _app.MapControllers()_ y se inicia la aplicación con _app.Run()_.

-------------------------------------------------------------------------------------------
