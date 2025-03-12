import Swal, { SweetAlertIcon } from 'sweetalert2';

export const showAlert = (
  title: string,
  text: string,
  icon: SweetAlertIcon
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};

// export const showMessageConfirm = () => {
//   Swal.fire(
//     Swal.fire('The Internet?', 'That thing is still around?', 'question')
//   );
// };
