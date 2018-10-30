$("buttonSignIn").on("click", function(event) {
    event.preventDefault();
    var userData = {
        email: $("emailSignIn").val().trim(),
        password: $("pWordSignIn").val().trim()
    }

    userLogin(userData);
    $("emailSignIn").val("");
    $("pWordSignIn").val("");
})

function userLogin (user) {
    $.post("/api/signin", {
        data: user
    }).then(function(result) {
        console.log(result)
    })
}