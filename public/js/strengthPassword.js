const passwordStrength = document.getElementById("password");
const strMsg = document.getElementById("strengthMessage");
const suggestionBox = document.getElementById("suggestions");

passwordStrength.addEventListener("input", () => {
  const password = passwordStrength.value;

  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()]/.test(password);

  const checks = [hasLength, hasUppercase, hasLowercase, hasNumber, hasSpecial];

  let score = 0;

  for (const check of checks) {
    if (check) {
      score++;
    }
  }

  if (password === "") {
    strMsg.textContent = "";
  } else if (score <= 2) {
    strMsg.textContent = "Weak";
    strMsg.style.color = "red";
  } else if (score < 5) {
    strMsg.textContent = "Medium";
    strMsg.style.color = "orange";
  } else {
    strMsg.textContent = "Strong";
    strMsg.style.color = "green";
  }

  const requirements = [
    { check: hasLength, text: "At least 8 characters" },
    { check: hasUppercase, text: "Uppercase letter" },
    { check: hasLowercase, text: "Lowercase letter" },
    { check: hasNumber, text: "Number" },
    { check: hasSpecial, text: "Special character" },
  ];

  let suggestions = "";

  for (const requirement of requirements) {
    if (password === "") {
      suggestions += `
      <span class="text-secondary">
        <i class="fa-regular fa-circle"></i> ${requirement.text}
      </span><br>
    `;
    } else if (requirement.check) {
      suggestions += `
      <span class="text-success">
        <i class="fa-solid fa-circle-check"></i> ${requirement.text}
      </span><br>
    `;
      suggestionBox.style.backgroundColor = "#f8f9fa";
    } else {
      suggestions += `
      <span class="text-danger">
        <i class="fa-solid fa-circle-xmark"></i> ${requirement.text}
      </span><br>
    `;
    }
  }
  suggestions += "<br>";
  suggestionBox.innerHTML = suggestions;
});
