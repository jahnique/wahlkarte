/**
 *  Ermittelt die Farbe fuer gegeben Parteinamen
 * @param {String} partyName
 */
function getColorForParty(partyName) {
    let party = findParty(partyName)

    if (party !== null){
        return party.color;
    } else {
        console.error("Party not found!")
    }
}

/**
 *  Ermittelt die Partei mit den meisten Stimmen im Wahlkreis
 * @param {Object} properties
 */
function getAnalyseForWahlergebnisse(properties) {
  var zweitstimmen = properties.btw2017.zweitstimme;
  var max = 0;
  var partyName = null;
  zweitstimmen.forEach(function(party) {
     if (max < party.stimmen) {
         max = party.stimmen;
         partyName = party.partei;
     }
  });

  if (max >= 0 && partyName !== null) {
    var color = getColorForParty(partyName);
    return {
      "color": color,
      "tooltipShowValue": "Sieger: " + partyName + " mit " + max + " Stimmen",
    }
  }
}

function getAnalyseForKleinparteien(properties) {
  var zweitstimmen = properties.btw2017.zweitstimme;
  var zweitstimmenOhneCDUSPD = zweitstimmen.filter(parteiergebnis => parteiergebnis.partei.toLowerCase() != "cdu" && parteiergebnis.partei.toLowerCase() != "spd");
  var max = 0;
  var partyName = null;
  zweitstimmenOhneCDUSPD.forEach(function(party) {
     if (max < party.stimmen) {
         max = party.stimmen;
         partyName = party.partei;
     }
  });

  if (max >= 0 && partyName !== null) {
    var color = getColorForParty(partyName);
    return {
      "color": color,
      "tooltipShowValue": "Größte Kleinpartei: " + partyName + " mit " + max + " Stimmen",
    }
  }
}

/**
 *  Ermittelt die Partei des Kandidaten mit den meisten Stimmen im Wahlkreis
 * @param {Object} properties
 */
function getAnalyseForErststimmen(properties) {
  var erststimmen = properties.btw2017.erststimme;
  var max = 0;
  var sieger = null;
  erststimmen.forEach(function(kandidat) {
     if (max < kandidat.stimmen) {
         max = kandidat.stimmen;
         sieger = kandidat;
     }
  });

  if (max >= 0 && sieger !== null) {
    var color = getColorForParty(sieger.partei);
    return {
      "color": color,
      "tooltipShowValue": "Sieger: " + sieger.name + " (" + sieger.partei + ")"+ " mit " + max + " Erststimmen",
    }
  }
}

/**
 *  Findet Wahlkreise in denen der Gewinner der Erststimme einer anderen Partei angehört als die Partei, die die Zweitstimme gewonnen hat.
 * @param {Object} properties
 */
function getAnalyseForErstVsZweit(properties) {
  var erststimmen = properties.btw2017.erststimme;
  var erststimme_max = 0;
  var erststimme_partyName = null;
  erststimmen.forEach(function(kandidat) {
    if (erststimme_max < kandidat.stimmen) {
      erststimme_max = kandidat.stimmen;
      erststimme_partyName = kandidat.partei;
    }
  });

  var zweitstimmen = properties.btw2017.zweitstimme;
  var zweitstimme_max = 0;
  var zweitstimme_partyName = null;
  zweitstimmen.forEach(function(kandidat) {
    if (zweitstimme_max < kandidat.stimmen) {
      zweitstimme_max = kandidat.stimmen;
      zweitstimme_partyName = kandidat.partei;
    }
  });

  if (erststimme_max >= 0 && erststimme_partyName !== null && zweitstimme_max >= 0 && zweitstimme_partyName !== null) {
    var color = getColorForParty(erststimme_partyName);
    if (erststimme_partyName != zweitstimme_partyName) {
      return {
        "color": color,
        "tooltipShowValue": "Sieger der Erststimmen: " + erststimme_partyName + " mit " + erststimme_max + " Stimmen</br>Sieger der Zweitstimmen: " + zweitstimme_partyName + " mit " + zweitstimme_max + " Stimmen",
      }
    } else {
      return {
        "color": "#FFF",
        "tooltipShowValue": "Die Partei '" + erststimme_partyName + "' hat sowohl die Erststimme als auch die Zweitstimme gewonnen.",
      }
    }
  }
}


function getAnalyseGroessteAenderung(properties) {
  if (properties.btw2013.zweitstimme) {
    var btw2013_zweitstimmen = properties.btw2013.zweitstimme;
    var btw2017_zweitstimmen = properties.btw2017.zweitstimme;
    var winner_loser = {};
    btw2013_zweitstimmen.forEach(function(partei) {
      winner_loser[partei.partei] = partei.stimmen;
    });
    btw2017_zweitstimmen.forEach(function(partei) {
      if (winner_loser[partei.partei]) {
        winner_loser[partei.partei] = winner_loser[partei.partei] - partei.stimmen;
      }
    });
    var max = -1, parteiname_winner = '';
    Object.keys(winner_loser).forEach(function(parteiname){
      if (Math.abs(winner_loser[parteiname]) > max) {
        max = winner_loser[parteiname];
        parteiname_winner = parteiname;
      }
    });
    var color = getColorForParty(parteiname_winner);
    return {
      "color": color,
      "tooltipShowValue" : "Die Partei '" + parteiname_winner + "' hatte die größte Veränderung mit " + max + " Stimmen"
    }
  } else {
    return {
      "color": "#ccc",
      "tooltipShowValue": "In diesem Gebiet wurden die Wahlbezirke im Vergleich zur Bundestagswahl 2013 stark umstrukturiert, so dass kein Vergleich möglich ist"
    }
  }
}

