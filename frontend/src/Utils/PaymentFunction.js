import { enqueueSnackbar } from "notistack";
import axios from "axios";
import pic from './../Assets/logo.png'
import { createOrderAPI, makeOrderAPI, verifyOrderAPI } from "../APIS";

const openRazorpay = (data, prodArr) => {
    const id = JSON.parse(localStorage.getItem('id'));
    const PAYMENT_ID = "rzp_test_bM6AUjqpFmH4EQ";

    const options = {
        key: PAYMENT_ID,
        amount: (Number)(data.amount),
        currency: 'INR',
        name: 'BUY-NOW',
        desription: "It is the total amount for all of your cart items.",
        order_id: data.id,
        handler: async function (response) {
            try {
                const result = await axios.post(verifyOrderAPI, { response: response });
                if (result.status === 200) {
                    try {
                        await axios.post(`${makeOrderAPI}${id}`, { products: prodArr });
                        enqueueSnackbar("Order Placed Successfully. Check Your Orders in profile section. !!", {
                            variant: "success",
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            },
                            autoHideDuration: 3000
                        })
                    }
                    catch (err) {
                        alert(err);
                    }
                }
            }
            catch (err) {
                if (err.status === 400) {
                    enqueueSnackbar(err.response.data.error, {
                        variant: "warning",
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        autoHideDuration: 3000
                    })
                }
            }
        },
        image: pic,
        theme: {
            color: "#3399cc"
        }
    }

    const Razorpay = new window.Razorpay(options);
    Razorpay.open();

}
export const placeOrder = async (amount, userLoggedIn, prodArr) => {
    if (userLoggedIn) {
        try {
            const data = { amount: amount };
            const response = await axios.post(createOrderAPI, data);
            openRazorpay(response.data, prodArr);
        }
        catch (err) {
            alert(err);
        }
    }
    else {
        enqueueSnackbar('Please Login First!', {
            variant: "warning",
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            },
            autoHideDuration: 3000
        });
        return;
    }
}