

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
  document.querySelector(".thankyou-conatiner"),
]
let monthYearCheckbox = document.getElementById("switch-component")
let pageCount = 0


nextBtn.addEventListener("click", function () {

  // if (pageCount === 0) {
  // if (!validateForm()) {
  //   return
  // }
// }
if (pageCount < containers.length) {
  pageCount++;
  updateUI();
}

if (pageCount == 1) {
  updatePrices();
}

if(pageCount == 2){
  addOnContainerPrice();
  setupAddOnPlans();
}

if(pageCount == 3){
  finishPageDisplayPrice();
}

if (pageCount == 4) {
  nextBtn.classList.add("hidden");
  backBtn.classList.add("hidden");
  document.getElementById("number-four").classList.add("bg-cyan-500");
}
})

backBtn.addEventListener("click", function () {
if (pageCount > 0) {
  pageCount--;
  updateUI();

  if (pageCount === 1) {
    updatePrices();
    highlightSelectedPlan();
  }

  if (pageCount === 2) {
    addOnContainerPrice();
  }
}
})


// function validateForm() {
//   let isValid = true

//   let nameInput = document.getElementById("name")
//   let emailInput = document.getElementById("email")
//   let phoneInput = document.getElementById("phone-number")

//   if (nameInput.value.trim() == "") {
//     printError("name-error", "The field is required")
//     isValid = false
//   } else {
//     let regex = /^.{3,}$/
//     if (!regex.test(nameInput.value)) {
//       printError("name-error", "Minimum 3 characters required")
//       isValid = false
//     } else {
//       printError("name-error", "")
//     }
//   }
//   if (emailInput.value.trim() == "") {
//     printError("email-error", "The field is required")
//     isValid = false
//   } else {
//     let regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
//     if (!regex.test(emailInput.value)) {
//       printError("email-error", "invalid email address")
//       isValid = false
//     } else {
//       printError("email-error", "")
//     }
//   }
//   if (phoneInput.value.trim() == "") {
//     printError("phone-error", "The field is required")
//     isValid = false
//   } else {
//     let onlyNUmbers = /^[0-9]*$/
//     let numberLength = /^[0-9]{4,10}$/
//     if (!onlyNUmbers.test(phoneInput.value)) {
//       printError("phone-error", "invalid character in phone number")
//       isValid = false
//     } else if (!numberLength.test(phoneInput.value)) {
//       printError("phone-error", "Minimum 3 characters required")
//       isValid = false
//     } else {
//       printError("phone-error", "")
//     }
//   }

//   return isValid
// }

// function printError(eleid, msg) {
//   document.getElementById(eleid).innerText = msg
//   let id = document.getElementById(eleid)
//   if (msg === "") {
//     id.classList.remove("border-red-400", "focus:border-red-500")
//     id.classList.add("border-blue-500")
//   } else {
//     id.classList.add("border-red-400")
//     id.classList.remove("border-blue-500", "focus:border-red-500")
//   }
// }

//display error
monthYearCheckbox.addEventListener("change", checkPlanMonthYear)
checkPlanMonthYear()
function checkPlanMonthYear() {
  let yearContent = document.querySelectorAll(".yearContent")
  if (monthYearCheckbox.checked) {
    yearContent.forEach((ele) => {
      ele.classList.remove("hidden")
      ele.classList.add("block")
    })
  } else {
    yearContent.forEach((ele) => {
      ele.classList.remove("block")
      ele.classList.add("hidden")
    })
  }
}

let personalInfo = document.querySelector(".personal-info")
personalInfo.addEventListener("keyup", targetInput)

function targetInput(event) {
  if (event.target.tagName === "INPUT") {
    userDetails[event.target.id] = event.target.value.trim()
  }
}

function updateUserDetails() {
  if (validateForm()) {
    userDetails.name = document.getElementById("name").value.trim()
    userDetails.email = document.getElementById("email").value.trim()
    userDetails["phone-number"] = document
      .getElementById("phone-number")
      .value.trim()
  }
  console.log(userDetails)
}


let userDetails = {
  name: null,
  email: null,
  "phone-number": null,
  planDetails: {
    monthly: { arcade: 9, advanced: 12, pro: 15 },
    yearly: { arcade: 90, advanced: 120, pro: 150 },
  },
  selectedPlan: {
    plan: "Arcade",
    priceMonthly: "$9/mo",
    priceYearly: "$90/yr",
    isMonthly: false,
  },
  addOnPriceDeatils: {
    "online-service": { month: 1, year: 10 },
    "large-storage": { month: 2, year: 20 },
    "customizable-profile": { month: 2, year: 20 },
  },
  addonPrices: {
    onlineService: {
      month: "$1/mo",
      year: "$10/yr"
    },
    largeStorage: {
      month: "$2/mo",
      year: "$20/yr"
    },
    customPrice: {
      month: "$2/mo",
      year: "$20/yr"
    }
  },
  addOnPlans: []
}

