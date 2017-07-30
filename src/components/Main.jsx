import { connect } from 'react-redux';
import React, { Component } from 'react';

import ChooseFile from './ChooseFile';
import FoodsList from './FoodsList';
import LeftSection from './LeftSection';
import SummaryPopup from './SummaryPopup';

import '../sass/main';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      JSONLoaded: false,
      showSummaryPopup: false
    }

    this.closeMealPlanner = this.closeMealPlanner.bind(this);
    this.showFoodSummary = this.showFoodSummary.bind(this);
    this.hideFoodSummary = this.hideFoodSummary.bind(this);
  }

  closeMealPlanner() {
    this.setState({
      JSONLoaded: false
    });
    this.props.store.loadJSON({
      foods: [],
      meals: []
    });
  }

  showFoodSummary() {
    this.setState({
      showSummaryPopup: true
    });
  }

  hideFoodSummary() {
    this.setState({
      showSummaryPopup: false
    });
  }

  // componentDidMount() {
  //   this.props.store.loadJSON({"foods":[{"id":"jyirxsj1le","name":"Chicken","calories":"190","carbohydrates":"0","fibre":"0","fat":"7.41","protein":"28.93"},{"id":"677o789wamq","name":"Mashed Potato","calories":"86","carbohydrates":"18.21","fibre":"1.8","fat":"0.1","protein":"1.71"},{"id":"o7i4d2grvr","name":"Milk Powder","calories":"517","carbohydrates":"40","fibre":"0","fat":"28.57","protein":"25.14"},{"id":"36yite1s1jf","name":"Oats","calories":"389","carbohydrates":"55.4","fibre":"10.6","fat":"6.9","protein":"16.9"},{"id":"mjx9ocvyzlb","name":"Peanut Butter","calories":"612","carbohydrates":"9.4","fibre":"7.1","fat":"49.4","protein":"30.2"},{"id":"uaceh3co79c","name":"Egg Whites","calories":"52","carbohydrates":"1.44","fibre":"0","fat":"0.17","protein":"10.9"},{"id":"trzgkom3fu","name":"Kiwifruit","calories":"61","carbohydrates":"12","fibre":"3","fat":"0.5","protein":"1.1"},{"id":"oavjvdmjkg","name":"Orange","calories":"47","carbohydrates":"9.6","fibre":"2.4","fat":"0.1","protein":"0.9"}],"meals":[{"id":"69s2ebgnp4v","name":"4:30pm","foods":[{"foodId":"jyirxsj1le","servingSize":150},{"foodId":"677o789wamq","servingSize":200},{"foodId":"o7i4d2grvr","servingSize":50},{"foodId":"36yite1s1jf","servingSize":100},{"foodId":"mjx9ocvyzlb","servingSize":20}]},{"id":"0gxr7ybtelhp","name":"8:30pm","foods":[{"foodId":"mjx9ocvyzlb","servingSize":30},{"foodId":"jyirxsj1le","servingSize":150},{"foodId":"uaceh3co79c","servingSize":200},{"foodId":"trzgkom3fu","servingSize":138},{"foodId":"oavjvdmjkg","servingSize":131}]}]});
  // }

  render() {
    var foodsList = null, leftSection = null, summaryPopup = null;

    if (!this.state.JSONLoaded) {
      const chooseFileProps = {
        loadJSON: parsedJSON => {
          this.setState({
            JSONLoaded: true
          });
          this.props.store.loadJSON(parsedJSON);
        },
        newProfile: () => {
          this.setState({
            JSONLoaded: true
          });
        }
      }

      return <ChooseFile {...chooseFileProps} />;
    }

    const foodsListProps = {
      foods: this.props.getFromStore('foods'),
      addFood: this.props.store.addFood,
      editFood: this.props.store.editFood,
      getFoodFromId: this.props.getFoodFromIdFromStore
    };

    const leftSectionProps = {
      downloadJSON: this.props.downloadJSONFromStore,
      foods: this.props.getFromStore('foods'),
      meals: this.props.getFromStore('meals'),
      addMeal: this.props.store.addMeal,
      addFoodToMeal: this.props.store.addFoodToMeal,
      getFoodFromId: this.props.getFoodFromIdFromStore,
      setServingSize: this.props.store.setServingSize,
      removeMealFood: this.props.store.removeMealFood,
      changeFoodId: this.props.store.changeFoodId,
      closeMealPlanner: this.closeMealPlanner,
      showFoodSummary: this.showFoodSummary
    };

    foodsList = <FoodsList {...foodsListProps} />;
    leftSection = <LeftSection {...leftSectionProps} />;

    if (this.state.showSummaryPopup) {
      const summaryPopupProps = {
        meals: this.props.getFromStore('meals'),
        getFoodFromId: this.props.getFoodFromIdFromStore,
        hideFoodSummary: this.hideFoodSummary
      };

      summaryPopup = <SummaryPopup {...summaryPopupProps} />;
    }

    return (
      <div className="pageMain">
        {leftSection}
        {foodsList}
        {summaryPopup}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getFromStore: key => state[key],
    downloadJSONFromStore: () => {
      const stringifiedJSON = JSON.stringify(state);

      const element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringifiedJSON));
      element.setAttribute('download', "mealPlanner.json");

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    getFoodFromIdFromStore: foodId => {
      var foodInfo = null;
      state.foods.forEach(food => {
        if (food.id == foodId) {
          foodInfo = food;
          return false;
        }
      });

      return foodInfo;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    store: {
      loadJSON: parsedJSON => {
        dispatch({
          type: "all_loadFromJSON",
          parsedJSON
        });
        // more dispatches needed
      },
      addFood: (name, calories, carbohydrates, fibre, fat, protein) => {
        dispatch({
          type: "foods_addFood",
          name,
          calories,
          carbohydrates,
          fibre,
          fat,
          protein
        });
      },
      editFood: (foodId, name, calories, carbohydrates, fibre, fat, protein) => {
        dispatch({
          type: "foods_editFood",
          foodId,
          name,
          calories,
          carbohydrates,
          fibre,
          fat,
          protein
        });
      },
      addMeal: (name, insertAt) => {
        dispatch({
          type: "meals_addMeal",
          name,
          insertAt
        });
      },
      addFoodToMeal: (mealId, foodId, servingSize) => {
        dispatch({
          type: "meals_addFoodToMeal",
          mealId,
          foodId,
          servingSize
        });
      },
      setServingSize: (mealId, foodId, servingSize) => {
        dispatch({
          type: "meals_setFoodServingSize",
          mealId,
          foodId,
          servingSize
        });
      },
      removeMealFood: (mealId, foodId) => {
        dispatch({
          type: "meals_removeMealFood",
          mealId,
          foodId
        })
      },
      changeFoodId: (mealId, oldFoodId, newFoodId) => {
        dispatch({
          type: "meals_changeFoodId",
          mealId,
          oldFoodId,
          newFoodId
        })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
