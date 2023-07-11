const btnEnviar = document.getElementById('BtnSurvey');
const form = document.querySelector('form');
const dataSelected = form.getAttribute('data-options').split(",");

dataSelected.forEach(_i => {
    let selectedInput = document.querySelector('input[value="'+_i+'"]');
    if(selectedInput)
        selectedInput.setAttribute('checked', 'checked')
});

btnEnviar.addEventListener('click', function(ev) {
    ev.preventDefault();
    
    let isRequired = document.querySelector('.requireField');
    let isInteger = document.querySelector('.requireInteger');
    let type = form.getAttribute('data-type');
    let question_id = form.getAttribute('data-question');
    let user_id = form.getAttribute('data-user');

    let valueInput;
    
    switch(type){
        case "1":
            valueInput = document.querySelector('#defaulField').value;
            break;
        case "2":
            valueInput = document.querySelector('input[type="radio"]:checked').value;
            break;
        case "3":
            let valuesCheck = document.querySelectorAll('input[type="checkbox"]:checked');
            valueInput = [...valuesCheck].map(_el => _el.value);
            valueInput = valueInput.join()
            break;
    }
    let inputValidations = [];
    if(isRequired)
        inputValidations.push(validateData.requireField(valueInput));

    if(isInteger)
        inputValidations.push(validateData.isInteger(valueInput));
    
    let validationsMessage = []; 
    inputValidations.forEach(_val => { if(_val !== 1) { let msj = _val.replace("XXX", "<i>Asignado</i>"); validationsMessage.push(msj); } });

    if(validationsMessage.length > 0) {
        let ulTag = '<ul>';
        validationsMessage.forEach(_msj => {
            ulTag += '<li>'+_msj+'</li>';
        });
        ulTag +='<ul>';
        alertMessage(ulTag);
    } else {
        fetch(`/survey/addanswer`, {
            method: 'POST',
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user_id,
                questionId: question_id,
                optionNumber: type == 1 ? '' : valueInput,
                response: type == type == 1 ? valueInput: '',
            })
        })
        .then((res)=> {
            return res.json();
        })
        .then(data => {
            let pos = parseInt(question_id) + 1
            if(data.redirect)
                window.location.href = `/survey/${pos}/q/${user_id}/u/`;
            else
                alertMessage(data.message);
        })
    }
});