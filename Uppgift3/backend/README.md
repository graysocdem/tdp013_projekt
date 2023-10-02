Vi har valt att följa specifikation #1.

Spara meddelanden 	    /messages 	    POST 	    application/json    { message: "My tweet" } HTTP 200
Markera som läst/oläst 	/messages/{id} 	PATCH 	    application/json    { read: false }         HTTP 200
Hämta meddelande 	    /messages/{id} 	GET 		application/json
Hämta alla meddelande 	/messages 	    GET 		application/json