import axios from 'axios';
import { showAlert } from './alert';

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'check your mail to reset the password!!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert(err.response.data.message);
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const url = `/api/v1/users/resetPassword/${token}`;
    const res = await axios({
      method: 'PATCH',
      url,
      data: {
        password,
        passwordConfirm,
      },
    });
    if (res?.data?.status === 'success') {
      showAlert('success', 'Your Password has been Changed');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else {
      showAlert('error', 'Reset password failed. Please try again.');
    }
  } catch (err) {
    showAlert(err.response.data.message);
  }
};
