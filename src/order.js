const ezPizzaAPI = require('./index');

async function orderPizza() {
  // Create an Order with the following properties
  const order = {
    Order: {
      Address: { 
        City: "KANSAS",
        OrganizationName: "Kennys Org",
        PostalCode: "90851",
        Region: "MI",
        Street: "123 SOMEWHERE ST",
        StreetName: "SOMEWHERE ST",
        StreetNumber: "123",
        Type: "Apartment",
        UnitNumber: "123",
        UnitType: "APT"
      },
      Coupons: [],
      CustomerID: "",
      Email: "contact@kgunderman.com",
      Extension: "",
      FirstName: "Kenny",
      HotspotsLite: false,
      LanguageCode: "en",
      LastName: "Gunderman",
      NoCombine: true,
      OrderChannel: "OLO",
      OrderInfoCollection: [],
      OrderMethod: "Web",
      OrderTaker: null,
      Partners: {},
      Payments: [],
      Phone: "5555555555",
      PhonePrefix: "",
      // An array of products. Find the corresponding code and available options in the menu response.
      Products: [{
        Code: '14SCMEATZA',
        ShowBestPriceMessage: false,
        Qty: 1,
        isNew: true,
        Options: {
          B: {
            '1/1': '1',
          },
          C: {
            '1/1': '1.5',
          },
          H: {
            '1/1': '1',
          },
          P: {
            '1/1': '1',
          },
          S: {
            '1/1': '1',
          },
          X: {
            '1/1': '1',
          },
        },
      }],
      ServiceMethod: "Delivery",
      SourceOrganizationURI: 'order.dominos.com',
      StoreID: "1234", //<- Not a real store
      Tags: {},
      Version: '1.0',
      metaData: {
        orderFunnel: "payments"
      }
    },
  };

  const orderValid = await ezPizzaAPI.validateOrder(order);
  order.Order.OrderID = orderValid.Order.OrderID; // get the generated orderID from the response

  console.log('---order valid---');
  console.log(orderValid);
  console.log('---order---');
  console.log(order);

  const pricedOrder = await ezPizzaAPI.priceOrder(order);
  const Amount = pricedOrder.Order.Amounts.Customer; // get total amount for order
  console.log('---priced order---');
  console.log(pricedOrder);


  // specify the amount and credit card info OR see how to use cash on delivery below
  console.log("--amount---");
  console.log(Amount);
  order.Order.Payments.push({
    Amount: Amount,
    Type: 'CreditCard',
    Number: '123123123123123123',
    CardType: 'MASTERCARD',
    Expiration: '1234',
    SecurityCode: '1234',
    PostalCode: '123456',
  });

  // OR
  // specify the amount type as Cash
  // order.Order.Payments.push({
  //   Amount,
  //   Type: 'Cash', // <- Pay cash on delivery
  // });

  // const placedOrder = await ezPizzaAPI.placeOrder(order);
  // // For a succesful order, look for:
  // // StoreOrderID
  // // EmailHash
  // // StatusItems: [ { Code: 'Success' } ] }

  // // Be sure to check your email before trying again.
  // // Sometimes this has a failure status but the order still goes through...
  // console.log("---placing order---")
  // console.log(placedOrder);

  // console.log("---status items---")
  // console.log(placedOrder.Order.StatusItems);

  return "Order sent for delivery! Your total is: " + Amount;

  // console.log("--payments--");
  // console.log(placedOrder.Order.Payments);

  // Getting the orderID may vary. Validate by looking at the placedOrder response
  // const orderID = placedOrder.Order.StoreOrderID.split('#')[1]; // <- This might change depending on store
  // const orderStatus = await ezPizzaAPI.trackOrder(storeResult.StoreID, orderID);
  // console.log(orderStatus);
}

module.exports = { orderPizza }