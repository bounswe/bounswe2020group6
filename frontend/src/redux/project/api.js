//import * as actions from "./actions";
import api from "../../axios";

export const getPost = (projectId, setProjectData) => {
  return (dispatch) => {

    api({ sendToken: true })
      .get("/post/get/" + projectId + "/1")
      .then((response) => {
        console.log(response.data[0])
        setProjectData({
          ...response.data[0], 
          project_tags: response.data[0].project_tags.map(x => x.tag), 
        });
      })
      .catch((e) => {
        console.log(e)
      });
  };
};

export const postPost = (body, history, message) => {
  return (dispatch) => {

    api({ sendToken: true })
      .post("/post/add", body)
      .then((response) => {
        message.success("Project successfully posted.", 4);
        history.push("/home");
      })
      .catch((e) => {
        message.success("Project posting failed.", 4);
      });
  };
};

export const editPost = (body, projectId, history, message) => {
  return (dispatch) => {

    api({ sendToken: true })
      .patch("/post/update/" + projectId, {
        projectId, ...body
      })
      .then((response) => {
        message.success("Project changes saved.", 4);
      })
      .catch((e) => {
        message.error("Project changes failed.", 4);
      });
  };
};

export const addTag = (projectId, newTags, message) => {
  return (dispatch) => {

    api({ sendToken: true })
      .post("/post/add_tag/", {
        projectId, 
        tags: newTags
      })
      .then((response) => {
        message.success("Tag added.", 4);
      })
      .catch((e) => {
        message.error("Tag can't be added.", 4);
      });
  };
};

export const deleteTag = (projectId, deletedTags, message) => {
  return (dispatch) => {

    api({ sendToken: true })
      .delete("/post/delete_tag/?projectId=" + projectId + "&" + deletedTags.map(x => "tags[]=" + x).join('&'))
      .then((response) => {
        message.success("Tag removed.", 4);
      })
      .catch((e) => {
        message.error("Tag can't be removed.", 4);
      });
  };
};


export const addMilestone = (projectId, milestoneData, setProjectData, message) => {
  return (dispatch) => {

    api({ sendToken: true })
      .post("/post/add_milestone/", {
        projectId, 
        ...milestoneData
      })
      .then((response) => {
        message.success("New milestone created.", 4);
        dispatch(getPost(projectId, setProjectData));
      })
      .catch((e) => {
        message.error("Milestone can't be created.", 4);
      });
  };
};

export const updateMilestone = (projectId, milestoneData, setProjectData, message) => {
  return (dispatch) => {

    api({ sendToken: true })
      .patch("/post/update_milestone/" + milestoneData.id, milestoneData)
      .then((response) => {
        message.success("Milestone updated.", 4);
        dispatch(getPost(projectId, setProjectData));
      })
      .catch((e) => {
        message.error("Milestone can't be updated.", 4);
      });
  };
};


export const deleteMilestone = (projectId, milestoneData, setProjectData, message) => {
  return (dispatch) => {

    api({ sendToken: true })
      .delete("/post/delete_milestone/" + milestoneData.id, milestoneData)
      .then((response) => {
        message.success("Milestone deleted.", 4);
        dispatch(getPost(projectId, setProjectData));
      })
      .catch((e) => {
        message.error("Milestone can't be deleted.", 4);
      });
  };
};


