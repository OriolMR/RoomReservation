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

FRONT-END CON Angular (Framework)

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






BACKEND CON ASP.NET CORE (Framework)

#### Identity:
#### Data:
**webapiContext.cs**
...
**webapiUser.cs**
<br>
Esta clase utiliza para definir la estructura de los usuarios de la aplicación web. ASP.NET Identity se encarga de la mayoría de las operaciones de autenticación y autorización, utilizando esta clase como base para representar a los usuarios.

#### Controllers:

Un controlador es una parte fundamental de una aplicación web que sigue el patrón de diseño Modelo-Vista-Controlador (MVC). Su función principal es manejar las solicitudes HTTP entrantes, procesar los datos, interactuar con el modelo de datos subyacente y devolver una respuesta adecuada al cliente. Los controladores actúan como intermediarios entre las solicitudes del usuario y la lógica de negocio de la aplicación.

Recibe Solicitudes: Los controladores escuchan las solicitudes HTTP entrantes, como peticiones de página web o solicitudes de recursos estáticos.

Procesa Datos: Los controladores procesan los datos proporcionados en la solicitud. Esto puede incluir la validación de datos o la realización de operaciones en la base de datos.

Interactúa con el Modelo: Los controladores interactúan con el modelo de datos de la aplicación. El modelo representa la estructura y la lógica subyacente de la aplicación, como las entidades de la base de datos y las operaciones que se pueden realizar en ellas.

Devuelve Respuestas: Una vez que se ha procesado la solicitud y se ha interactuado con el modelo (si es necesario), el controlador devuelve una respuesta al cliente. Esta respuesta puede ser una página HTML completa, datos en formato JSON para una API, una redirección a otra URL o un código de error.

Gestión de Flujo: Los controladores también pueden tomar decisiones basadas en la solicitud y la lógica de la aplicación para determinar cómo responder. Por ejemplo, pueden realizar redirecciones, cargar diferentes vistas o realizar acciones específicas según la solicitud.

**AuthenticationController.cs**
<br>

Esta clase cumple un papel esencial en la aplicación al encargarse de gestionar tanto la autenticación como la autorización de usuarios. Sus principales funciones incluyen:

Registro de Usuarios: El controlador permite a los usuarios crear nuevas cuentas en la aplicación. Esta acción se encarga de validar y almacenar la información de registro proporcionada, como nombre de usuario, contraseña y correo electrónico. Un registro exitoso permite a los usuarios acceder a la aplicación con las credenciales recién creadas.

Inicio de Sesión: La acción de inicio de sesión verifica las credenciales proporcionadas por el usuario (nombre de usuario y contraseña) y les concede acceso a la aplicación si son válidas. En caso de credenciales incorrectas, se muestra un mensaje de error.

Cierre de Sesión: Esta acción permite a los usuarios cerrar su sesión actual en la aplicación, lo que implica que ya no están autenticados. Normalmente, se redirige al usuario a la página de inicio de sesión o al inicio de la aplicación.

El AuthenticationController es una parte fundamental para garantizar la seguridad y la autenticación de los usuarios en la aplicación. Sus acciones clave facilitan la experiencia de registro y acceso, lo que a su vez permite a los usuarios disfrutar de las funcionalidades protegidas de la aplicación una vez que han iniciado sesión correctamente.

**CitiesController.cs**
<br>

Este controlador se encarga de gestionar información relacionada con las ciudades. Las principales funciones de este controlador incluyen:

Obtener Todas las Ciudades: La acción GetAllCities permite recuperar todas las ciudades disponibles en la base de datos y devuelve una respuesta con la lista de ciudades en formato JSON.

Obtener Ciudad por ID: La acción GetCityById permite obtener detalles específicos de una ciudad por su identificador único. Si la ciudad existe, se devuelve una respuesta con los detalles de la ciudad en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Obtener Ciudades por ID de País: La acción GetCitiesByCountryId permite recuperar todas las ciudades asociadas a un país específico, identificado por su ID. Si existen ciudades para el país proporcionado, se devuelve una respuesta con la lista de ciudades en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Agregar una Ciudad: La acción AddCity permite agregar una nueva ciudad a la base de datos. Antes de agregar la ciudad, se valida y se asigna un valor inicial al cityId. Una vez agregada la ciudad, se devuelve una respuesta "Created" con los detalles de la ciudad agregada.

Actualizar una Ciudad: La acción UpdateCity permite actualizar los detalles de una ciudad existente en la base de datos según su ID. Si la ciudad existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados de la ciudad.

