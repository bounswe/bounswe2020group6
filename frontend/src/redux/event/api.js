import api from "../../axios";

// sends a post request to create an event
export const postEvent = (body, history, message) => {
  return (dispatch) => {
    api({ sendToken: true })
      .post("/event/add", body)
      .then((response) => {
        console.log(body)
        // success message
        message.success("Event successfully posted.", 4);
        // redirect to page of the created event
        history.push("/event/details/" + response.data.id);
      })
      .catch((e) => {
        // fail message
        message.success("Event posting failed.", 4);
      });
  };
};


