import { toast } from "react-toastify";

export const showToast = (msg="demo", type="info") => {
    toast(msg, {
      position: "top-right",
      autoClose: 3000,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      type: type,
    });
}