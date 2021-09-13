import swal from 'sweetalert';

export const showMessage = (title,
    text,
    icon,
    button) => {

      return new Promise((resolve, reject) => {
        swal({
          title: title,
          text: text,
          icon: icon,
          button: button,
        }).then((value) => {
          resolve(value)
        }).catch((reason) => {
          reject(reason)
        });
    })
  }

  export const showMessageWithMultipleButton = (title,buttons) => {

      return new Promise((resolve, reject) => {
        swal(title,buttons).then((value) => {
          resolve(value)
        }).catch((reason) => {
          reject(reason)
        });
    })
  }

