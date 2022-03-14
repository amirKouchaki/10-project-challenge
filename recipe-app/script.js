const recipeEl = document.getElementById("recipe")
const favContainer = document.querySelector('.fav')
const daysRecipeSection = document.querySelector('.days-recipe-section')
const popUpCloseBtn = document.querySelector('.pop-up-window .close-window')
const popUpContainer = document.querySelector('.recipe-pop-up-container')
const getRandomMeal = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  )
  const data = await response.json()
  addMeal(data.meals[0], true)
}

const getMealById = async(id) => {
    const res =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await res.json()
    return data.meals[0]
}

const getMealBySearch = async q => {
   const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
   const data = await res.json()
   return data.meals
}

const addMeal = (mealData, random = false) => {
  const meal = document.createElement("div")
  meal.classList.add("container")

  meal.innerHTML = `
    <h2 class="days-recipe-header">${
      random ? "random recipe" : "searched recipe"
    }</h2>
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
      class="days-recipe-img"
    />
    <div class="days-recipe-description">
      <span class="days-recipe-name">${mealData.strMeal}</span>
      <div class="fav-btn fa-regular fa-heart"></div>
    </div>`
  recipeEl.appendChild(meal)

  meal.querySelector(".fav-btn")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("active")
      if(e.target.classList.contains('active'))
        addMealLS(mealData)
      else {
        removeMealLS(mealData.idMeal)
      }
    })
}


const getMealsLS = () => {
  return JSON.parse(localStorage.getItem('meals')) ?? []
}

const addMealLS = meal => {
  const meals = getMealsLS()
  meals.push(meal.idMeal)
  localStorage.setItem('meals',JSON.stringify(meals))
  showFavMeals()
}

const removeMealLS = mealId => {
  let mealIds = getMealsLS()
  mealIds = mealIds.filter(id => id !== mealId)
  localStorage.setItem('meals',JSON.stringify(mealIds))
  showFavMeals()
}


/**
 * * this function is super important for understanding async functions
 */
const fetchFavMeals = async () =>{
  let mealsIds = getMealsLS()
  return await Promise.all(mealsIds.map(async id => await getMealById(id))) ?? []
}


const showFavMeals = async () => {
  const meals = await fetchFavMeals()
  //clearing the previous pics
  favContainer.innerHTML = ''
  meals.forEach(meal => {
    const mealContainer = document.createElement('a')
    mealContainer.classList = 'fav-food'
    mealContainer.innerHTML= `<i class="fa-solid fa-xmark fav-remove"></i>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="fav-food-img" /><span
    class="fav-food-name"
    >${meal.strMeal}</span
  >`

    mealContainer.querySelector('.fav-food-img').addEventListener('click',e => {
      e.preventDefault()
      addIngredients(meal)
      popUpContainer.classList.remove('hide')
      

    })
    favContainer.appendChild(mealContainer)
    mealContainer.querySelector('.fav-remove').addEventListener('click',(e => {
        removeMealLS(meal.idMeal)
    }))
  })
 
}

const search = async q  => {
    const searchedMeals = await getMealBySearch(q)
    daysRecipeSection.innerHTML = ''
    searchedMeals?.forEach((meal) => addMeal(meal))
}

const addIngredients = meal => {
  const title = document.querySelector('.pop-up-title')
  const img = document.querySelector('.pop-up-img')
  const desc = document.querySelector('.pop-up-description')
  const ingredients = document.querySelectorAll('.pop-up-ingredients')
  const {strMeal: mealTitle,strMealThumb: mealImg ,strInstructions: mealDesc} = meal
  title.innerText = mealTitle
  img.setAttribute('src',mealImg) 
  desc.innerText = mealDesc
  ingredients.forEach((ingredient,i) => {
     ingredient.innerText = meal[`strIngredient${i + 1}`]
  });
  // const desc = 
}


getRandomMeal()

showFavMeals()

document.querySelector('.search-link').addEventListener('click', e => {
    e.preventDefault()
    const searchInput =  document.querySelector('.search-input')
    if(searchInput.value === '')
      return
    search(searchInput.value)
    
})

popUpCloseBtn.addEventListener('click',e =>{
  e.preventDefault()
  popUpContainer.classList.add('hide')
})
