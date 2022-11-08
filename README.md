# Validation Übung

### Aufgabe
Ihr habt unterschiedliche Endpoints. Schreibt Validierungen für diese:
    - Order-erstellen:
        - überprüft ob der Kommentar ein String ist
        - überprüft das die records ein Array sind 
        - überprüft, ob der User und alle records in der Datenbank vorhanden sind
    - `patch`-Order:
        - überprüft ob die id vorhanden ist
    - Record erstellen:
        - überprüft ob der `title` vorhanden und ein `String` ist 
        - überprüft ob der `price` vorhanden und eine `Number` ist 
        - überprüft ob der Genre ein String ist und ob er entweder `Rock`, `Classic` oder `Punk` lautet
    - User erstellen:
        - überprüft ob `name`, `password` `Strings` sind und ob `email` eine Email ist
        - überprüft, dass die Email noch nicht in der Datenbank existiert
        - entfernt die eventuell vorhandene Leerzeichen vor und hinter dem Namen
        - überprüft das `name` kein leerer String ist
        - checkt ob das Passwort mind. 7 Zeichen lang ist und sowohl Klein- & Großbuchstaben sowie Zahlen enthält
    
Jede Validierung sollte eine entsprechende Fehlermeldung ausgeben. Zum Schluss sollte eine Liste aller Fehler zurückgegeben werden. 

### How to Start
1. Schreibt eine eigene .env Datei für die Verbindung mit der Datenbank.
2. Führt das Seed Skript aus, um Datensätze zu bekommen.
3. Schreibt eine Validierungsmiddleware (zuerst ohne Regeln) und bindet diese in eure Routen ein. Überprüft mit `console.log()` dass eure Routen noch funktionieren.
4. Nun könnt ihr anfangen die Regeln zur Validierung zu schreiben und an eure Validierungmiddleware zu übergeben. 
