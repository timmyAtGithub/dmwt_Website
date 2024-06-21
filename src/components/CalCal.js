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
    var dropdownA2 = createDropdown('a2', 'Dauer (Monate)', ['6', '12', '18', '24']); // Monate ? passende Werte
    var dropdownA3 = createDropdown('a3', 'Aktivitätslevel', ['1', '2', '3', '4', '5']); // noch passende Werte

    var weiterButton = document.createElement('button');
    weiterButton.textContent = 'Weiter';
    weiterButton.onclick = function() {
        console.log('Weiter geklickt');
    };

    document.body.appendChild(dropdownA1);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(gewichtField);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(groesseField);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(alterField);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(dropdownA2);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(dropdownA3);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(weiterButton);

});