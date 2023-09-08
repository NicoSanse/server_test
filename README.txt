Questo piccolo server si appoggia alla libreria fastify e usa il JWT.
I dati vengono scritti e letti dal file json users.json grazie al modulo fs.

Ci sono sei endpoint deputati a mostrare i dati, eliminarli, aggiungerli o modificarli.
In particolare alcune operazioni specifiche per gli utenti sono possibili solo dopo aver eseguito il login,
come la delete. Questo perchè occorre un token. Il token viene rilasciato solo se si entra nell'endpoint di login
con un ID registrato. Siccome la variabile 'token' è globale e unica, è necessario che l'id usato per generarlo e l'id 
della richiesta coincidano, altrimenti è possibile eseguire operazioni su diversi utenti usando un solo token.
Questo approccio permette che un solo utente alla volta sia loggato, ma è facilmente estendibile con una lista
di tokens su cui lavorare.

Nell'endopoint register vengono forniti nel body le informazioni necessarie per creare il nuovo user
Nell'endpoint di login viene fornito nel body il solo id dell'utente che intende loggare e se trovato rilascia il token
In tutti gli altri endpoint l'id dell'utente è passato come parametro nell'url, mentre il body è vuoto. Per questi endpoint 
l'approccio è simile: verifico il token; ciclo sul file json per trovare l'utente corretto; verifico che l'id del token e 
l'id dell'utente trovato coincidano; eseguo l'operazione del caso.