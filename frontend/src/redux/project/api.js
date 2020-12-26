//import * as actions from "./actions";
import api from "../../axios";

export const getPost = (projectId, setProjectData) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .get("/post/get/" + projectId + "/1")
      .then((response) => {
        //dispatch(actions.newPostSuccessAction());
        console.log(response.data[0])
        setProjectData({
          ...response.data[0], 
          project_tags: response.data[0].project_tags.map(x => x.tag), 
        });
      })
      .catch((e) => {
        //dispatch(actions.newPostFailAction());
        console.log(e)
      });
  };
};

export const postPost = (body, history, message) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .post("/post/add", body)
      .then((response) => {
        //dispatch(actions.newPostSuccessAction());
        message.success("Project successfully posted.", 4);
        history.push("/home");
      })
      .catch((e) => {
        //dispatch(actions.newPostFailAction());
        message.success("Project posting failed.", 4);
      });
  };
};

export const editPost = (body, projectId, history, message) => {
  return (dispatch) => {
    //dispatch(actions.editPostStartAction());

    api({ sendToken: true })
      .patch("/post/update/" + projectId, {
        projectId, ...body
      })
      .then((response) => {
        //dispatch(actions.editPostSuccessAction());
        message.success("Project changes saved.", 4);
      })
      .catch((e) => {
        //dispatch(actions.editPostFailAction());
        message.error("Project changes failed.", 4);
      });
  };
};

export const addTag = (projectId, newTags, message) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .post("/post/add_tag/", {
        projectId, 
        tags: newTags
      })
      .then((response) => {
        //dispatch(actions.editPostSuccessAction());
        message.success("Tag added.", 4);
      })
      .catch((e) => {
        //dispatch(actions.editPostFailAction());
        message.error("Tag can't be added.", 4);
      });
  };
};

export const deleteTag = (projectId, deletedTags, message) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .delete("/post/delete_tag/?projectId=" + projectId + "&" + deletedTags.map(x => "tags[]=" + x).join('&'))
      .then((response) => {
        //dispatch(actions.editPostSuccessAction());
        message.success("Tag removed.", 4);
      })
      .catch((e) => {
        //dispatch(actions.editPostFailAction());
        message.error("Tag can't be removed.", 4);
      });
  };
};


export const addMilestone = (projectId, milestoneData, setProjectData, message) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .post("/post/add_milestone/", {
        projectId, 
        ...milestoneData
      })
      .then((response) => {
        //dispatch(actions.editPostSuccessAction());
        message.success("New milestone created.", 4);
        dispatch(getPost(projectId, setProjectData));
      })
      .catch((e) => {
        //dispatch(actions.editPostFailAction());
        message.error("Milestone can't be created.", 4);
      });
  };
};

export const updateMilestone = (projectId, milestoneData, setProjectData, message) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .patch("/post/update_milestone/" + milestoneData.id, milestoneData)
      .then((response) => {
        //dispatch(actions.editPostSuccessAction());
        message.success("Milestone updated.", 4);
        dispatch(getPost(projectId, setProjectData));
      })
      .catch((e) => {
        //dispatch(actions.editPostFailAction());
        message.error("Milestone can't be updated.", 4);
      });
  };
};


export const deleteMilestone = (projectId, milestoneData, setProjectData, message) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .delete("/post/delete_milestone/" + milestoneData.id, milestoneData)
      .then((response) => {
        //dispatch(actions.editPostSuccessAction());
        message.success("Milestone deleted.", 4);
        dispatch(getPost(projectId, setProjectData));
      })
      .catch((e) => {
        //dispatch(actions.editPostFailAction());
        message.error("Milestone can't be deleted.", 4);
      });
  };
};


