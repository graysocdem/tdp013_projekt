Välkomna till Oskars (oskan896) och Emils (emigu041) webbprogrammeringsprojekt!

Setup:
Starta MongoDB

Kontrollera att du har alla paket du behöver genom att skriva "npm install" i /server och /frontend.

Denna applikation använder sig av https, vilket kan vara lite krångligt att
sätta upp. Vi har använt firefox men andra webbläsare borde också fungera.

På firefox:

* Gå in i settings och sök på "certificates". 

* Klicka på "view certificates", sedan på "authorities" och sist på "import". 

* Navigera sedan till /server/certs och välj "server.cert".

* Checka alternativet för att tillåta identifiering av webbplatser.

* Starta servern genom att gå in i /server och skriva "node server.js".

* I firefox, skriv in "https://localhost:3443". Du bör nu se en ruta som avråder dig att fortsätta.

* Klicka på "avancerat" och sedan "Acceptera riksen och fortsätt". 

* Du kan nu stänga ner fliken.

För att starta applikationen, gå först in i /server och skriv "node server.js".
Gå sedan in i /frontend och skriv "npm start". När den frågar om du vill köra
på en annan port, skriv "y". Applikationen borde nu startas i firefox, men 
du kan annars gå in på den via "http://localhost:3001".

För att köra testerna, gå in i /server och skriv "npm test".
