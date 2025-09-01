// ✅ Parse the local date (yyyy-mm-dd)
function parseLocalDate(yyyymmdd) {
  const [y, m, d] = yyyymmdd.split("-").map(Number);
  return new Date(y, m - 1, d); // local date
}

// ✅ Calculate exact age
function calculateExactAge(birthDate) {
  let today = new Date();
  let birth = parseLocalDate(birthDate);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  // adjust days
  if (days < 0) {
    let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }

  // adjust months
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days };
}

// ✅ Show age on button click
function showAge() {
  let dob = document.getElementById("date").value;
  let result = document.getElementById("result");

  if (!dob) {
    result.innerText = "⚠️ Please select your birth date.";
    result.style.display = "block";
    return;
  }

  // check if future date is selected
  let selectedDate = new Date(dob);
  let today = new Date();
  if (selectedDate > today) {
    result.innerText = "⚠️ Future dates are not allowed.";
    result.style.display = "block";
    return;
  }

  let ageDetails = calculateExactAge(dob);
  result.innerText = `${ageDetails.years} years, ${ageDetails.months} months, ${ageDetails.days} days`;
  result.style.display = "block";
}

// ✅ Restrict future date in input
document.addEventListener("DOMContentLoaded", () => {
  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let dd = String(today.getDate()).padStart(2, "0");
  document.getElementById("date").setAttribute("max", `${yyyy}-${mm}-${dd}`);

  // add button click event
  document.getElementById("btn").addEventListener("click", showAge);
});
