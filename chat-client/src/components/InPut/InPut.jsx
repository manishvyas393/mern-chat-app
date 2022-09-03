import React from 'react'
import {Input } from '@chakra-ui/react'
const InPut = ({type,onChange,placeholder,value,name}) => {
      return (
            <Input type={type} py={8} border={0} pl={0} name={name} onChange={onChange} placeholder={placeholder} value={value} rounded="none" outline="0" borderBottom="1px" borderBottomColor={"grey"} _focus={{boxShadow:"none"}} />
      )
}

export default InPut