import { Row, Col, Avatar, Tag } from "antd";
import { useHistory } from "react-router-dom";


const SearchableTag = (tagObj, index) => {

  const history = useHistory()
  
  return (
    <Tag 
      key={index} 
      style={{
        color: "grey", 
        cursor: 'pointer'
      }}
      onClick={e => history.push('/search?query=&tags=' + tagObj.tag)}
    >
      {" "}{tagObj.tag}{" "}
    </Tag>
  )
}

export default SearchableTag;
