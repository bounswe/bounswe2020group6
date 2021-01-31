import React from 'react'
import { } from "antd";
import { 
    AppstoreOutlined, 
    AppstoreAddOutlined,
    ProjectOutlined,
    BorderOutlined,
    CalendarOutlined,
    IdcardOutlined,
    FileDoneOutlined
} from "@ant-design/icons";
import { 
    Layout,
    ButtonText
} from "./style";



const FilterButton = ({ type, children, selected, onClick }) => {
    // determines the logo of the button according to its type
    let buttonLogo = () => {
        switch(type) {
            case "all":
                return <AppstoreOutlined style={{fontSize: 32}}></AppstoreOutlined>
            case "paper":
                return <FileDoneOutlined style={{fontSize: 32}}></FileDoneOutlined>
            case "project":
                return <ProjectOutlined style={{fontSize: 32}}></ProjectOutlined>
            case "event":
                return <CalendarOutlined style={{fontSize: 32}}></CalendarOutlined>
            case "people":
                return <IdcardOutlined style={{fontSize: 32}}></IdcardOutlined>
            case "advanced":
                return <AppstoreAddOutlined style={{fontSize: 32}}></AppstoreAddOutlined>
            default:
                return <BorderOutlined style={{fontSize: 32}}></BorderOutlined>
        }
    }
    
    return (
        <Layout style={selected ? {} : {backgroundColor: "white"}} onClick={() => onClick(type)}>
            {buttonLogo()}

            <ButtonText>
                {children}
            </ButtonText>
        </Layout>
    )
}

export default FilterButton
