function showOutput() {
  const emailValue = document.getElementById("email").value;
  const dateValue = document.getElementById("date_of_visit").value;
  const commentValue = document.getElementById("comment").value;

  const message = `Your Email: ${emailValue}\nDate of Visit: ${dateValue}\nComment: ${commentValue}`;
  alert(message);
}
