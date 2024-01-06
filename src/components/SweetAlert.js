import Swal from "sweetalert2";

function sweetAlert() {
  Swal.fire({
    title: "Catatan Disimpan!",
    text: "Berhsil Menyimpan Catatan",
    icon: "success",
  });
}

export default sweetAlert;
