import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "./Style.css";

const getLocalData = () =>{
    const lists =localStorage.getItem("mytodolist")

    if(lists){
      return JSON.parse(lists);
    }else{
      return[];
    }
};

const TodoList = () => {

    const [inputData, setInputData] = useState("");
    const [inputItem, setInputItem] = useState(getLocalData());
    const [isUpdate, setIsUpdate] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
  

    const addItem = () => {
      if (!inputData){
        Swal.fire('Please Fill The Data');

      }
      else if (inputData && toggleButton){
        setInputItem(
          inputItem.map((currentElement) => {
             if(currentElement.id === isUpdate){
                return{ ...currentElement, name: inputData };
             }
             return currentElement;
          })
        )
       
        setInputData("");
        setIsUpdate(null);
        setToggleButton(false)
       
      }
      else{
        const myNewInputData = {
           id: new Date().getTime().toString(),
           name:inputData
        }
        setInputItem([...inputItem, myNewInputData]);
        setInputData("");
      };
    };

    const updateItem = (id) => {
      const todoItemUpdate = inputItem.find((currentElement) => {
         return currentElement.id === id;
      })
      setInputData(todoItemUpdate.name);
      setToggleButton(true)
      setIsUpdate(id);
   }

    const deleteItems = (id) => {
       const updateItem = inputItem.filter((currentElement) => {
         return currentElement.id !== id;
       })
       setInputItem(updateItem);
    }

    const removeItem = () => {
      setInputItem([]);
    }

    useEffect(() =>{
      localStorage.setItem("mytodolist", JSON.stringify(inputItem));
    },[inputItem])

   

  return (
    <>
      <div className="main-div">
       <div className="container">
       <div className="child-div">
          <figure>
            <img src="./images/todo.jpg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
            <div className="addItems">
              <input type="text"
                className="from-control"
                placeholder="✍ Add Item"
                value = {inputData}
                onChange  = {(e) =>  setInputData(e.target.value)}
                
              />

              {
                toggleButton ? <i className="far fa-edit " onClick={addItem}></i> :
                <i className="fa fa-plus " onClick={addItem}></i>
              }
              

            </div>
            {/* show our items   */}
             {
               inputItem.map((currentElement) => {
                
               return(
                <div className="showItems" key={currentElement.id}>
                <div className="eachItem">
                  <h3>{currentElement.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit "
                      onClick={() => updateItem(currentElement.id)}
                    ></i>

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
      </div>
    </>
  )
}

export default TodoList