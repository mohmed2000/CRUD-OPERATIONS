

//CRUD operation--->create,retrieve,update,delete

var empNameInput=document.getElementById("empName");
var empAgeInput=document.getElementById("empAge");
var empSalaryInput=document.getElementById("empSalary");
var empPhoneInput=document.getElementById("empPhone");
var submitBtn=document.getElementById("submitBtn");
var empolyees;
var currentIndex;

if(localStorage.getItem("empolyeesList")==null) 
{
    empolyees=[];
}
else
{
   empolyees=JSON.parse(localStorage.getItem("empolyeesList"));
   displayData();
}

submitBtn.onclick=function(){

    if(submitBtn.innerHTML=="Add Empolyee")
    {
        addEmpolyee();
    }

    else
    {
        editEmplyee()
    }
   displayData();
}

function addEmpolyee(){
    var empolyee=
   {
      "name":empNameInput.value,
      "age":empAgeInput.value,
      "salary":empSalaryInput.value,
      "phone":empPhoneInput.value,
   }
   empolyees.push(empolyee);
   localStorage.setItem("empolyeesList", JSON.stringify(empolyees))
}

function displayData(){
    var trs="";
    for(var i=0;i<empolyees.length;i++){
      
        trs+=`<tr>
                <td>`+empolyees[i].name+`</td>
                <td>`+empolyees[i].age+`</td>
                <td>`+empolyees[i].salary+`</td>
                <td>`+empolyees[i].phone+`</td>
                <td><button onclick='getEmpData(`+i+`)' class='btn btn-warning'>edit</button></td>
                <td><button onclick='deleteEmp(`+i+`)' class='btn btn-danger'>delete</button></td>
             </tr>`
    }

    document.getElementById("tableBody").innerHTML=trs;
}

function deleteEmp(index){
     empolyees.splice(index,1);
     localStorage.setItem("empolyeesList", JSON.stringify(empolyees))
     displayData()
}

function search(searchTxt)
{
   var trs="";
   for(var i=0;i<empolyees.length;i++)
   {
        if(empolyees[i].name.toLowerCase().includes(searchTxt.toLowerCase()))  //z
        {
            trs+=
            `
                <tr>
                <td>`+empolyees[i].name+`</td>
                <td>`+empolyees[i].age+`</td>
                <td>`+empolyees[i].salary+`</td>
                <td>`+empolyees[i].phone+`</td>
                <td><button class='btn btn-warning'>edit</button></td>
                <td><button onclick='deleteEmp(`+i+`)' class='btn btn-danger'>delete</button></td>
                </tr>
            `

        }
   }
   document.getElementById("tableBody").innerHTML=trs;

}

function getEmpData(index){
    var currentEmp=empolyees[index];
    empNameInput.value=currentEmp.name;
    empPhoneInput.value=currentEmp.phone
    empSalaryInput.value=currentEmp.salary
    empAgeInput.value=currentEmp.age;
    submitBtn.innerHTML="Edit Empolyee";
    currentIndex=index;
    

}

function editEmplyee(){
    var empolyee=
    {
       "name":empNameInput.value,
       "age":empAgeInput.value,
       "salary":empSalaryInput.value,
       "phone":empPhoneInput.value,
    }
    empolyees[currentIndex]=empolyee;
    localStorage.setItem("empolyeesList", JSON.stringify(empolyees))
}