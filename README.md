# Calcettistiche frontend
Parte frontend dell'applicazione "calcettistiche".<br>
Applicazione in Angular che all'avvio ci presenta la home page che a sua volta invita a loggarci oppure a registrare un nuovo utente.<br>
Anche se non si è loggati si potrà comunque accedere alla lista delle partite registrate e alla lista dei giocatori registrati con la possibilità di vedere e confrontare le varie statistiche.<br>
Se ci si logga si ha la possibilità di aggiungere e modificare partite, scegliendo i partecipanti e indicando goal e data di disputazione della partita.<br>

Cliccando sul pulsante in angolo in alto a destra si apre il menù con il quale è possibile muoversi al'interno dell'applicazione.<br>

## Installazione
Installare sul prorpio sistema:
- Node.js (e relativo package manager npm)
- MongoDB
- Angular CLI
  
Dopo aver scaricato il respository installare le dipendenze con "npm install".<br>
Nella cartella "src/environments" ci sono i file per modificare l'url a cui fa riferimento l'applicazione; nel caso non venissero modificati il parametro predefinito é:
 - serverUrl: localhost:3000

Far partire l'applicazione col comando "ng serve"

>[!IMPORTANT]
>Se l'applicazione viene lanciata con "ng serve" il file nella cartella "src/environments" che viene caricato sarà il file "environments.development.ts"

## Login e statistiche giocatore
Effettuato il login l'utente viene portato alla propria pagina delle statistiche.<br>
Le statistiche comprendono: Partite giocate, vinte, perse e pareggiate, tengono conto della squadra con cui ogni partita è stata disputata, tengono traccia dei goal dividendoli anche per partita e suqdra.<br>

## Statistiche partita
Le satatisdtiche della singola partita comprendono le due formazioni sfidanti, il numero dei goal e chi li ha messi a referto, la data di disputazione e gli amministratori, cioè coloro che hanno la possibilità di modificare la partita.<br>
Gli amministratori possono essere aggiunti durante la creazione della partita, ma in ogni caso il creatore della partita sarà amministratore e non potrà essere rimosso da questo ruolo.<br>
Sono gli utenti loggati hanno la possibilit di creare partite<br>

## Utenti non loggati
Gli utenti non loggati o che non hanno un account registrato possono scorrere comunque tra la lista di partite e la lista degli utenti attivi<br>
Cliccando su uno di questi può anche accedere alle statistiche.<br> 

## Test
L'applicazione può essere testata al seguente indirizzo: [ https://calcettistiche.web.app]( https://calcettistiche.web.app)
