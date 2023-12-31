import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51O2dQlSCJ7ycwlFjR2CEZDXOK2VvZr9oraOYXqYskqXJZ7jhsS59KeawCVzq3jhpX2JEw1h035PRJT3Wjhp4O18D007C25EpUj',
    );

    //1) get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );

    //2) Create checkout form + charge credit card


    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
