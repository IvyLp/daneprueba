const btnEnviar = document.getElementById('BtnEnviar');
btnEnviar.addEventListener('click', function(ev) {
    ev.preventDefault();
    //Campos
    let firstName = document.getElementById('firstNameField');
    let lastName = document.getElementById('lastNameField');
    let email = document.getElementById('emailField')
    let user = document.getElementById('userField');
    let password = document.getElementById('passwordField');
    let repeatPassword = document.getElementById('repeatPasswordField');

    let firstNameValue = firstName.value;
    let lastNameValue = lastName.value;
    let emailValue = email.value;
    let userValue = user.value;
    let passwordValue = password.value;
    let repeatPasswordValue = repeatPassword.value;

    let firstNameValidations = [
        validateData.requireField(firstNameValue)
    ];

    let lastNameValidations = [
        validateData.requireField(lastNameValue)
    ];

    let emailValidations = [
        validateData.requireField(emailValue),
        validateData.isEmail(emailValue)
    ];

    let userValidations = [
        validateData.requireField(user.value)
    ];
    let passwordValidations = [
        validateData.requireField(passwordValue),
        validateData.equalField(passwordValue, repeatPasswordValue)
    ]; 
    
    let validationsMessage = [];

    firstNameValidations.forEach(_val => { if(_val !== 1) { let msj = _val.replace("XXX", "<i>Nombre</i>"); validationsMessage.push(msj); } });
    lastNameValidations.forEach(_val => { if(_val !== 1) { let msj = _val.replace("XXX", "<i>Apellidos</i>"); validationsMessage.push(msj); } });
    emailValidations.forEach(_val => { if(_val !== 1) { let msj = _val.replace("XXX", "<i>Correo</i>"); validationsMessage.push(msj); } });
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
        fetch('/user/add/', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameValue,
                lastName: lastNameValue,
                email: emailValue,
                user: userValue,
                password: passwordValue 
            })
        })
        .then((res)=> {
            return res.json();
        })
        .then(data => {
            if(data.redirect)
                window.location.href = '/user/login';
            else
                alertMessage(data.message);
        })
    }

});

