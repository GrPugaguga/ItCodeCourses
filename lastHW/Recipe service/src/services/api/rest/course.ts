import makeRequest from "../httpClient";

export const fetchRecipes = (q: string, diet: string, health: string, mealType: string, dishType: string, calories: string) => {
    console.log(`https://api.edamam.com/api/recipes/v2?type=public&app_id=d2eb6c3e&app_key=485e5bf70c9784be8d107d4ad87806ae%09&imageSize=REGULAR${q ? '&q=' + q : ''}${diet ? '&diet=' + diet : ''}${health ? '&health=' + health : ''}${mealType ? '&mealType=' + mealType : ''}${dishType ? '&dishType=' + dishType : ''}${calories ? '&calories=' + calories : ''}`)
    return makeRequest({
        url: `https://api.edamam.com/api/recipes/v2?type=public&app_id=d2eb6c3e&app_key=485e5bf70c9784be8d107d4ad87806ae%09&imageSize=REGULAR&q=${q}${diet ? '&diet=' + diet : ''}${health ? '&health=' + health : ''}${mealType ? '&mealType=' + mealType : ''}${dishType ? '&dishType=' + dishType : ''}${calories ? '&calories=' + calories : ''}`,
        method: "GET"
    })
}

export const fetchCourse = (id: string) => {
    return makeRequest({
        url: `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=d2eb6c3e&app_key=485e5bf70c9784be8d107d4ad87806ae%09`,
        method: "GET"
    })
}

