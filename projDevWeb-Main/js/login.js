console.log("loaded");

email = document.getElementById('email')

senha = document.getElementById('senha')


document.getElementById('btnlogin').onclick = function () {
    if (email.value == null || email.value == "") {
        Swal.fire("Digite seu E-Mail!")
        return
    }
    if (senha.value == null || senha.value == "") {
        Swal.fire("Digite sua senha!")
        return
    }
    console.log("Pressed")
    window.location.href = 'busca.html'
};