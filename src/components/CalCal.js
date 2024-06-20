document.addEventListener('DOMContentLoaded', function() {

    function createInputField(id, placeholder) {
        var input = document.createElement('input');
        input.type = 'text';
        input.id = id;
        input.placeholder = placeholder;
        return input;
    }

    function createDropdown(id, placeholder, options) {
        var select = document.createElement('select');
        select.id = id;

        var placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.text = placeholder;
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        select.appendChild(placeholderOption);

        options.forEach(function(optionText) {
            var option = document.createElement('option');
            option.value = optionText;
            option.text = optionText;
            select.appendChild(option);
        });

        return select;
    }

    var gewichtField = createInputField('gewicht', 'Gewicht (kg)');
    var groesseField = createInputField('groesse', 'Größe (cm)');
    var alterField = createInputField('alter', 'Alter');

    var dropdownA1 = createDropdown('a1', 'Geschlecht', ['Mann', 'Frau']);
    var dropdownA3 = createDropdown('a3', 'Aktivitätslevel', 
        ['Sitzend (wenig oder keine Bewegung)',
        'Leicht aktiv (leichte Bewegung/Sport 1-3 Tage pro Woche)', 
        'Mäßig aktiv (mäßige Bewegung/Sport 3-5 Tage pro Woche)', 
        'Sehr aktiv (harte Bewegung/Sport 6-7 Tage pro Woche)', 
        'Extrem aktiv (sehr harte Bewegung/Sport und körperliche Arbeit)']); 

    var weiterButton = document.createElement('button');
    weiterButton.textContent = 'Weiter';
    weiterButton.onclick = function() {
        var gewicht = parseFloat(document.getElementById('gewicht').value);
        var groesse = parseFloat(document.getElementById('groesse').value);
        var alter = parseInt(document.getElementById('alter').value);
        var geschlecht = document.getElementById('a1').value;
        var aktivitaetslevel = document.getElementById('a3').value;
        
        if (isNaN(gewicht) || isNaN(groesse) || isNaN(alter) || !geschlecht || !aktivitaetslevel) { 
            
            alert("Bitte alle Felder korrekt ausfüllen!");
            return; 
        }

        var aktivfaktor;
        switch (aktivitaetslevel) {
            case 'Sitzend (wenig oder keine Bewegung)':
                aktivfaktor = 1.2;
                break;
            case 'Leicht aktiv (leichte Bewegung/Sport 1-3 Tage pro Woche)':
                aktivfaktor = 1.375;
                break;
            case 'Mäßig aktiv (mäßige Bewegung/Sport 3-5 Tage pro Woche)':
                aktivfaktor = 1.55;
                break;
            case 'Sehr aktiv (harte Bewegung/Sport 6-7 Tage pro Woche)':
                aktivfaktor = 1.725;
                break;
            case 'Extrem aktiv (sehr harte Bewegung/Sport und körperliche Arbeit)':
                aktivfaktor = 1.9;
                break;
        }

        var bmr = berechnungBMR(gewicht, groesse, alter, geschlecht);
        var tdee = berechnungTDEE(bmr, aktivfaktor); 
        console.log("Hier der tdee: " + tdee); //noch zum testen
    };

    document.body.appendChild(dropdownA1);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(gewichtField);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(groesseField);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(alterField);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(dropdownA3);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(weiterButton);

    function berechnungBMR(gewicht, groesse, alter, geschlecht) {
        if (geschlecht == 'Mann') {
            return (10 * gewicht) + (6.25 * groesse) - (5 * alter) + 5;
        } else {
            return (10 * gewicht) + (6.25 * groesse) - (5 * alter) - 161;
        }
    }

    function berechnungTDEE(bmr, aktivfaktor) {
        return bmr * aktivfaktor;
    }


    //Muskelaufbau oder Gewichtsverlust 
    /*
    function kalorienErg(tdee, ){
        if(gewuenscht == 'Muskelaufbau'){
            ergebniss = tdee * 1.15;
        }
        else{
            ergebniss = tdee * 0.85;
        }
    }
    */
});