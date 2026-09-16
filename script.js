const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
    
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const projectType = document.getElementById("projectType").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        projectType,
        message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Enquiry submitted successfully!");

      contactForm.reset();
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error. Please try again.");
  }
});
