const btnEnviar = document.getElementById('BtnEnviar');
btnEnviar.addEventListener('click', function(ev) {
    ev.preventDefault();
    //Campos
    let user = document.getElementById('userField');
    let password = document.getElementById('passwordField');

    let userValue = user.value;
    let passwordValue = password.value;
    

    let userValidations = [
        validateData.requireField(user.value)
    ];
    let passwordValidations = [
        validateData.requireField(passwordValue)
    ]; 
    
    let validationsMessage = [];

    userValidations.forEach(_val => { if(_val !== 1) { let msj = _val.replace("XXX", "<i>Usuario</i>"); validationsMessage.push(msj); } });
    passwordValidations.forEach(_val => { if(_val !== 1){ let msj = _val.replace("XXX", "<i>Password</i>"); validationsMessage.push(msj); } });

    if(validationsMessage.length > 0) {
        let ulTag = '<ul>';
        validationsMessage.forEach(_msj => {
            ulTag += '<li>'+_msj+'</li>';
        });
        ulTag +='<ul>';
        alertMessage(ulTag);
    }
    else {
        fetch('/user/login/', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userValue,
                password: passwordValue 
            })
        })
        .then((res)=> {
            return res.json();
        })
        .then(data => {
            if(data.redirect)
                window.location.href = '/survey/1/q/1/u';
            else
                alertMessage(data.message);
        })
    }

});

