import swal from 'sweetalert';

export const showMessage = (title,
    text,
    icon,
    button) => {
      swal({
        title: title,
        text: text,
        icon: icon,
        button: button,
      });
    }