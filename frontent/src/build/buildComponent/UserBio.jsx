import { useState } from 'react';
import { useMutation,useQuery,gql } from '@apollo/client';

import './UserBio.css';


const UserBio = ({user_id,EditActive}) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [addBio, {loading:textLoading}] = useMutation(ADD_BIO);

  const {data,loading} = useQuery(GET_USER_DATA,{
    variables:{id:user_id}
})
  const handleAddLink = () => {
    setOpen(!open);
  };

  const handleTextChange = async (e) => {
    try {
      const inputTxt = e.target.value;
      setCount(inputTxt.length);

      // Call the addBio mutation with the input text and the user ID
      await addBio({
        variables: {
          inputTxt,
          userId: user_id // Replace with the actual user ID
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openStyle = {
    borderBottomLeftRadius: open ? '0px' : '20px',
    borderBottomRightRadius: open ? '0px' : '20px'
  };
  const Bio = (EditActive)? 
    (<div id="addBio">
    <div style={openStyle} onClick={handleAddLink} className="add-bio-btn">
      + add bio
    </div>
    <div style={{ display: open ? 'flex' : 'none' }} className="bio-container">
      <input
        type="text"
        name="user-bio"
        id="userbio"
        placeholder= {loading?'...':data?data.getUser.bio:'fetching...'}
        maxLength={200}
        onChange={handleTextChange}
      />
      <div className="count-bio-len">
        {count} / 200
      </div>
      {/* <div style={{display:(count > 0)?'flex':'none'}} className="bio-text-loading">
        {
          textLoading?'...':'saved!'
        }
      </div> */}
      <a href='/edit' className='bio-text-loading'>
        {textLoading?'...':'save'}
      </a>
    </div>
  </div>)
   : (
    <div>
      {/* {loading || !data?.getUser?.bio ? "" : data.getUser.bio} */}
    </div>
   )

  return Bio
};


const ADD_BIO = gql`mutation($inputTxt: String!, $userId: ID!){
    addBio(inputTxt: $inputTxt, userId: $userId)
  }`

const GET_USER_DATA = gql`
    query Getuser($id:ID!) {
    getUser(id:$id) {
      bio
    }
  }
`

export default UserBio