import React, { useState } from 'react';
import "./Style.css";

const TodoList = () => {

    const [inputData, setInputData] = useState("");
    const [inputItem, setInputItem] = useState([]);

    const addItem = () => {
      if (!inputData){
        alert("please add item");
      }else{
        const myNewInputData = {
           id: new Date().getTime().toString(),
           name:inputData
        }
        setInputItem([...inputItem, myNewInputData]);
      };
    };

    const deleteItems = (id) => {
       const updateItem = inputItem.filter((currentElement) => {
         return currentElement.id !== id;
       })
       setInputItem(updateItem);
    }

    const removeItem = () => {
      setInputItem([]);
    }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.jpg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
            <div className="addItems">
              <input type="text"
                className="from-control"
                placeholder="✍ Add Item"
                defaultValue = {inputData}
                onBlur  = {(e) =>  setInputData(e.target.value)}
                
              />
              <i className="fa fa-plus " onClick={addItem}></i>

            </div>
            {/* show our items   */}
             {
               inputItem.map((currentElement, index) => {
                
               return(
                <div className="showItems" key={index}>
                <div className="eachItem">
                  <h3>{currentElement.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit "></i>
                    <i className="far fa-trash-alt "
                      onClick={() => deleteItems(currentElement.id)}
                    ></i>
                  </div>
                </div>
              </div>
               )

               })
             }


            

            {/* remove all button */}
            <div className="showItems">
              <button 
              className="btn effect04" 
              data-sm-link-text="Remove All"
               onClick={removeItem} 
              >
                <span> CHECK LIST </span>
              </button>
            </div>
          </figure>
        </div>
      </div>
    </>
  )
}

export default TodoList