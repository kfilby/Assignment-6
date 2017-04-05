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
                  //OperationResult(result, document.getElementById("result2"));
                  if (result == 1)     {
                        document.getElementById("result2").innerHTML = "The operation was successful!";
                  }
                   else{
                        document.getElementById("result2").innerHTML = "The operation was not successful!";
                  }
            }           
            }
        objRequest.open("POST", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send(updateorder);
      }

function DeleteCustomer(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
      url += document.getElementById("custid2").value;
      var x = confirm("Are you sure you want to delete this user?");


      objRequest.onreadystatechange = function(){
             if (objRequest.readyState == 4 && objRequest.status == 200){
                  var result = JSON.parse(objRequest.responseText);
                  if(x === true){
                        //OperationResult(result, document.getElementById("result3"));
                        if (result.DeleteCustomerResult.WasSuccessful == 1)     {
                              document.getElementById("result3").innerHTML = "The operation was successful!";
                        }
                        else{
                              document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + result.Exception;
                        }
                  }
            }
      }
        objRequest.open("GET", url, true);
        objRequest.send();
      
}

function OperationResult(output, TargetElement) {
      if (output.WasSuccessful == 1)     {
          TargetElement.innerHTML = "The operation was successful!";
        }
      else{
          TargetElement.innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
      }
}



