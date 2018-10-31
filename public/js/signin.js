$("#buttonSignIn").on("click", function (event) {
    event.preventDefault();
    var userData = {
        email: $("#emailSignIn").val().trim(),
        password: $("#pWordSignIn").val().trim()
    }
    console.log(userData);

    console.log("func check")
    $.post("/api/signin", {
        data: userData
    }).then(function () {
        window.location.assign("/")
    })
})