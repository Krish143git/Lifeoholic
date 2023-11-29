const RAZOR_PAY_BASE_URL = `https://api.razorpay.com/v1/orders`;
const createOrder = ({ amount = 50000, currency = "INR", receipt = "" }) => {};

const template = ({ orderId, apiKey, amount, description, customer }) => {
  return `<button id="rzp-button1">Pay</button>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
    var options = {
        "key": ${apiKey}, // Enter the Key ID generated from the Dashboard
        "amount": ${amount}, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Lifeholic", //your business name
        "description": ${description || ""},
        "order_id": ${orderId},
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": {
            "name": ${customer?.name || ""}, //your customer's name
            "email": ${customer?.email || ""},
            "contact": ${customer?.contact || ""}
        },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    document.getElementById('rzp-button1').onclick = function(e){
        rzp1.open();
        e.preventDefault();
    }
    </script>`;
};
