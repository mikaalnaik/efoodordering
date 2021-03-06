$.ajax('/data')
  .then(rows => {
    // console.log(rows);
    var food = rows;


    var total = []

    $(document).ready(function() {
      $("#openCart").click(function() {

        renderCart();
      });
      //render the food items
      renderFood(food);
      //open modal
      $("#modalButton").click(function() {
        $("#exampleModalCenter").modal();
      });

      //empty form on submission
      $('#orderSubmit').click(function() {
        if(total.length > 0){
          document.cookie = JSON.stringify(total)
          //var div = $('#cartBody')['0'].innerHTML;
          //console.log(div.search('itemCart'));
          console.log($('#cartBody'))

          $('#cartBody').replaceWith(checkoutHTML)
          $('.modal-footer').html('');
        } else {
          alert('Empty cart cannot be processed.')
        }


        // var x = document.cookie

      })


      $('#btnplaceorder').click(function(){
        $('#modal-footer').html('<h2> Success </h2>')
      });


      $('.addCart').click(function() {

        var unitPrice = $(this).parent().parent().find('.price').text();
        var nameFood = $(this).parent().parent().find('.foodName').text();
        var quant = $(this).parent().parent().find('.quantity').val()

        unitPrice = unitPrice.replace(/\s/g, "");
        console.log(unitPrice);
        console.log(nameFood);
        console.log(quant);

        var order = {
          'foodId': $(this).prop('id'),
          'price': unitPrice,
          'foodName': nameFood,
          'quantity': quant
        }

        // total = JSON.parse(getCookie('food')) || []
        total.push(order);
        console.log(total)


        // var jsonCookie = JSON.stringify(total)
        // document.cookie = `food = ${jsonCookie}`;

      });



      //counter
      $(".incr-btn").on("click", function(e) {
        var $button = $(this);
        var oldValue = $button.parent().find('.quantity').val();
        $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
        if ($button.data('action') == "increase") {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          // Don't allow decrementing below 1
          if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 1;
            $button.addClass('inactive');
          }
        }
        $button.parent().find('.quantity').val(newVal);
        e.preventDefault();
      });

    });






    //iterate through JSON data and apply function to each element
    function renderFood(food) {
      for (var i = 0; i < food.length; i++) {
        //food.length
        var newFood = createFoodCard(food[i])
        $('.row').append(newFood);
      }
    };

    function createFoodCard(input) {
      var newHTML =
                  `<div class= 'card'>
                  <div class="${input.foodId}">
                  <img src="${input.imageURL}" alt="Card image cap">
                  <div class="card-body">
                  <h5 class="card-title">${input.foodName} - $${input.price}</h5>
                  <p class="card-text">${input.description} </p>
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${input.foodId}">
                  Learn more
                  </button>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div class="modal fade" id="${input.foodId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle"><div class='foodName'>${input.foodName}</div>-<div class='price'> ${input.price}</div></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
                  </div>
                  <div class="modal-body">
                  <img class="imgmodal" src="${input.imageURL}" alt="Card image cap">
                  <br>
                  ${input.description}
                  <div class="container">
                  <div class="count-input space-bottom">
                  <a class="incr-btn" data-action="decrease" href="#">–</a>
                  <input class="quantity" type="text" name="quantity" value="1"/>
                  <a class="incr-btn" data-action="increase" href="#">&plus;</a>
                  </div>
                  </div>
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn-lg btn-block" data-dismiss="modal">Close</button><br>
                  <button type="button" id=${input.foodId} class="btn btn-secondary btn-lg btn-block addCart" data-dismiss='modal'>Add to Cart</button>


                  </div>
                  </div>
                  </div>
                  </div>`
      return newHTML;
    };

    //call cookie by name
    // function getCookie(name) {
    //   var value = "; " + document.cookie;
    //   var parts = value.split("; " + name + "=");
    //   if (parts.length == 2) return parts.pop().split(";").shift();
    // }

    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }


    function renderCart(cartList) {

      for (var i = 0; i < total.length; i++) {
        console.log(total[i]);
        var cartListed = fillCart(total[i])
        $('#cartBody').append(cartListed);
      }
    }
    // <button type='button' id='removeCart'> Remove </button>

    function fillCart(input) {
      var cartHTML = `
      <div class="container">
      <div class="row">
      <div class="col-sm">
      <div id='cartName'>
      ${input.foodName}
      </div>
      </div>
      <div class="col-sm">
      $${input.price}
      </div>
      <div class="col-sm">
      Quantity - ${input.quantity}
      </div>
      </div>
      </div><div class='itemCart'>
      </div>
        `
      return cartHTML;
    }
    var checkoutHTML = `
<form id="frmcheckout">
  <table id='cartTable' align="center"  border-width: 5px; margin-top: 30px; padding: 10px;">
    <tr>
      <th align="right">User Name</th>
      <td colspan="2"><input type="text" name="txtname" id="txtname"></td>
    </tr>
    <tr>
      <!--
        ==========NOTE FOR FUTURE DEVELOPERS HERE =====
        This name cell is used in coding to extract  information on server.js app.post("/checkout") route.
        Please make change to the code if you change the name from 'cell' to something else...
      -->
      <th align="right">Cell # (Example: 1234567890)</th>
      <td colspan="2"><input type="number" name="cell" id="txtcell"></td>
    </tr>
    <tr>
      <td>
      <td colspan="2">
        <ul id="errList" style="color: red;">
        </ul>
      </td>
    </tr>
    <tr>
      <td colspan="3"><input type="hidden" name="txtamount" id="txtamount"></td>
    </tr>
    <tr>
      <td colspan="3"><input type="hidden" name="txttax" id="txttax"></td>
    </tr>
    <tr>
      <td colspan="3"><input type="hidden" name="txtordertotal" id="txtordertotal"></td>
    </tr>
    <tr>
      <th>Payment Options</th>
      <td colspan="2">
        <input type="radio" name="payoption" value="0" checked>At Counter
        <input type="radio" name="payoption" value="1" >Pay by Card
      </td>
    </tr>
    <tr>

      <td>
        <button id="btnplaceorder" type="submit">Place Order</button>
      </td>
    </tr>
</form>
    <tr>
      <td colspan="3">
      <div id="paydiv"> <!-- Payment using Credit/debit card -->
        </div>
      </td>
    </tr>
</table>
`
  })
