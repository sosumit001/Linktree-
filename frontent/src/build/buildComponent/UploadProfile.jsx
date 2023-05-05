import { gql, useMutation, useQuery} from '@apollo/client'

import {SHA1} from 'crypto-js'

import axios from 'axios'
import { useState } from 'react'
import './UploadProfile.css'


const UploadProfile = ({user_id}) => {
    
    const [profileImg,setProfileImg] = useState(null)
    const [addProfileImg,{loading:loading_upload}] = useMutation(UPLOAD_PROFILE)

    const {data,loading,refetch} = useQuery(GET_USER_DATA,{
        variables:{id:user_id}
    })

    const handleImageSelect = (e) => {
        e.preventDefault()
        setProfileImg(e.target.files[0])
    }
    const handleImageUpload = async () => {
        if(profileImg) {
            const formData = new FormData()
            formData.append('file',profileImg)
            formData.append('upload_preset',import.meta.env.VITE_API_PRESET)
            formData.append('cloud_name',import.meta.env.VITE_CLOUD_NAME)
            
            try{
                const resp = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,formData);  
                console.log(resp.data)
                const res = await addProfileImg({
                    variables:{profileImage:resp.data.url,publicId:resp.data.public_id,user_id}
                })

                await refetch()
            } catch(err) {
                console.log('err: ',err)
            }
        }
    }

    const handleImageDelete = async (e) => {
        const timestamp = new Date().getTime()
        const string = `public_id=${data.getUser.publicId}&timestamp=${timestamp}${import.meta.env.VITE_API_SECRET}`
        const api_signature = SHA1(string)

        const formData = new FormData()
        formData.append('public_id', data.getUser.publicId)
        formData.append("signature",api_signature)
        formData.append('api_key',import.meta.env.VITE_API_KEY)
        formData.append('api_secret', import.meta.env.VITE_API_SECRET)
        formData.append("timestamp",timestamp)
      
        try {
          const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/destroy`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          const res = await addProfileImg({
            variables:{profileImage:"",publicId:"",user_id}
        })
          await refetch()
    } catch (error) {
          console.log(error)
        }
    }


    if(loading) return <div>loading...</div>
    return (
        <div className='profile-image-container'>
            {
                (!data)?
                <div></div>:
                <form style={{display:(data.getUser.profileImage === '')?'flex':'none'}}>
                <input 
                type="file" 
                name="profile" 
                id="input-profile-image"
                accept='.jpeg,.png,.jpg'
                onChange={handleImageSelect}
                 />
                 <button  disabled = {loading_upload?true:false}  type="button" className='profile-image-upload-btn' value="submit" onClick={handleImageUpload} >
                    {loading_upload?'...':'add'}
                 </button>
            </form>
            }
            {/* <form>
                <input 
                type="file" 
                name="profile" 
                id="input-profile-image"
                accept='.jpeg,.png,.jpg'
                onChange={handleImageSelect}
                 />
                 <button  type="button" className='profile-image-upload-btn' value="submit" onClick={handleImageUpload} >save</button>
            </form> */}
            {
              (!data)?
              <div></div>:
              <div  className='profile-uploaded-image-container' style={{display: (data.getUser.profileImage === '')?'none':'flex'}} >
                <div className='profile-uploaded-image-container-img' style={{ backgroundImage: `url(${data.getUser.profileImage})`}}>
                {/* <img height={'95%'} alt='profile-img' src = {data.getUser.profileImage} /> */}
                </div>
                <div onClick={handleImageDelete} className='profile-uploaded-image-container-del'>
                {loading_upload?'...':'remove'}
                </div>
              </div>
            }

        </div>
    )
}


export default UploadProfile

const UPLOAD_PROFILE = gql`
mutation UploadProfile($profileImage: String!, $publicId: String!, $user_id: ID!){
  uploadProfileImg(profileImage: $profileImage, publicId: $publicId, user_id: $user_id) {
    url
  }
}
`

const GET_USER_DATA = gql`
    query Getuser($id:ID!) {
    getUser(id:$id) {
        id
        profileImage
        publicId
        username
    }
  }
`