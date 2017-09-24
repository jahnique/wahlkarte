const SZENARIEN = [
  {
    "id": "zweitstimme",
    "titel": "Zweitstimme",
    "untertitel": "Hier findest du die Wahlergebnisse in der klassischen Ansicht",
    "beschreibung": "In der klassischen Ansicht sind die Wahlbezirke in der Farbe der meistgewählten Partei eingefärbt.<br><br>Weitere Analysen: Zum Beispiel die <a href=\"#erststimme\">Erststimmen</a>, <a href=\"#wechselwaehler\">Wechselwähler*innen</a>, eine Analyse zu <a href=\"#erst-vs-zweit\">Erststimmen vs. Zweitstimmen</a> und <a href=\"#migration\">Migration</a>. Klick dich einfach mit den Pfeilen durch! :)",
    "getAnalyse": getAnalyseForWahlergebnisse,
  },
  {
    "id": "erststimme",
    "titel": "Erststimme",
    "untertitel": "Übersicht der gewählten Kandidaten",
    "beschreibung": "Die Wahlbezirke sind in der Farbe der Partei des meistegwählten Kandidaten gefärbt.",
    "getAnalyse": getAnalyseForErststimmen,
  },
  {
    "id": "wechselwaehler",
    "titel": "Wechselwähler",
    "untertitel": "Welche Wahlbezirke haben die Farbe gewechselt?",
    "beschreibung": "Die Wahlbezirke, in denen die meistgewählte Partei im Vergleich zur Bundestagswahl 2013 gewechselt ist, sind hier hervorgehoben.",
    "getAnalyse": getAnalyseForWechselwaehler,
  },
  {
    "id": "hunde",
    "titel": "Hundebesitzer",
    "untertitel": "Wie haben Hundebesitzer gewählt?",
    "beschreibung": "Die Wahlbezirke mit den meisten Hundebesitzern werden farblich hervorgehoben.",
    "getAnalyse": dummyAnalyse,
  },
  {
    "id": "erst-vs-zweit",
    "titel": "Erst- vs. Zweitstimme",
    "untertitel": "Wo unterscheiden sich die Sieger?",
    "beschreibung": "Hervorgehoben sind die Wahlbezirke, in denen sich die meistgewählte Partei von der Partei des meistegwählten Kandidaten unterscheiden.",
    "getAnalyse": getAnalyseForErstVsZweit,
  },
  {
    "id": "migration",
    "titel": "Migrations<wbr>hintergrund",
    "untertitel": "Wird in Wahlbezirken mit mehr Menschen mit Migrationshintergrund anders gewählt?",
    "beschreibung": "Hervorgehoben sind die Wahlbezirke, in denen mehr Menschen mit Migrationshintergrund leben.",
    "getAnalyse": dummyAnalyse,
  },
  {
    "id": "aenderung",
    "titel": "Größte Änderung",
    "untertitel": "Welche Partei hat am meisten zugelegt?",
    "beschreibung": "Die Wahlbezirke sind in der Farbe der Partei eingefärbt, die im Vergleich zur letzten Bundestagswahl absolut betrachtet die größten Stimmgewinne hat.",
    "getAnalyse": getAnalyseGroessteAenderung,
  },
  {
    "id": "ungueltig-erst",
    "titel": "Ungültige Erststimmen",
    "untertitel": "Wie viele ungültige Erststimmen gibt es in den jeweiligen Wahlbezirken?",
    "beschreibung": "Je dunkler die Farbe des Wahlbezirks ist, desto mehr ungültige Erststimmen gab es.",
    "getAnalyse": dummyAnalyse,
  },
  {
    "id": "ungueltig-zweit",
    "titel": "Ungültige Zweitstimme",
    "untertitel": "Wie viele ungültige Zweitstimmen gibt es in den jeweiligen Wahlbezirken?",
    "beschreibung": "Je dunkler die Farbe des Wahlbezirks ist, desto mehr ungültige Zweitstimmen gab es.",
    "getAnalyse": dummyAnalyse,
  },
  {
    "id": "nichtwaehler-win",
    "titel": "Wahlbezirke in denen Nichtwähler gewonnen hätten",
    "untertitel": "Hätten Nichtwähler das Ergebnis des Wahlbezirks ändern können?",
    "beschreibung": "In manchen Bezirken liegt die Wahlbeteiligung bei weniger als 50%. In diesen hätten die Nichtwähler als der Ergebnis verändern können.",
    "getAnalyse": getNichtWaehlerWin,
  }
]
