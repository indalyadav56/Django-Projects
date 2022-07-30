import axios from "axios";
import { API } from "../../env";

export const addCartData = (id) => async (dispatch) => {
  const response = await axios.post(
    `${API}/cart/`,
    { id: id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  dispatch({
    type: "ADD_CART",
    payload: response.data,
  });
};
