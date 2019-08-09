import React from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    bacon: 2,
    meat: 3

}
class BurgerBuilder extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice +priceAddition;
        this.setState(
            {totalPrice: newPrice, ingredients: updatedIngredient}
        );
    }
    removeIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeducted = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeducted;
        this.setState(
            {totalPrice: newPrice, ingredients: updatedIngredient}
        );
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        //for loop will return true or false for the object
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //{salad: true, meat: false, bacon: true}
        return (
            <Auxi>
                <Burger ingredients ={this.state.ingredients}/>
                 <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo} 
                    price = {this.state.totalPrice}/>

            </Auxi>
        );
    }
}
export default BurgerBuilder;