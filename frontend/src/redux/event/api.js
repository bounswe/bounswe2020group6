import api from "../../axios";
import moment from 'moment';

// sends a post request to create an event
export const postEvent = (body, history, message) => {
  return (dispatch) => {
    // send post request
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

// gets the event information
export const getEvent = (eventId, history, setEventData, setloading) => {
  return (dispatch) => {
    // send get request
    api({ sendToken: true })
      .get("/event/event/" + eventId)
      .then((response) => {
        // get user id
        var myId = localStorage.getItem("userId")

        // check if it is current users event
        if(parseInt(response.data.result.userId) !== parseInt(myId)){
          history.goBack();
        }

        setEventData(() => {
          var next = {
            ...response.data.result,
            tags: response.data.result.event_tags.map(t => t.tag), 
          }
          next.date = moment(new Date(next.date))
          return next
        });
        setloading(false)
      })
      .catch((e) => {
        console.log(e)
        history.goBack();
      });
  };
};

// edit the post
export const editEvent = (body, eventId, history, message) => {
  return (dispatch) => {
    // send patch request
    api({ sendToken: true })
      .patch("/event/update/" + eventId, body)
      .then((response) => {
        message.success("Event changes saved.", 4);
        history.push("/event/details/" + eventId);
      })
      .catch((e) => {
        message.error("Event changes failed.", 4);
      });
  };
};

export const deleteEvent = (eventId, history, message) => {
  return (dispatch) => {
    var body = {id: eventId}

    api({ sendToken: true })
      .delete("/event/delete/", body)
      .then((response) => {
        message.success("Event deleted.", 4);
        history.push("/home");
      })
      .catch((e) => {
        message.error("Event delete failed.", 4);
      });
  };
};