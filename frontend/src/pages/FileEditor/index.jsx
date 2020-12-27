import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../axios";


import { Col, Row, Alert, Spin, Tag, message, Upload, Button } from "antd";
import { FileOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import Frame from "../../components/Frame";
import {
  H2,H3,H4,
  Main,
  Files,
  FileContainer,
  FileDiv,
  Side
} from "./style";

import { Input } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { TextArea } = Input;

const FileEditor = () => {

  const emptyFileData = {data:"", name:""};

  const isPlainText = (extension) => {
    const plainTextExtensions = [".txt", "", ".json", ".md"];
    var x;
    for(x of plainTextExtensions) {
      if (x.localeCompare(extension) === 0) {
        return true;
      }
    }
    return false;
  }

  const isImg = (extension) => {
    const plainTextExtensions = [".png", ".gif", ".jpg", ".bmp"];
    var x;
    for(x of plainTextExtensions) {
      if (x.localeCompare(extension) === 0) {
        return true;
      }
    }
    return false;
  }

  const displayFile = (filename, i) => {
    setSelectedFile(i);
    let extension = filename.indexOf(".") === -1 ? "" : filename.substring(filename.lastIndexOf("."));
    setFileFormat(extension);

    if (isPlainText(extension)){
      getFileData(filename);
    } else if (isImg(extension)) {
      setFileData(prev => ({name: filename}));
    }else {
      setFileData(prev => ({name: filename}));
    }
  }

  function getFileData(filename) {
    setLoadingFile(true);

    setFileData(prev => ({name: filename}));
    api({ sendToken: true })
      .get("/file/get/" + projectId + "/" + filename, {
        responseType: 'buffer'
      })
      .then(
        response => {
          setFileData(prev => ({
            name: filename, 
            data: typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data 
          }));
          setLoadingFile(false);
        }
      )
      .catch((e) => {
        console.log(e)
        setLoadingFile(false);
      });
  }

  const downloadFile = (filename) => {
    api({ sendToken: true })
      .get("/file/get/" + projectId + "/" + filename)
      .then((response) => {
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(response.data)
        );
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFile = (filename) => {
    api({ sendToken: true })
      .delete("/file/delete/" + projectId + "/" + filename)
      .then((response) => {
        message.success("File deleted successfully.");
        getProjectData();
        setSelectedFile(null);
        setFileFormat(null);
        setFileData(emptyFileData);
      })
      .catch((error) => {
        message.error("File couldn't be deleted.");
      });
  };

  const toFile = (newFile) => {
    var blob = new Blob([newFile.data], { type: 'text/plain' });
    var file = new File([blob], newFile.name, {type: "text/plain"});
    return file;
  }

  const replaceFile = (newFile) => {
    console.log("newFile", newFile.name, newFile);
    var file = toFile(newFile);
    api({ sendToken: true })
    .delete("/file/delete/" + projectId + "/" + newFile.name)
    .then((response) => {
      setSelectedFile(null);
      setFileFormat(null);
      uploadFiles([file]);
      setFileData(emptyFileData);
    })
    .catch((error) => {
      message.error("File couldn't be updated.");
    });
  }
  
  const uploadFiles = (files) => {
    console.log(files);
    if (files) {
      let formData = new FormData();
      var i;
      for(i=0;i<files.length;i++){
        formData.append(files[i].name, files[i].originFileObj || files[i]);
      }
      formData.append("projectId", projectId);
      for(var p of formData){
        console.log(p)
      }


      api({ sendToken: true })
        .post("/file/add/", formData)
        .then((response) => {
          message.success("Files uploaded successfully.");
          getProjectData();
          setSelectedFile(null);
          setFileFormat(null);
        })
        .catch((error) => {
          message.error("Files couldn't be uploaded.");
          getProjectData();
          setSelectedFile(null);
          setFileFormat(null);
        });

    }
  };

  const uploadProps = {
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        setFilesToUpload(fileList);
      }
    },
  };
  
  const [filesToUpload, setFilesToUpload] = useState([]);

  const [fileFormat, setFileFormat] = useState(null);

  const [selectedFile, setSelectedFile] = useState(-1);

  const [fileData, setFileData] = useState(emptyFileData);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingFile, setLoadingFile] = useState(false);
  const [projectData, setProjectData] = useState({});

  const { projectId } = useParams();
  const history = useHistory();

  const getProjectData = () => {
    setLoadingProject(true);
    api({ sendToken: true })
      .get("/post/get/" + projectId + "/1")
      .then((response) => {
        setProjectData(response.data[0]);
        setLoadingProject(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingProject(false);
        history.goBack();
      });
  }


  useEffect(() => {
    getProjectData();
    // eslint-disable-next-line
  }, [projectId]);

  return (
    loadingProject ? <Frame/> :
    <Frame>
      <Main
        xs={{span: 20, offset: 1}}
        sm={{span: 20, offset: 1}}
        md={{span: 20, offset: 1}}
        lg={{span: 12, offset: 5}}> 
        <H2> Edit Files for "{projectData.title}" </H2>
        <H4> &lt; Return to Project </H4>
        <br />
        {
          // No file chosen
          fileFormat === null
          ? 
          <div>
            
            <H4> Choose a file to edit. &nbsp; { loadingFile ? <Spin indicator={antIcon} /> : ""} </H4>
            <TextArea 
              rows={16} 
              value={fileData.data}
              disabled
              title={"Choose a file to start editing."}
              style={
                {
                  fontFamily: "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace",
                  cursor: "default",
                  overflowWrap: "normal",
                  overflowX: "scroll",
                  whiteSpace: "pre",
                }
              }
            />
          </div>
          :  
          <div>
            <H4> Editing "{fileData.name}" &nbsp; { loadingFile ? <Spin indicator={antIcon} /> : ""} </H4>
            { 
              isPlainText(fileFormat) || fileFormat === null
              ?
              <div>
                <TextArea 
                  rows={16} 
                  value={fileData.data}
                  onChange={e => (setFileData(prev => ({...prev, data: e.target.value})))}
                  disabled = { loadingFile ? "disabled" : ""}
                  style={
                    {
                      fontFamily: "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace",
                      overflowWrap: "normal",
                      overflowX: "scroll",
                      whiteSpace: "pre",
                    }
                  }
                />
                <Row style={{marginTop:"16px"}}>
                  <Tag
                    color="cyan"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => (replaceFile(fileData))}
                  >
                    Save Changes
                  </Tag>
                </Row>
              </div>
              : 
              <Alert
                message="Error"
                description={`You can't edit files with '${fileFormat}' extension.`}
                type="error"
                showIcon
              />
            }
          </div>
        }
        
      </Main>
      <Side
        lg={{span: 7, offset: 0}}
        xl={{span: 7, offset: 0}}> 
        <H3>Upload Files</H3>
        <Row style={{marginTop:"16px"}}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Choose files to upload</Button>
          </Upload>
        </Row>
        <Row style={{marginTop:"16px"}}>
          <Tag
            color="cyan"
            style={{ cursor: "pointer" }}
            onClick={(e) => (uploadFiles(filesToUpload))}
          >
            Upload File
          </Tag>
        </Row>
        <Files>
          <H3>Browse Files</H3>
          <FileContainer style={{}}>
            {projectData.project_files.length > 0 ? (
              projectData.project_files.map((f, i) => {
                return (
                  <FileDiv
                    key={i}
                    onClick={() => displayFile(f.file_name, i)}
                    download={f.file_name}
                    style={{backgroundColor: selectedFile === i ? "#AAD2BA" : "transparent"}}
                  >
                    <FileOutlined style={{ fontSize: "28px" }} /> {f.file_name}
                  </FileDiv>
                );
              })
            ) : (
              <span style={{ color: "grey" }}>No Files To Display</span>
            )}
          </FileContainer>
          {
            selectedFile === -1
            ? ""
            :
            <Col>
              <Row style={{marginTop: "16px"}}>
                <Tag
                  color="green"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => (downloadFile(fileData.name))}
                >
                  Download File
                </Tag>
                <Tag
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => (deleteFile(fileData.name))}
                >
                  Delete File
                </Tag>
              </Row>
            </Col>
          }
        </Files>
      </Side>
    </Frame>
  );
};

export default FileEditor;

