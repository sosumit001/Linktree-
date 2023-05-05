import { useState,useRef } from "react"

import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client"
import LinkList from "./LinkList"
import './LinkField.css'
const FormComponent = ({userId}) => {

    const [isAddLinkOn,setAddLink] = useState({
        on:false,
        display:'none',
        scale:0
    })
    const [linkTitle,setLinkTitle] = useState('')
    const [linkValue,setLinkValue] = useState('')

    const [addLink, {loading}] = useMutation(CREATE_LINK)

    const handleInputLinkAndTitle = async () => {
        try{
            if(linkTitle) {
                await addLink({
                    variables:{inputValue:{linkTitle,linkValue},userId}
                })
                setAddLink({on:false, display: 'none', scale: 1})
                window.open('/edit','_self')
            }
        } catch (err) {
            throw new Error(err)
        }
    }
    const handleLinkChange = (event) => {
        setLinkValue(event.target.value)
    }
    const handleTitleChange = (event) => {
        setLinkTitle(event.target.value)
    }
    
    const removeSpaces = (event) =>  {
        event.target.value = event.target.value.replace(/\s/g, '');
      }
    
    const handleAddLink = () => {
        if(!isAddLinkOn.on) {
            setAddLink({on:true, display:'none', scale: 1})
        } else {
            setAddLink({on:false, display: 'flex', scale: 0})
        }
    }
    return (
    <div className="form-group">
        <div onClick={handleAddLink}>+ add link</div>

        <div style={{display:isAddLinkOn.display}} className="form-graph-inner-container">
        <input  id = 'addlink-input-field' onChange={handleTitleChange} className="form-field" type="text" value={linkTitle} name="title-field" placeholder="title" />
        <input id = 'addlink-input-field' onChange={handleLinkChange} onInput={removeSpaces} value = {linkValue} className="form-field" type="text" name="link-field" placeholder="example.com" />
        <button onClick={handleInputLinkAndTitle} className="save-added-link">{loading?'...':'save'}</button>
        </div>

    </div>
    )

}

const LinkField = ({user_id}) => {
    return (
        <div id ='addlinkfield'>

            <div className='addlinkfield-collections'>
                <FormComponent userId = {user_id} />
            </div>
            <div>
                <LinkList edit_mode={true} user_id={user_id} />
            </div>
           
        </div>
    )
}

const CREATE_LINK = gql`
    mutation CreateLink($inputValue: LinkInput!, $userId: ID!){
    createLink(inputValue: $inputValue, userId: $userId) {
      linkTitle
      linkValue
    }
  }`

export default LinkField


