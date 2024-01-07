import Swal from "sweetalert2";

function sweetAlert(message) {
  Swal.fire({
    title: "Catatan Disimpan!",
    text: message,
    icon: "success",
  });
}

export default sweetAlert;
