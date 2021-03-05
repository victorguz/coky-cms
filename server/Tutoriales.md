# Primeros pasos en un VPS

## Iniciar sesión a traves de SSH

> ssh user@ipservidor

## Actualiza el servidor

> sudo apt update
> sudo apt dist-upgrade

## Crea un nuevo usuario que requiera "sudo"

> adduser admin
> usermod -aG sudo admin

# Instalación de HestiaCP

> sudo apt install curl zip unzip openssl git wget
> export HESTIA_DOMAIN="sample.com"
> export HESTIA_EMAIL="admin@sample.com"
> export HESTIA_PASSWORD="hestiacp8083pass"
> export HESTIA_PHP_VERSION_MODULES="*"
> #Descargar
> wget https://raw.githubusercontent.com/hestiacp/hestiacp/release/install/hst-install.sh
> #Instalar
> bash hst-install.sh --apache yes --nginx yes --phpfpm yes --multiphp yes --vsftpd yes --proftpd no --named yes --mysql yes --postgresql no --exim yes --dovecot yes --clamav yes --spamassassin yes --iptables yes --fail2ban yes --quota yes --api yes --lang en --interactive yes --hostname $HESTIA_DOMAIN --email $HESTIA_EMAIL --password $HESTIA_PASSWORD 

## Instalar modulos php y apache piecesphp

> #Instalar módulos
> sudo apt install php$HESTIA_PHP_VERSION_MODULES-{common,pdo,xml,ctype,mbstring,fileinfo,gd,mysqli,sqlite3,zip,xsl,xmlwriter,xmlreader,curl,mcrypt}
> #Módulos apache
> sudo a2enmod rewrite headers ssl
> #Reiniciar apache
> sudo service apache2 restart

## Configuración de MariaDB

> #Moverse al directorio de usuario
> cd ~

> #Medidas de seguridad
> mysql_secure_installation
> #prompt: Enter current password for root (enter for none): (PRESIONA ENTER)
> #prompt: Switch to unix_socket authentication [Y/n]: n
> #prompt: Change the root password? [Y/n]: n (El usuario root quedará sin contraseña porque es preferible no usarlo por seguridad.)
> #prompt: Remove anonymous users? [Y/n]: Y
> #prompt: Disallow root login remotely? [Y/n]: Y (Desactivar conexiones externas)
> #prompt: Remove test database and access to it? [Y/n]: Y
> #prompt: Reload privilege tables now? [Y/n]: Y

## Crear usuario para proyectos MariaDB

> #Entrar en consola de mariadb
> mysql 

> -- Crear general (el usuario y la contraseña son de ejemplo):
> CREATE USER 'admin_general'@'localhost' IDENTIFIED BY 'pPz_afcad6464e_lr_m646464am';
> -- Otorgar permisos globales al usuario
> GRANT ALL PRIVILEGES ON *.* TO 'admin_general'@'localhost';
> -- Refrescar privilegios:
> FLUSH PRIVILEGES;
> -- Salir de la consola de mariadb
> exit;

## Configuración del firewall 

Por defecto los VPS vienen con todos los puertos abiertos. Para evitar ataques hay que configurar la tabla de puertos para bloquear aquellos que no se vayan a usar.

*Es necesario iniciar sesión desde SSH*

1. Instala iptables
> sudo apt-get install iptables

2. Comprobación del estado actual de los iptables
> sudo iptables -L -v

Lo cual traerá un resultado como el siguiente si aún no hemos configurado nada:

> Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
> pkts bytes target     prot opt in     out     source             destination         
> Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
> pkts bytes target     prot opt in     out     source             destination         
> Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
> pkts bytes target     prot opt in     out     source             destination

3. Habilitar el tráfico en localhost
> sudo iptables -A INPUT -i lo -j ACCEPT

4. Habilitación de conexiones en el puerto HTTP, SSH y SSL
> sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
> sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
> sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

5. (Opcional) Filtrado de paquetes basados en la fuente
 - Bloquear paquetes desde una IP especifica:
 > sudo iptables -A INPUT -s 192.168.1.3 -j DROP
 - Bloquear paquetes en un rango de IP's
 > sudo iptables -A INPUT -m iprange --src-range 192.168.1.100-192.168.1.200 -j DROP
 - Cambia *DROP* por *ACCEPT* para permitir los paquetes. 

6. Eliminar el resto del tráfico bloqueando los demás puertos
> sudo iptables -A INPUT -j DROP

7. (Precaución) Eliminación de reglas
En caso que quieras eliminar todas las reglas de iptable utiliza:
> sudo iptables -F
Para eliminar solo uno, utuliza *sudo iptables -L --line-numbers* para ver el numero de linea que quieres borrar. Y luego:
>sudo iptables -D INPUT **3**
*Donde **3** es el numero de linea que quieres borrar...*

8. Cambios persistentes
Actualmente los datos están en memoria, se perderán al reiniciar. Debes usar el siguiente comando para que queden predeterminados en el sistema:
> sudo /sbin/iptables-save
