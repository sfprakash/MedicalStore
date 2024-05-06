let userIdAutoIncrement = 1002;
let medicineIdAutoIncrement = 100;
let orderIdAutoIncrement = 2007;

let currentUserId:number;
let currentMedicineId:number;
let currentloggedInUser:User;


interface User{
    userID:number;
    userEmail:string;
    userPassword:string;
    userPhone:string;
    walletBalance:number;

}


interface MedicineInfo {

    medicineID: number;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    medicineExpiryDate: string;

}

// enum OrderStatus { Ordered, Cancelled}

interface Order {
    orderID: number;
    medicineID: number;
    userID: number;
    medicineName: string;
    medicineCount: number;
    totalPrice: number;
    orderStatus: string;

}

const form = document.getElementById("signupform") as HTMLFormElement;

form.addEventListener("submit", async (event)  => {
    try{
        event.preventDefault();
        const userEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
        const userPassword = (document.getElementById("CFPassword") as HTMLInputElement).value;
        const userPhone = (document.getElementById("userPhone") as HTMLInputElement).value;
        userIdAutoIncrement++;
        const user:User = {
            userID: userIdAutoIncrement,
            userEmail: userEmail,
            userPassword: userPassword,
            userPhone: userPhone,
            walletBalance: 0
        };
        await addUser(user);
        alert("Your User ID - " +user.userID);
        currentloggedInUser = user;
    }catch (error){
        console.log(error);
    }
    medicinePage();
   
});

async function addUser(user: User): Promise<void> {
    const response = await fetch("http://localhost:5191/api/User",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add user");
    }
}

async function addMedicine(medicine:MedicineInfo):Promise<void> {
    const response = await fetch("http://localhost:5191/api/MedicineInfo",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(medicine)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add medicine");
    }
}

async function addOrder(order:Order):Promise<void> {
    const response = await fetch("http://localhost:5191/api/Order",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(order)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add order");
    }
}

async function SignIn()
{
    let noExistingUserIdChecker:boolean = true;
    let existingUserId = parseInt((document.getElementById("existingUserId") as HTMLInputElement).value);
    // let existingUserIDRegex = /^UI\d{4}$/;
    
    let userArrayList = await fetchUser();
    for(let i=0; i<userArrayList.length; i++)
    {
        if(userArrayList[i].userID == existingUserId)
        {
            noExistingUserIdChecker = false;
            currentUserId = existingUserId;
            currentloggedInUser = userArrayList[i];
            alert("logged-in");
            medicinePage();
            return;
        }
    }
    if(noExistingUserIdChecker)
    {
        alert("Invalid UserID");
    }

}

async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5191/api/User';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch User");
    }
    return await response.json();
    
}

async function fetchMedicine(): Promise<MedicineInfo[]> {
    const apiUrl = 'http://localhost:5191/api/MedicineInfo';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch medicine");
    }
    return await response.json();
    
}

async function fetchOrder(): Promise<Order[]> {
    const apiUrl = 'http://localhost:5191/api/Order';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch order");
    }
    return await response.json();
    
}

// let editingID: number | null = null;
// async function editOrder(id:number) {
//     editingID = id;
    
// }