/**
 *  Ermittelt die Partei mit den meisten Stimmen im Wahlkreis
 * @param {Object} properties
 */
function getAnalyseForWechselwaehler(properties) {
  if (properties.btw2013.zweitstimme) {
    var zweitstimmen2013 = properties.btw2013.zweitstimme;
    var zweitstimmen2017 = properties.btw2017.zweitstimme;
    var sieger2013 = getParteiMitMeistenStimmen(zweitstimmen2013);
    var sieger2017 = getParteiMitMeistenStimmen(zweitstimmen2017);

    var color = '#fff';
    var tooltip = "Kein Wechsel";
    if (sieger2013.party.name.toLowerCase() !== sieger2017.party.name.toLowerCase()) {
      color = getColorForParty(sieger2017.party.name);
      tooltip = "Wechsel von " + sieger2013.party.name + " zu " + sieger2017.party.name;
    }
    return {
      "color": color,
      "tooltipShowValue": tooltip,
    }
  } else {
    return {
      "color": "#ccc",
      "tooltipShowValue": "In diesem Gebiet wurden die Wahlbezirke im Vergleich zur Bundestagswahl 2013 stark umstrukturiert, so dass kein Vergleich möglich ist"
    }
  }
}

function getParteiMitMeistenStimmen(zweitstimmen) {
  var max = 0;
  var partyName = null;
  zweitstimmen.forEach(function(party) {
     if (max < party.stimmen) {
         max = party.stimmen;
         partyName = party.partei;
     }
  });
  var gewinner = findParty(partyName);
  return {
    "party": gewinner,
    "stimmen": max,
  };
}

/**
 * @param {Object} properties
 */
function getAnalyseForUngueltigeStimmen(properties) {
  var erststimmen = properties.btw2017.erststimme;
  var zweitstimmen = properties.btw2017.zweitstimme;

  var gesamtstimmen = 2 * properties.btw2017["waehler/-innen"];
  var gueltigeStimmen = 0;
  erststimmen.forEach(function(kandidat) {
       gueltigeStimmen += kandidat.stimmen;
  });
  zweitstimmen.forEach(function(partei) {
       gueltigeStimmen += partei.stimmen;
  });
  var ungueltigeStimmen = gesamtstimmen - gueltigeStimmen;

  var prozentualUngueltigeStimmen = ungueltigeStimmen / gesamtstimmen;
  var opacity = prozentualUngueltigeStimmen * 50;
  var color = 'rgba(26, 188, 156, ' + opacity + ')';
  return {
    "color": color,
    "tooltipShowValue": Math.round(prozentualUngueltigeStimmen * 100000) / 1000 + " % ungültige Stimmen (" + ungueltigeStimmen + " Stimmen)",
  }
}

/**
 *  Ermittelt die Partei mit den meisten Stimmen im Wahlkreis
 * @param {Object} properties
 */
function getAnalyseForUngueltigeZweitstimmen(properties) {
  var zweitstimmen = properties.btw2017.zweitstimme;
  var gesamtstimmen = properties.btw2017["waehler/-innen"];

  var tooltip = "Kein Wechsel";
  var gueltigeStimmen = 0;
  zweitstimmen.forEach(function(party) {
       gueltigeStimmen += party.stimmen;
  });
  var ungueltigeStimmen = gesamtstimmen - gueltigeStimmen;
  var prozentualUngueltigeStimmen = ungueltigeStimmen / gesamtstimmen;
  var opacity = prozentualUngueltigeStimmen * 50;
  var color = 'rgba(26, 188, 156, ' + opacity + ')';
  return {
    "color": color,
    "tooltipShowValue": Math.round(prozentualUngueltigeStimmen * 100000) / 100000 + " % ungültige Zweitstimmen (" + ungueltigeStimmen + " Stimmen)",
  }
}

/**
 *  Ermittelt die Partei mit den meisten Stimmen im Wahlkreis
 * @param {Object} properties
 */
function getAnalyseForKleinsterAbstand(properties) {
  var zweitstimmen = properties.btw2017.zweitstimme;
  var gesamtstimmen = properties.btw2017["waehler/-innen"];
  var erster = getParteiMitMeistenStimmen(zweitstimmen);
  var zweitstimmenOhneErsten = zweitstimmen.filter(parteiergebnis => parteiergebnis.partei.toLowerCase() !== erster.party.name.toLowerCase());
  var zweiter = getParteiMitMeistenStimmen(zweitstimmenOhneErsten);
  var differenz = erster.stimmen - zweiter.stimmen;

  if (differenz >= 0) {
    var prozentual = differenz / gesamtstimmen;
    var opacity = 1 - (prozentual * 10);
    var color = 'rgba(26, 188, 156, ' + opacity + ')';
    return {
      "color": color,
      "tooltipShowValue": "Abstand von " +
      erster.party.name + " zu " + zweiter.party.name + ": " +
      Math.round(prozentual * 100000) / 1000 + " % (" + differenz + " Stimmen)",
    }
  }
}
