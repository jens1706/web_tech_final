<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "joke-generator";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen der Verbindung
if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

// Weitere Abfragen und Operationen können hier durchgeführt werden
// SQL-Abfrage für den zufälligen Witz
$sql = "SELECT 'joke_text' FROM 'jokes' ORDER BY RAND() LIMIT 1";

// Die Abfrage ausführen
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Einen zufälligen Witz aus den Ergebnissen auswählen
    $row = $result->fetch_assoc();
    $randomJoke = $row["joke_text"];

    // Das Ergebnis als JSON zurückgeben
    echo json_encode(array("joke" => $randomJoke));
} else {
    // Kein Witz gefunden
    echo json_encode(array("joke" => "No joke found"));
}

// Verbindung schließen
$conn->close();
?>
