const prices = document.querySelector(".Price");
const dishes = document.querySelector(".Dish");
const tables = document.querySelector(".tableNumber");
const btn = document.querySelector(".btn");
const table1 = document.querySelector(".table1");
const table2 = document.querySelector(".table2");
const table3 = document.querySelector(".table3");
// function to execute after submit
function myfunction(event) {
  event.preventDefault();
  console.log(event)

  let price = prices.value;
  let dish = dishes.value;
  let tableSelected = tables.options[tables.selectedIndex].text;

  if (price && dish && tableSelected) {
    let list = {
      price:price,
      dish:dish,
      tableSelected:tableSelected
    }



    document.querySelector('form').reset();
    // showData();

    axios.post("https://crudcrud.com/api/208c5bbcdc7b465c9f7ec6311138dcdd/AppData", list)
      .then((response) => {
        showData(response.data)
      })
      .catch((err) => {
        console.log(err);
      })

  } else {
    alert("Enter data to continue !");
  }
}

function refresh(){
  axios.get("https://crudcrud.com/api/208c5bbcdc7b465c9f7ec6311138dcdd/AppData")
    .then((response) => {

      // console.log(response.data)
      for(let i=0;i<response.data.length;i++){
        showData(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

window.addEventListener("DOMContentLoaded",refresh())

// function to print list

function showData(obj) {

  //appending list
  let li = document.createElement('li');
  let content=obj.price+"-"+obj.tableSelected+"-"+obj.dish+" ";
  let id=obj._id;
  console.log(obj.tableSelected)
  li.textContent = content;
  if(obj.tableSelected==="Table 1"){
    table1.appendChild(li);
  }else if(obj.tableSelected==="Table 2"){
    table2.appendChild(li);
  }else{
    table3.appendChild(li);
  }


  //appending edit button
  const deletebtn = document.createElement('input');
  deletebtn.setAttribute('type', 'button');
  deletebtn.setAttribute('value', 'Delete Order');
  deletebtn.setAttribute('name', 'delete' + id);
  deletebtn.setAttribute('onclick', 'deletebutton(event)');
  li.appendChild(deletebtn);

};

function deletebutton(e){
  console.log(e);
  nameOfbtn = e.target.attributes[2].nodeValue;
  btnNumber = (nameOfbtn.slice(6, ));
  axios
    .delete('https://crudcrud.com/api/208c5bbcdc7b465c9f7ec6311138dcdd/AppData/'+btnNumber)
    .then((res)=>{
      table1.innerHTML=""
      table2.innerHTML=""
      table3.innerHTML=""
      refresh()
    })

    .catch(err=>console.log(err))
}
