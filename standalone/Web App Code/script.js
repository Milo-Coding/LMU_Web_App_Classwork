document.getElementById('calculateButton').addEventListener('click', () => {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value)/100;
  const years = parseInt(document.getElementById('years').value);
  const timesCompounded = parseInt(document.getElementById('timesCompounded').value);

  console.log(timesCompounded)

  const compoundInterest = principal * Math.pow(1 + rate / timesCompounded, years*timesCompounded) - principal;

  if (!principal && !rate && !years && !timesCompounded) {
    document.getElementById('result').textContent = `🤣🤣🤣 U BROKE!!!!!! 🚫💵 🚫💵`;
  }
  else if (principal <= 0 || rate <= 0 || years <= 0) {
    document.getElementById('result').textContent = `Please provide a positive numerical value for all inputs.`;
  }
  else if (!principal || !rate || !years || !timesCompounded) {
    document.getElementById('result').textContent = `Please provide a value for all inputs.`;
  }
  else {
    document.getElementById('result').textContent = `After ${years} years, the compound interest will be $${compoundInterest.toFixed(2)} for a total of $${(compoundInterest + principal).toFixed(2)}.`;
  }
});

document.getElementById('years').addEventListener('input', (event) => {
  document.getElementById('yearsVal').textContent = event.target.value;
})

if (years) {
  document.getElementById('yearsVal').textContent = 0;
}