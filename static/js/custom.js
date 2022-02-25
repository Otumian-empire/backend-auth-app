jQuery(function ($) {
  // Signup form submission
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();

    const name = $("#name").val();
    const phone = $("#phone").val();
    const email = $("#email").val();
    const bio = $("#bio").val();
    const password = $("#password").val();

    const data = `
      mutation {
        signup(name: "${name}", bio: "${bio}", email: "${email}", phone: "${phone}", password: "${password}") {
          success
          message
        }
      }
    `;

    $.ajax({
      url: `/graphql?query=${data}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: (response) => {
        if (response.data.signup.success) {
          location.href = "/";
        } else {
          $("#flash")
            .attr("class", "alert alert-danger")
            .text(response.data.signup.message);
        }
      },
      error: (error, xhr, message) => {
        console.log(error, xhr, message);
        $("#flash").attr("class", "alert alert-danger").text(message);
      },
    });
  });

  // Login form submission
  $("#loginForm").on("submit", (e) => {
    e.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    const data = `
      query {
        login(email: "${email}" password: "${password}") {
          success
          message
        }
      }
    `;

    $.ajax({
      url: `/graphql?query=${data}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: (response) => {
        if (response.data.login.success) {
          location.href = "/";
        } else {
          $("#flash")
            .attr("class", "alert alert-danger")
            .text(response.data.login.message);
        }
      },
      error: (error, xhr, message) => {
        console.log(error, xhr, message);
        $("#flash").attr("class", "alert alert-danger").text(message);
      },
    });
  });

  // Profile update form submission
  $("#profileUpdateForm").on("submit", (e) => {
    e.preventDefault();

    const name = $("#name").val();
    const phone = $("#phone").val();
    const email = $("#email").val();
    const bio = $("#bio").val();

    const data = `
      mutation {
        updateProfile(name: "${name}", bio: "${bio}", email: "${email}", phone: "${phone}") {
          success
          message
        }
      }
    `;

    $.ajax({
      url: `/graphql?query=${data}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: (response) => {
        if (response.data.updateProfile.success) {
          location.href = "/logout";
        } else {
          $("#flash")
            .attr("class", "alert alert-danger")
            .text(response.data.updateProfile.message);
        }
      },
      error: (error, xhr, message) => {
        console.log(error, xhr, message);
        $("#flash").attr("class", "alert alert-danger").text(message);
      },
    });
  });

  // Password update form submission
  $("#passwordUpdateForm").on("submit", (e) => {
    e.preventDefault();

    const password = $("#password").val();

    const data = `
      mutation {
        updatePassword(password: "${password}") {
          success
          message
        }
      }
    `;

    $.ajax({
      url: `/graphql?query=${data}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: (response) => {
        if (response.data.updatePassword.success) {
          location.href = "/logout";
        } else {
          $("#flash")
            .attr("class", "alert alert-danger")
            .text(response.data.updatePassword.message);
        }
      },
      error: (error, xhr, message) => {
        console.log(error, xhr, message);
        $("#flash").attr("class", "alert alert-danger").text(message);
      },
    });
  });
});
