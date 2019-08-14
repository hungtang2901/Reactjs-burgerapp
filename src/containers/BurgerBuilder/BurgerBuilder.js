import React from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    purchaseHandler = (event) => {
        this.setState({
            purchasing: true
        })
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            // ingredients[igKey] is the number of each ingredients
            return ingredients[igKey];
            // call reduce to turn it into the sum of all ingredients
        }).reduce((sum, el)=>{
                return sum+el;
        },0);
        this.setState({purchasable: sum> 0})
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
        this.updatePurchaseState(updatedIngredient)
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
        this.updatePurchaseState(updatedIngredient);
    }
    //using this refers to the class, not sth else
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler =() =>{
        alert('You continue')
    }
    render(){
        // 
        const disabledInfo = {
            ...this.state.ingredients
        };
        //for loop will return true or false for the object
        // check if ingredient less than 0 and return true false
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //{salad: true, meat: false, bacon: true}
        return (
            <Auxi>
                <Modal 
                     modalClosed ={this.purchaseCancelHandler}
                     show={this.state.purchasing}>
                    <OrderSummary   
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients = {this.state.ingredients}
                        totalPrice = {this.state.totalPrice}/>
                </Modal>
                <Burger 
                    ingredients ={this.state.ingredients}/>
                 <BuildControls 
                    disabled = {disabledInfo} 
                    price = {this.state.totalPrice}
                    purchasable ={this.state.purchasable}
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}                  
                    ordered = {this.purchaseHandler}
                   />
                    
            </Auxi>
        );
    }
}
export default BurgerBuilder;