function setupAddOnPlans() {
  let addOnContainer = document.querySelector(".addon-container");
  let checkboxes = addOnContainer.querySelectorAll('input[type="checkbox"]');

  userDetails.addOnPlans = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      let label = checkbox.closest("label");
      let addOnName = label.querySelector(".addOnText").innerText;
      let addOnPrice = label.querySelector(".price").innerText;

      userDetails.addOnPlans.push({ [addOnName]: addOnPrice });
    }
  });

  addOnContainer.removeEventListener("change", handleAddOnSelection);
  addOnContainer.addEventListener("change", handleAddOnSelection);
}

function handleAddOnSelection(event) {
  let label = event.target.closest("label");
  if (!label) return;

  let addOnName = label.querySelector(".addOnText").innerText;
  let addOnPrice = label.querySelector(".price").innerText;

  let existingIndex = userDetails.addOnPlans.findIndex((item) => Object.keys(item)[0] === addOnName);

  if (event.target.checked) {
    if (existingIndex === -1) {
      userDetails.addOnPlans.push({ [addOnName]: addOnPrice });
    } else {
      userDetails.addOnPlans[existingIndex][addOnName] = addOnPrice;
    }
  } else {
    userDetails.addOnPlans = userDetails.addOnPlans.filter((item) => Object.keys(item)[0] !== addOnName);
  }
}

function addOnContainerPrice() {
  let addOnContainer = document.querySelector(".addon-container");
  let checkboxes = addOnContainer.querySelectorAll('input[type="checkbox"]');

  let onlineServ = userDetails.addonPrices.onlineService;
  let largeStore = userDetails.addonPrices.largeStorage;
  let customPrice = userDetails.addonPrices.customPrice;

  let onlineService = document.querySelector('.online-price');
  let large = document.querySelector('.large-storage');
  let custom = document.querySelector('.Customizable-profile');

  if(!monthYearCheckbox.checked){
    onlineService.innerText = onlineServ.month;
    large.innerText = largeStore.month;
    custom.innerText = customPrice.month;
  } else {
    onlineService.innerText = onlineServ.year;
    large.innerText = largeStore.year;
    custom.innerText = customPrice.year;
  }

  userDetails.addOnPlans = userDetails.addOnPlans.map(addon => {
    let name = Object.keys(addon)[0];
    let newPrice;

    switch(name) {
      case 'Online service':
        newPrice = !monthYearCheckbox.checked ? onlineServ.month : onlineServ.year;
        break;
      case 'Larger storage':
        newPrice = !monthYearCheckbox.checked ? largeStore.month : largeStore.year;
        break;
      case 'Customizable profile':
        newPrice = !monthYearCheckbox.checked ? customPrice.month : customPrice.year;
        break;
    }

    return { [name]: newPrice };
  });

  checkboxes.forEach(checkbox => {
    let label = checkbox.closest("label");
    let addOnName = label.querySelector(".addOnText").innerText;

    checkbox.checked = userDetails.addOnPlans.some(
      addon => Object.keys(addon)[0] === addOnName
    );
  });
}


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

let toggleMonthYear = document.querySelector("#switch-component")

toggleMonthYear.addEventListener("change", () => {
  updatePrices();

  if (pageCount === 2) {
    addOnContainerPrice();
  }
})

function updatePrices() {
  let toggleWrapper = toggleMonthYear.parentElement
  let prevMonth = toggleWrapper.previousElementSibling
  let nextYear = toggleWrapper.nextElementSibling

  prevMonth.classList.replace(
    toggleMonthYear.checked ? "text-gray-600" : "text-blue-900",
    toggleMonthYear.checked ? "text-blue-900" : "text-gray-600"
  )

  nextYear.classList.replace(
    toggleMonthYear.checked ? "text-blue-900" : "text-gray-600",
    toggleMonthYear.checked ? "text-gray-600" : "text-blue-900"
  )

  let arcadePrice = document.querySelector("#arcade-price")
  let advancedPrice = document.querySelector("#advanced-price")
  let proPrice = document.querySelector("#pro-price")

  if (!toggleMonthYear.checked) {
    arcadePrice.innerText = "$" + userDetails.planDetails.monthly.arcade + "/mo"
    advancedPrice.innerText = "$" + userDetails.planDetails.monthly.advanced + "/mo"
    proPrice.innerText = "$" + userDetails.planDetails.monthly.pro + "/mo"

    userDetails.selectedPlan.priceMonthly = "$" + userDetails.planDetails.monthly[userDetails.selectedPlan.plan.toLowerCase()] + "/mo"
    userDetails.selectedPlan.isMonthly = false
  } else {
    arcadePrice.innerText = "$" + userDetails.planDetails.yearly.arcade + "/yr"
    advancedPrice.innerText = "$" + userDetails.planDetails.yearly.advanced + "/yr"
    proPrice.innerText = "$" + userDetails.planDetails.yearly.pro + "/yr"

    userDetails.selectedPlan.priceYearly = "$" + userDetails.planDetails.yearly[userDetails.selectedPlan.plan.toLowerCase()] + "/yr"
    userDetails.selectedPlan.isMonthly = true
  }
}

