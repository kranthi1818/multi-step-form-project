// let nextBtn = document.querySelector('#next-step')
// let backBtn = document.querySelector('#go-back')

// let personalInfo = document.querySelector('.personal-container')
// let selectPlanContainer = document.querySelector('.select-your-plan')
// let addOnsContainer = document.querySelector('.pick-addons')
// let summaryContainer = document.querySelector('.summary')

// let numberOne = document.getElementById('number-one')
// let numnberTwo = document.getElementById('number-two')
// let numberThree = document.getElementById('number-three')

// let page = 1;
// nextBtn.addEventListener('click',nextBtnFunctionality)

// function nextBtnFunctionality(){
//     page++
//     if(page == 2){
//         personalInfo.classList.add('hidden')
//         selectPlanContainer.classList.remove('hidden')
//         selectPlanContainer.classList.add('block')
//         backBtn.classList.remove('invisible')
//         numberOne.classList.remove('bg-blue-300')
//         numnberTwo.classList.add('bg-blue-300')

//         addOnsContainer.classList.add('hidden')
//     }
//     if(page == 3){
//         selectPlanContainer.classList.add('hidden')
//         addOnsContainer.classList.remove('hidden')
//         addOnsContainer.classList.add('block')
//         numnberTwo.classList.remove('bg-blue-300')

//         numberThree.classList.add('bg-blue-300')
//     }
//     if(page == 4){
//         addOnsContainer.classList.add('hidden')
//         summaryContainer.classList.remove('hidden')

//     }
// }

// backBtn.addEventListener('click',backBtnFunctionality)

// function backBtnFunctionality(){
//     if(page > 1){
//         page--
//     }

//     if(page == 1){
//         personalInfo.classList.remove('hidden')
//         personalInfo.classList.add('block')
//         selectPlanContainer.classList.remove('block')
//         selectPlanContainer.classList.add('hidden')
//         backBtn.classList.add('invisible')
//         numnberTwo.classList.remove('bg-blue-300')
//         numberOne.classList.add('bg-blue-300')

//         addOnsContainer.classList.remove('block')
//         addOnsContainer.classList.add('hidden')

//     }
//     if(page == 2){
//         selectPlanContainer.classList.remove('hidden')
//         selectPlanContainer.classList.add('block')

//         addOnsContainer.classList.remove('block')
//         addOnsContainer.classList.add('hidden')
//         numnberTwo.classList.add('bg-blue-300')
//         numberThree.classList.remove('bg-blue-300')

//     }

// }

let nextBtn = document.querySelector("#next-step")
let backBtn = document.querySelector("#go-back")
let sections = [
  document.querySelector(".personal-container"),
  document.querySelector(".select-your-plan"),
  document.querySelector(".pick-addons"),
  document.querySelector(".summary"),
]
let indicators = [
  document.getElementById("number-one"),
  document.getElementById("number-two"),
  document.getElementById("number-three"),
  document.getElementById("number-four")
]

let thankYouContainer = document.querySelector('.thank-you-container')

let page = 0

function updateUI() {
  sections.forEach((section, index) => {
    section.classList.toggle("hidden", index !== page)
    section.classList.toggle("block", index === page)
  })
  indicators.forEach((indicator, index) => {
    if (indicator) {
      indicator.classList.toggle("bg-blue-300", index === page )
    }
  })
  backBtn.classList.toggle("invisible", page === 0)

  backBtn.classList.toggle('hidden',page == 4)
  nextBtn.classList.toggle('hidden',page == 4)

}

nextBtn.addEventListener("click", () => {
  if (page < sections.length) {
    page++
    updateUI()
  }
})

backBtn.addEventListener("click", () => {
  if (page > 0) {
    page--
    updateUI()
  }
})

updateUI()
