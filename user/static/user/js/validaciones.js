let validateData = {
    requireField: function(_val) {
        let cantCharacters = _val.length;
        if(cantCharacters > 0)
            return 1;
        else
            return "El campo XXX no debe ser vacio";
    },
    equalField: function(_val1, _val2) {
        if(_val1 == _val2)
            return 1;
        else 
            return "Los campos XXX no coinciden";
    },
    isInteger: function(_val) {
        if(parseInt(_val) == NaN) return "El cambo XXX debe ser de tipo númerico";
        if(parseInt(_val) % 1 != 0)
            return 1;
        else
            return "El cambo XXX debe ser de tipo númerico";
    },
    isEmail: function (_val) {
        let email = String(_val)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if(email)
            return 1;
        else 
            return "El campo XXX no es valido"
    }
}