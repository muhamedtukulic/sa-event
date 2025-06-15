$(document).ready(function () {
  // jQuery form validation
  $("#formValidation").validate({
    rules: {
      name: {
        minlength: 2,
      },
      email: {
        email: true,
      },
      phone: {
        number: true,
        minlength: 6,
      },
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Name must be at least 2 characters",
      },
      email: "Please enter a valid email",
      phone: "Please enter a valid phone number",
      subject: "Please enter your subject",
      formMessage: "Please enter your message",
    },
    submitHandler: function (form) {
      // Get values
      const name = $("input[name='name']").val();
      const surname = $("input[name='surname']").val();
      const email = $("input[name='email']").val();
      const password = $("input[name='password']").val();
      const confirmPassword = $("input[name='confirm_password']").val();

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Send data to Express backend
      fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password
        }),
      })      
        .then((res) => res.json())
        .then((data) => {
          // Show styled success message
          const successMessage = $("<div>")
            .text(data.message)
            .css({
              "background-color": "#4CAF50",
              color: "white",
              padding: "10px",
              "border-radius": "5px",
              "text-align": "center",
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: "9999",
            });

          $("body").append(successMessage);
          $("html, body").animate(
            {
              scrollTop: successMessage.offset().top,
            },
            1000
          );

          setTimeout(function () {
            successMessage.fadeOut(1000, function () {
              $(this).remove();
            });
          }, 5000);
        })
        .catch((error) => {
          alert("Signup failed. Check console.");
          console.error("Signup error:", error);
        });
    },
  });
});
