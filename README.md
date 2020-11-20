# Coky CMS.

*Es un backend ligero y funcional que puede ser utilizado para desarrollar tanto apis como aplicaciones web completas.* Coky CMS hace fácil el desarrollo de API's dado que en su núcleo contiene todo lo necesario para que crear un servicio sea cuestión de unas cuantas líneas.
También es posible utilizar Coky para hacer una aplicación web completa (backend y frontend), solo tendría que elegir el marco de trabajo que desee, por ejemplo *headlebars* o cualquier otro.

## Qué tiene Coky CMS
**No necesita saber mucho:** Con solo escanear el código de Coky podrá darse cuenta de cómo está hecho. No tiene que rebuscar demasiado una función. Y lo mejor es que puede editarlas cuando quiera *(aunque recomendamos que crees tus propias funciones después de las que ya hemos añadido por tí)*.
**Ya incluye lo necesario:** No va a requerir horas y horas de desarrollo, documentación y pruebas. La filosofía de Coky es "ser lo más parecido a plug and play". Estas son algunas de las cosas que incluye:
- ***Todas las consultas clave:*** Coky ya trae por defecto todas las consultas clave, solo debe crear un nuevo módulo y de inmediato podrá dirigirse a las rutas all, orderby, by (getbycolumn), oneby, create, update, delete y describe totalmente funcionales.
- ***Mapeador:*** Los mapeadores ayudan a la insersión de los datos. Esto es fundamental cuando queremos que los datos sean válidos o cumplan con ciertos requerimientos
- ***Checks:*** Por defecto Coky trae varias funciones de evaluación de datos en un lenguaje claro. Por ejemplo, si quieres evaluar si un email es válido utiliza isEmail(value:string):boolean. O si quieres evaluar una contraseña robusta utiliza isPassword(value:string):boolean.
- ***Funciones básicas:*** Quieres saber hace cuánto ocurrió un evento, usa timeAgo(date:Date):string, quieres guardar un documento, utiliza saveFile(file:File). Y así hay muchas otras funciones básicas que te serán de mucha ayuda.
**No es un ORM:** Aunque Coky fue diseñado con algunas de las cosas que un ORM representa, como el Mapper y Consultas básicas, Coky no es un ORM porque ha preferido dejar la flexibilidad de SQL para que usted como desarrollador no tenga que aprender cómo usarlo. Además puede estar seguro que las consultas son lo más simple y práctico posible.
**Módulos:** Coky fue pensado para ser una aplicación modular, organizada, de código limpio y fácil de entender. Un módulo puede ser una API o tener también un frontend. (Ref 5)
### Crear un nuevo API
A una API, en Coky, le llamamos módulo. Dado que no es solo un archivo sino una carpeta específica para cada API, la cual contiene al menos 3 archivos, modelo, controlador y servicio. Si usted desea crear un nuevo módulo, solo debe copiar cualquier otro preexistente (recomendamos "productos" que viene incluído o mirar el tutorial). Así solo debe modificar los nombres a su gusto y las importaciones. Si ha dejado el resto como está, Coky debe funcionar bien en todas sus consultas básicas del controlador.

### Crear una nueva consulta SQL
Aunque Coky ya trae por defecto algunas de las consultas más básicas para que usted solamente necesite descargar y ejecutar el código, con Coky usted podrá realizar nuevas consultas de manera rápida en tres pasos: 

- Crear un nuevo método en el controlador
- Llamar este método desde su servicio de rutas
- Incluir su servicio en la configuración de rutas (no es necesario si ya está incluído)

*Disfrute!*.

(Ref 5): Cada API contiene una carpeta a la que llamamos *módulo*. Dado que no es solo un archivo sino una carpeta específica para cada API. Creemos que llamarlo API podría implicar que es solamente un servicio de backend, pero coky también puede ser usado para frontend. Un ejemplo de los archivos básicos para la tabla usuarios debería ser:
- users.model.ts: Derivado de la clase Model. Posee los campos y métodos necesarios para cada usuario. Es aquí donde se especifica el Mapper.
- users.controller.ts: Derivado de la clase Controller. Posee los métodos que realizan las consultas a la base de datos. Solo pueden ser usados desde un enrutador
- users.service.ts: Derivado de la clase Service. Posee el enrutador y las llamadas a todos los métodos del controlador.
- users.view.html: Archivo html atraves del cual se interactúa con el usuario y con la información. Un módulo puede tener varios html, para lo cual recomendamos hacer una subcarpeta llamada "html".