Eliminar una Ciudad: La acción DeleteCity permite eliminar una ciudad de la base de datos según su ID. Si la ciudad existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador facilita la gestión de datos relacionados con las ciudades en la aplicación y se asegura de que estas operaciones estén protegidas mediante la autorización. Por ejemplo, se requiere el rol de "Administrador" para realizar operaciones de creación, actualización y eliminación de ciudades.



**CountriesController.cs**
<br>

Este controlador se encarga de administrar la información relacionada con países en la aplicación. Sus acciones principales incluyen:

Obtener Todos los Países: La acción GetAllCountries permite recuperar todos los países disponibles en la base de datos y devuelve una respuesta con la lista de países en formato JSON.

Obtener País por ID: La acción GetCountryById permite obtener detalles específicos de un país por su identificador único. Si el país existe, se devuelve una respuesta con los detalles del país en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Agregar un País: La acción AddCountry permite agregar un nuevo país a la base de datos. Antes de agregar el país, se valida y se asigna un valor inicial al countryId. Una vez agregado el país, se devuelve una respuesta "Created" con los detalles del país agregado.

Actualizar un País: La acción UpdateCountry permite actualizar los detalles de un país existente en la base de datos según su ID. Si el país existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados del país.

Eliminar un País: La acción DeleteCountry permite eliminar un país de la base de datos según su ID. Si el país existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador también asegura que las operaciones de creación, actualización y eliminación de países estén protegidas mediante la autorización. Se requiere el rol de "Administrador" para realizar estas operaciones.


**MeetingRoomsController.cs**
<br>

Este controlador se encarga de administrar las operaciones relacionadas con las salas de reuniones en la aplicación. Sus acciones principales incluyen:

Obtener Todas las Salas de Reuniones: La acción GetAllRooms permite recuperar todas las salas de reuniones disponibles en la base de datos y devuelve una respuesta con la lista de salas de reuniones en formato JSON.

Obtener Sala de Reuniones por ID: La acción GetRoomById permite obtener detalles específicos de una sala de reuniones por su identificador único. Si la sala de reuniones existe, se devuelve una respuesta con los detalles de la sala en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Obtener Salas de Reuniones por ID de Oficina: La acción GetMeetingRoomsByOfficeId permite recuperar todas las salas de reuniones asociadas a una oficina específica, identificada por su ID. Si existen salas de reuniones para la oficina proporcionada, se devuelve una respuesta con la lista de salas de reuniones en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Agregar una Sala de Reuniones: La acción AddRoom permite agregar una nueva sala de reuniones a la base de datos. Antes de agregar la sala de reuniones, se valida y se asigna un valor inicial al meetingRoomId. Una vez agregada la sala de reuniones, se devuelve una respuesta "Created" con los detalles de la sala agregada.

Actualizar una Sala de Reuniones: La acción UpdateRoom permite actualizar los detalles de una sala de reuniones existente en la base de datos según su ID. Si la sala de reuniones existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados de la sala de reuniones.

Eliminar una Sala de Reuniones: La acción DeleteRoom permite eliminar una sala de reuniones de la base de datos según su ID. Si la sala de reuniones existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre las salas de reuniones en la aplicación. Las operaciones de creación, actualización y eliminación de salas de reuniones no requieren autorización específica en este caso.


**OfficesController.cs**
<br>

Este controlador se encarga de administrar las operaciones relacionadas con las oficinas en la aplicación. Las principales funciones de este controlador incluyen:

Obtener Todas las Oficinas: La acción GetAllOffices permite recuperar todas las oficinas disponibles en la base de datos y devuelve una respuesta con la lista de oficinas en formato JSON.

Obtener Oficina por ID: La acción GetOfficeById permite obtener detalles específicos de una oficina por su identificador único. Si la oficina existe, se devuelve una respuesta con los detalles de la oficina en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Obtener Oficinas por ID de Ciudad: La acción GetOfficesByCityId permite recuperar todas las oficinas asociadas a una ciudad específica, identificada por su ID. Si existen oficinas para la ciudad proporcionada, se devuelve una respuesta con la lista de oficinas en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Agregar una Oficina: La acción AddOffice permite agregar una nueva oficina a la base de datos. Antes de agregar la oficina, se valida y se asigna un valor inicial al officeId. Una vez agregada la oficina, se devuelve una respuesta "Created" con los detalles de la oficina agregada.

