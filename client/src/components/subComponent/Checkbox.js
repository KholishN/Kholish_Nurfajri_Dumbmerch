/* eslint-disable react-hooks/exhaustive-deps */
import { createElement, useState, useEffect} from 'react'
import {Container,Button,InputGroup,Form} from "react-bootstrap";


function Checkbox(props) {

    const {value, handleChangeCategory, categoryId } = props;

    const [isChecked, setIsChecked] = useState()

    const getIsChecked = () => {
        if(categoryId?.lenght !==0) {
            categoryId?.every((item) => {
                if (item === value) {
                    setIsChecked(true)
                    return true
                }else {
                    return false
                }
            })
        }
    }

    useEffect(() => {
        getIsChecked()
    },[categoryId])
  return (
        <Form.Check id='category'></Form.Check>


//     "input", {
//     type: "checkbox",
//     id:"category" ,
//     className: "cekbox",
//     checked: isChecked,
//     onClick: handleChangeCategory
//   }
  )
}

export default Checkbox