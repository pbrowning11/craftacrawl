$("#buttonSignIn").on("click", function (event) {
    event.preventDefault();
    var userData = {
        email: $("#emailSignIn").val().trim(),
        password: $("#pWordSignIn").val().trim()
    }

    $.ajax({
        url: "/api/login",
        data: userData,
        method: "POST"
    }).then(function () {
        window.location.assign("/")
    })
})

// $("#logout").on("click", function(event) {
//     event.preventDefault();
//     app.get("/logout");
// })

