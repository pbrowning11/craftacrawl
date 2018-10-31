$("#signage").on("click", function (event) {
    event.preventDefault();
    console.log("toot toot")
    var userData = {
        email: $("#email").val().trim(),
        firstName: $("#fName").val().trim(),
        lastName: $("#lName").val().trim(),
        password: $("#pWord").val().trim()
    }
    userSignUp(userData);
    $("#email").val("");
    $("#fName").val("");
    $("#lName").val("");
    $("#pWord").val("");
})

function userSignUp(user) {
    console.log(user)
    $.post("/api/signup", {
        data: user
    }).then(function (result) {
        console.log("hello")
        window.location.assign("/")
        console.log(result)
    }
    )
}