Actualizar una Oficina: La acción UpdateOffice permite actualizar los detalles de una oficina existente en la base de datos según su ID. Si la oficina existe, se actualizan los datos proporcionados y se devuelve una respuesta con los detalles actualizados de la oficina.

Eliminar una Oficina: La acción DeleteOffice permite eliminar una oficina de la base de datos según su ID. Si la oficina existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre las oficinas en la aplicación. Las operaciones de creación, actualización y eliminación de oficinas no requieren autorización específica en este caso.


**ReservesController.cs**
<br>

Este controlador se encarga de gestionar las operaciones relacionadas con las reservas de salas de reuniones en la aplicación. Las acciones principales que realiza incluyen:

Obtener Todas las Reservas: La acción GetAllReserves permite recuperar todas las reservas disponibles en la base de datos y devuelve una respuesta con la lista de reservas en formato JSON.

Obtener Reserva por ID: La acción GetReserveById permite obtener detalles específicos de una reserva por su identificador único. Si la reserva existe, se devuelve una respuesta con los detalles de la reserva en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Obtener Reservas por ID de Usuario: La acción GetReservesByUserId permite recuperar todas las reservas asociadas a un usuario específico, identificado por su ID. Si existen reservas para el usuario proporcionado, se devuelve una respuesta con la lista de reservas en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Obtener Reservas por ID de Sala de Reuniones: La acción GetReservesByMeetingRoomId permite recuperar todas las reservas asociadas a una sala de reuniones específica, identificada por su ID. Si existen reservas para la sala de reuniones proporcionada, se devuelve una respuesta con la lista de reservas en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Agregar una Reserva: La acción AddReserve permite agregar una nueva reserva de sala de reuniones a la base de datos. Antes de agregar la reserva, se verifica si hay solapamientos con otras reservas existentes. Si no hay solapamientos, se crea la nueva reserva y se devuelve una respuesta "Ok". Si hay solapamientos, se devuelve un mensaje de error "BadRequest".

Actualizar una Reserva: La acción UpdateReserve permite actualizar los detalles de una reserva existente en la base de datos según su ID. Antes de realizar la actualización, se verifica si la nueva reserva entra en conflicto con otras reservas existentes. Si no hay conflictos, se actualizan los detalles y se devuelve una respuesta "Ok". Si hay conflictos, se devuelve un mensaje de error "BadRequest".

Eliminar una Reserva: La acción DeleteReserve permite eliminar una reserva de la base de datos según su ID. Si la reserva existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre las reservas de salas de reuniones en la aplicación, garantizando que se eviten conflictos de programación y se verifiquen las disponibilidades de las salas.

**UsersController.cs**
<br>

Este controlador se encarga de administrar las operaciones relacionadas con los usuarios en la aplicación. Sus acciones principales incluyen:

Obtener Todos los Usuarios: La acción GetAllUsers permite recuperar todos los usuarios disponibles en la base de datos y devuelve una respuesta con la lista de usuarios en formato JSON.

Obtener Usuario por ID: La acción GetUserById permite obtener detalles específicos de un usuario por su identificador único. Si el usuario existe, se devuelve una respuesta con los detalles del usuario en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Obtener Usuario por Nombre de Usuario: La acción GetUserByUsername permite obtener detalles de un usuario por su nombre de usuario. Si el usuario existe, se devuelve una respuesta con los detalles del usuario en formato JSON; de lo contrario, se devuelve un código de respuesta "NotFound".

Actualizar Usuario: La acción UpdateUser permite actualizar los detalles de un usuario existente en la base de datos según su ID. Se admite la actualización del nombre de usuario, el correo electrónico y la contraseña del usuario. La acción valida si se proporciona la contraseña actual y la nueva contraseña antes de cambiarla. Si la actualización es exitosa, se devuelve una respuesta "Ok" con los detalles actualizados del usuario. Si hay errores durante la actualización, se devuelve una respuesta "BadRequest" con los errores específicos.

Eliminar Usuario: La acción DeleteUser permite eliminar un usuario de la base de datos según su ID. Si el usuario existe, se elimina de la base de datos y se devuelve una respuesta "NoContent" para indicar que la operación se ha completado con éxito.

Este controlador proporciona una interfaz API para acceder y manipular información sobre los usuarios en la aplicación. Permite realizar operaciones como obtener, actualizar y eliminar usuarios, así como buscar usuarios por su nombre de usuario o ID. También proporciona funcionalidad de cambio de contraseña de usuario cuando se proporcionan tanto la contraseña actual como la nueva contraseña.





