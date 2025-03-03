let nextBtn = document.querySelector("#next-step")
let backBtn = document.querySelector("#go-back")

let numbersBg = [
  document.getElementById("number-one"),
  document.getElementById("number-two"),
  document.getElementById("number-three"),
  document.getElementById("number-four"),
]
let containers = [
  document.querySelector(".personal-container"),
  document.querySelector(".select-your-plan"),
  document.querySelector(".pick-addons"),
  document.querySelector(".summary"),
]
let monthYearCheckbox = document.getElementById('switch-component')
let pageCount = 0



nextBtn.addEventListener("click", function () {
  if (pageCount === 0) {
    if (!validateForm()) {
      return
    }
  }

  if (pageCount < containers.length) {
    pageCount++
    updateUI()
   
  }
  
})

backBtn.addEventListener("click", function () {
  if (pageCount > 0) {
    pageCount--
    updateUI()
  }
})
function updateUI() {
  pageCount == 0
    ? backBtn.classList.add("invisible")
    : backBtn.classList.remove("invisible")

  containers.forEach((container, index) => {
    if (index == pageCount) {
      container.classList.remove("hidden")
    } else {
      container.classList.add("hidden")
    }
  })

  numbersBg.forEach((number, index) => {
    if (index == pageCount) {
      number.classList.add("bg-cyan-500")
    } else {
      number.classList.remove("bg-cyan-500")
    }
  })
}

function validateForm() {
  let isValid = true

  let nameInput = document.getElementById("name")
  let emailInput = document.getElementById("email")
  let phoneInput = document.getElementById("phone-number")


  if (nameInput.value.trim() == "") {
    printError("name-error", "The field is required")
    isValid = false
  } else {
    let regex = /^.{3,}$/
    if (!regex.test(nameInput.value)) {
      printError("name-error", "Minimum 3 characters required")
      isValid = false
    } else {
      printError("name-error", "")
    }
  }
  if (emailInput.value.trim() == "") {
    printError("email-error", "The field is required")
    isValid = false
  } else {
    let regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    if (!regex.test(emailInput.value)) {
      printError("email-error", "invalid email address")
      isValid = false
    } else {
      printError("email-error", "")

    }
  }
  if (phoneInput.value.trim() == "") {
    printError("phone-error", "The field is required")
    isValid = false
  } else {
    let onlyNUmbers = /^[0-9]*$/
    let numberLength = /^[0-9]{4,10}$/
    if (!onlyNUmbers.test(phoneInput.value)) {
      printError("phone-error", "invalid character in phone number")
      isValid = false
    } else if(!numberLength.test(phoneInput.value)){
      printError('phone-error','Minimum 3 characters required')
      isValid = false
    } else {
      printError("phone-error", "")
    }
  }
  return isValid
}

function printError(eleid, msg) {
  document.getElementById(eleid).innerText = msg
}


monthYearCheckbox.addEventListener("change", checkPlanMonthYear);
checkPlanMonthYear()
function checkPlanMonthYear(){
    let yearContent = document.querySelectorAll('.yearContent')
  if(monthYearCheckbox.checked){
    yearContent.forEach((ele)=>{
      ele.classList.remove('hidden')
      ele.classList.add('block')
    })
  }else{
    yearContent.forEach((ele)=>{
      ele.classList.remove('block')
      ele.classList.add('hidden')
    })    
  }
}