let planContainer = document.querySelector(".plan-container")

planContainer.addEventListener("click", StorePriceAndName)

function StorePriceAndName(event) {
  const section = event.target.closest("section")
  if (section) {
    const planName = section.querySelector('.font-bold').innerText
    const planPrice = section.querySelector('.text-gray-500').innerText

    userDetails.selectedPlan.plan = planName

    if (toggleMonthYear.checked) {
      userDetails.selectedPlan.priceYearly = planPrice
    } else {
      userDetails.selectedPlan.priceMonthly = planPrice
    }

    document.querySelectorAll(".plan-container section").forEach(plan => {
      plan.classList.remove("border-blue-500");
      plan.classList.add("border-gray-500");
    });

    section.classList.remove("border-gray-500");
    section.classList.add("border-blue-500");
  }
}

function highlightSelectedPlan() {
  const plans = document.querySelectorAll(".plan-container section");
  plans.forEach(plan => {
    const planName = plan.querySelector('.planName').innerText;
    console.log(planName)
    if (planName === userDetails.selectedPlan.plan) {
      plan.classList.remove("border-gray-500");
      plan.classList.add("border-blue-500");

      const radio = plan.previousElementSibling;
      if (radio && radio.type === 'radio') {
        radio.checked = true;
      }
    }
  });
}

function finishPageDisplayPrice(){
  let finalPlan = document.querySelector('.final-plan')
  let finalPrice = document.querySelector('.final-price')
  let finalInnerContainer = document.querySelector('.final-inner-container')
  let totalPriceElement = document.querySelector('.total-price')
  let totalText = document.querySelector('.TotalText')
  

  let monthOrYear = userDetails.selectedPlan.isMonthly
  finalInnerContainer.innerHTML = "";

  if(monthOrYear){
    finalPlan.innerText = `${userDetails.selectedPlan.plan} (Yearly)`
    finalPrice.innerText = userDetails.selectedPlan.priceYearly
    totalText.innerText = `Total(Yearly)`
  } else {
    finalPlan.innerText = `${userDetails.selectedPlan.plan} (Monthly)`
    finalPrice.innerText = userDetails.selectedPlan.priceMonthly
    totalText.innerText = `Total(Monthly)`
  }
  //
  let basePrice = parseInt((monthOrYear ? userDetails.selectedPlan.priceYearly : userDetails.selectedPlan.priceMonthly).replace('$', ""));
  let totalPrice = basePrice;

  finalPrice.innerText = `$${basePrice}${monthOrYear ? "/yr" : "/mo"}`;

  if (userDetails.addOnPlans.length === 0) {
    totalPriceElement.innerText = ` $${totalPrice}${monthOrYear ? "/yr" : "/mo"}`;
    return;
  }
  //
  if(userDetails.addOnPlans.length == 0) return

  for(let index = 0; index < userDetails.addOnPlans.length; index++){
    let pContent = document.createElement('p')
    pContent.classList.toggle('content')
    pContent.classList.add('text-gray-500')

    let pPrice = document.createElement('p')
    pPrice.classList.toggle('content-price')
    pPrice.classList.add('font-bold')

    let bothContentPrice = document.createElement('div')
    bothContentPrice.classList.add('flex','justify-between','pl-7','pr-11')

    let addName = Object.keys(userDetails.addOnPlans[index])[0]
    let addOnPrice = userDetails.addOnPlans[index][addName];
    //
    let addOnPriceValue = parseInt(addOnPrice.replace('$', ""));
    totalPrice += addOnPriceValue;
    //
    pContent.append(addName)
    pPrice.append(addOnPrice)
    bothContentPrice.append(pContent)
    bothContentPrice.append(pPrice)

    finalInnerContainer.append(bothContentPrice)
  }
    totalPriceElement.innerText = `$${totalPrice}${monthOrYear ? "/yr" : "/mo"}`;

  
}

let changeBtn = document.querySelector('.changeTOPlan')
function goToPlanPage(){
  
}

updateUI()
updatePrices()
highlightSelectedPlan()
