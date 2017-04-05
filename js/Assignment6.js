function MenuChoice(){
      if (document.getElementById("menu").value == "Add a Customer")     {
            document.getElementById("section1").style.display = "block";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
            }

      else if (document.getElementById("menu").value == "Change Order Address"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "block";
            document.getElementById("section3").style.display = "none";
        }

      else if (document.getElementById("menu").value == "Delete a Customer"){
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "block";
        }

        else     {
            document.getElementById("section1").style.display = "none";
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "none";
        }
}

function AddCustomer(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";

      var customerid =document.getElementById("custid").value;
      var customername =document.getElementById("custname").value;
      var customercity =document.getElementById("custcity").value;

      var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername +'","City":"' + customercity +'"}';

      objRequest.onreadystatechange = function(){
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  OperationResult(result, document.getElementById("result1"));
            }
      }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(newcustomer);
}

function ChangeAddress(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";

      var orderid = document.getElementById("ordernumber").value;
      var shipaddress = document.getElementById("shipaddress").value;
      var shipcity = document.getElementById("shipcity").value;
      var shipname = document.getElementById("shipname").value;
      var postcode = document.getElementById("shippost").value;

      var updateorder = '{"OrderID":"' + orderid + '","ShipAddress":"' + shipaddress +'","ShipCity":"' + shipcity +'","ShipName":"' + shipname +'","ShipPostcode":"' + postcode +'"}';

      objRequest.onreadystatechange = function(){
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  OperationResult(result, document.getElementById("result2"));
            }
      }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(updateorder);
}

function DeleteCustomer(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
      url += document.getElementById("custid2");
      


      objRequest.onreadystatechange = function(){
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  OperationResult(result, document.getElementById("result3"));
            }
      }
        objRequest.open("GET", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(newcustomer);
      
}

function OperationResult(output, TargetElement) {
      if (output.WasSuccessful == 1)     {
          TargetElement.innerHTML = "The operation was successful!";
        }
      else{
          TargetElement.innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
      }
}




function GetHistory(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
      url += document.getElementById("custid1").value;

      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateHistory(output);
            }
      }
      //Initiate the server request
      objRequest.open("GET", url, true);
      objRequest.send();
      }

function GenerateHistory(result){
      var count = 0;
      var displaytext = "<table><tr><th>Product Name</th><th>Total Product Qauntity Ordered</th></tr>";

      for(count = 0; count < result.length; count++){
            displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
      }
      displaytext += "</table>";
      document.getElementById("historydisplay").innerHTML = displaytext;
}


function GetOrders(){
      var objRequest = new XMLHttpRequest();

      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
      url += document.getElementById("custid2").value;

      //Checks that the object has returned data
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateOrders(output);
            }
      }

      //Initiate the server request
      objRequest.open("GET", url, true);
      objRequest.send();
}

function GenerateOrders(result){
      var count = 0;
      var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Shipe Post Code</th><th>Shipped Date</th></tr>";

      for(count = 0; count < result.GetOrdersForCustomerResult.length; count++){
            displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
            //This line above is really ugly, other than that, table seems fine.
      }
      displaytext += "</table>";
      document.getElementById("orderdisplay").innerHTML = displaytext;
}