async function updateUser(id:number, user:User):Promise<void> {
    const response = await fetch(`http://localhost:5191/api/User/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("Failed to update user");
    }
    
}

async function updateMedicine(id:number, medicine:MedicineInfo):Promise<void> {
    const response = await fetch(`http://localhost:5191/api/MedicineInfo/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if(!response.ok)
    {
        throw new Error('Failed to update medicine');
    }
}

async function updateOrder(id:number, order:Order):Promise<void> {
    const response = await fetch(`http://localhost:5191/api/Order/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(order)
    });
    if(!response.ok)
    {
        throw new Error('Failed to update order');
    }
}


function homePage()
{
    let homePage = document.getElementById("home-page") as HTMLDivElement;

    homePage.style.display="block";
}

function newUser()
{
    let home = document.getElementById("home-page") as HTMLDivElement;
    let newUser = document.getElementById("new-user-page") as HTMLDivElement;

    home.style.display="none";
    newUser.style.display="block";

}

// function SignUp()
// {
//     let newUserEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
//     let newUserPassword = (document.getElementById("CFPassword")as HTMLInputElement).value;
//     let newUserPhone = (document.getElementById("userPhone") as HTMLInputElement).value;
//     let newUser1:User = new User(newUserEmail,newUserPassword,+newUserPhone);
//     UserArrayList.push(newUser1);
//     alert("User ID is " +newUser1.UserId);
//     medicinePage();
//     return false
//     // linkIn();
// }

function existingUser()
{
    let home = document.getElementById("home-page") as HTMLDivElement;
    let existingUser = document.getElementById("existing-user-page") as HTMLDivElement;
    let newUserPage = document.getElementById("new-user-page") as HTMLDivElement;

    home.style.display="none";
    newUserPage.style.display="none";
    existingUser.style.display="block";

}

function linkIn()
{
    let newUser = document.getElementById("new-user-page") as HTMLDivElement;
    let existingUser = document.getElementById("existing-user-page") as HTMLDivElement;

    newUser.style.display="none";
    existingUser.style.display="block";
}



function medicinePage() {

    let homePage = document.getElementById("home-page") as HTMLDivElement;
    let existingUserPage = document.getElementById('existing-user-page') as HTMLDivElement;
    let medicinePage = document.getElementById('medicine-page') as HTMLDivElement;
    let greet = document.getElementById('greet') as HTMLLabelElement;

    homePage.style.display="none";
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    return false;
    // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
}


async function showMedicine(){
    
    let medicineInfoPage = document.getElementById("medicine-info") as HTMLDivElement;
    medicineInfoPage.style.display="block";

    let table = document.getElementById("dataTable") as HTMLTableElement;
    table.innerHTML="";
    // let medicineBtn = document.getElementById("medicine-btn") as HTMLButtonElement;
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"MedicineID"}</th><th>${"Medicine Name"}</th><th>${"Medicine Count"}</th><th>${"Medicine Price"}</th><th>${"Expiry Date"}</th>`;
    table.appendChild(heading);

    let medicineList = await fetchMedicine();
    for(let i=0; i<medicineList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${medicineList[i].medicineID}</td>
        <td>${medicineList[i].medicineName}</td>
        <td>${medicineList[i].medicineCount}</td>
        <td>${medicineList[i].medicinePrice}</td>
        <td>${medicineList[i].medicineExpiryDate.toString().substring(0,10)}</td>`;

        table.appendChild(row);
    }
    // medicineBtn.disabled=true;
}

async function Purchase()
{
    let medicineInfoPage = document.getElementById("medicine-info") as HTMLDivElement;
    medicineInfoPage.style.display="none";
    let purchasePage = document.getElementById("purchase-block") as HTMLDivElement;
    purchasePage.style.display="block";

    let table = document.getElementById("purchase-table") as HTMLTableElement;
    table.innerHTML="";
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"MedicineID"}</th><th>${"Medicine Name"}</th><th>${"Medicine Count"}</th><th>${"Medicine Price"}</th><th>${"Expiry Date"}</th><th></th>`;
    table.appendChild(heading);

    let medicineList = await fetchMedicine();
    for(let i=0; i<medicineList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${medicineList[i].medicineID}</td>
        <td>${medicineList[i].medicineName}</td>
        <td>${medicineList[i].medicineCount}</td>
        <td>${medicineList[i].medicinePrice}</td>
        <td>${medicineList[i].medicineExpiryDate.toString().substring(0,10)}</td>
        <td><button onclick="setGlobalMedicineId('${medicineList[i].medicineID}');">buy</button></td>`;

        table.appendChild(row);
    }
}

function setGlobalMedicineId(medicineId:number)
{
    currentMedicineId = medicineId;
    let quantityBlock = document.getElementById("quantity-block") as HTMLDivElement;
    quantityBlock.style.display="block";
    
}

function getQuantity()
{
    let quantity:number = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    buyMedicine(quantity);
}

async function buyMedicine(quantity:number)
{
    let medicineList = await fetchMedicine();
    for(let i=0; i<medicineList.length; i++)
    {
        if(medicineList[i].medicineID == currentMedicineId)
        {
            medicineList[i].medicineCount -= quantity;
            updateMedicine(medicineList[i].medicineID,medicineList[i]);
            let totalPrice = quantity * medicineList[i].medicinePrice;
            currentloggedInUser.walletBalance -= totalPrice;
            updateUser(currentloggedInUser.userID,currentloggedInUser);
            orderIdAutoIncrement++;
            let newOrder: Order = {
                orderID: orderIdAutoIncrement,
                medicineID: medicineList[i].medicineID,
                userID: currentloggedInUser.userID,
                medicineName : medicineList[i].medicineName,
                medicineCount: quantity,
                totalPrice: totalPrice,
                orderStatus: "Ordered"

            };
            addOrder(newOrder);
            alert("Order Successful");
        }
    }
}

async function CancelOrder()
{
    let cancelOrderTable = document.getElementById("cancel-order") as HTMLTableElement;
    cancelOrderTable.innerHTML="";
    // let cancelOrderBtn = document.getElementById("cancel-order-btn") as HTMLButtonElement;

    let heading = document.createElement("tr");
    heading.innerHTML=`<th>Order ID</th>
    <th>User ID</th>
    <th>Medicine ID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>
    <th></th>`;
    cancelOrderTable.appendChild(heading);

    let orderList = await fetchOrder();
    for(let i=0; i<orderList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${orderList[i].orderID}</td>
        <td>${orderList[i].userID}</td>
        <td>${orderList[i].medicineID}</td>
        <td>${orderList[i].medicineName}</td>
        <td>${orderList[i].medicineCount}</td>
        <td>${orderList[i].totalPrice}</td>
        <td>${orderList[i].orderStatus}</td>
        <td><button onclick="OrderCancel('${orderList[i].orderID}')";>Cancel</button></td>`;

        cancelOrderTable.appendChild(row);
    }
    // cancelOrderBtn.disabled=true;

}

async function OrderCancel(orderID:number)
{
    let orderList = await fetchOrder();
    for(let i=0; i<=orderList.length; i++)
    {
        if(orderList[i].orderID == orderID)
        {
            orderList[i].orderStatus = "Cancelled";
            updateOrder(orderID,orderList[i]);
            alert("Order Cancelled Successfully");
            break;
        }
    }
    CancelOrder();
}

async function OrderHistory()
{   
    let orderHistoryTable = document.getElementById("order-history") as HTMLTableElement;
    orderHistoryTable.innerHTML="";
    // let orderHistoryBtn = document.getElementById("order-history-btn") as HTMLButtonElement;
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>Order ID</th>
    <th>User ID</th>
    <th>Medicine ID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>`;
    orderHistoryTable.appendChild(heading); 

    let orderList = await fetchOrder();
    for(let i=0; i<orderList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${orderList[i].orderID}</td>
        <td>${orderList[i].userID}</td>
        <td>${orderList[i].medicineID}</td>
        <td>${orderList[i].medicineName}</td>
        <td>${orderList[i].medicineCount}</td>
        <td>${orderList[i].totalPrice}</td>
        <td>${orderList[i].orderStatus}</td>`;

        orderHistoryTable.appendChild(row);
    }
    // orderHistoryBtn.disabled=true;

}

function TopUp()
{
    let topUpPage = document.getElementById("top-up-block") as HTMLDivElement;
    topUpPage.style.display="block";
}
async function getAmount()
{
    let amount =parseInt((document.getElementById("top-up-amount") as HTMLInputElement).value);
    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].userID == currentloggedInUser.userID)
        {
            userList[i].walletBalance += amount;
            updateUser(userList[i].userID,userList[i]);
            alert(`Recharge Successful - Balance : ${userList[i].walletBalance}` );
            break;
        }
    }
}

async function ShowBalance()
{
    let showBalancePage = document.getElementById("show-balance-block") as HTMLDivElement;
    showBalancePage.style.display="block";
    showBalancePage.innerHTML="";

    let line = document.createElement("p");
    let balance:number = 0;
    
    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].userID == currentloggedInUser.userID)
        {
            balance = userList[i].walletBalance;
            break;
        }
    }
    line.innerHTML=`Current Balance - ${balance}`;
    showBalancePage.appendChild(line);
}

function home()
{
    let homepage = document.getElementById("home-page") as HTMLDivElement;
    let newuserpage = document.getElementById("new-user-page") as HTMLDivElement;
    let existinguserpage = document.getElementById("existing-user-page") as HTMLDivElement;
    let medicinepage = document.getElementById("medicine-page") as HTMLDivElement;
    homepage.style.display="block";
    newuserpage.style.display="none";
    existinguserpage.style.display="none";
    medicinepage.style.display="none";

}