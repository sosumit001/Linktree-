import {useQuery,gql} from '@apollo/client'
import { useState } from 'react'


import './Preview.css'
import UserBio from './buildComponent/UserBio'

import LinkList from './buildComponent/LinkList'

const Preview = ({user_id}) => {

  const [currentBannerClass,setCurrentBannerClass] = useState('bg-img-2')
  
    const {loading, error, data} = useQuery(GET_USER_DATA,{
        variables:{id:user_id}
    })


    

    function getDaysFromNow(inputDate) {
        const today = new Date();
        const input = new Date(inputDate);
        const diffTime = input.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
        if (diffDays === 0) {
          return "Joined Today";
        } else if (diffDays === 1) {
          return "Joined Yesterday";
        } else if (diffDays < 31) {
          return "Joined "+Math.abs(diffDays) + "days ago";
        } else if (diffDays < 365) {
          const diffMonths = Math.floor(diffDays / 30);
          return "Joined" + diffMonths + " month" + (diffMonths > 1 ? "s ago" : "ago");
        } else {
          const diffYears = Math.floor(diffDays / 365);
          return "Joined " +diffYears + " year" + (diffYears > 1 ? "s" : "");
        }
      }
    
    

    if(loading) return <div>Loading...</div>
    if(error) return <div>
      click
    </div>
    return (
        <div  id="previewTemplate">
            <span></span>
            <div className={"preview-template-banner " + currentBannerClass}>
                <div className='preview-template-banner-username'>
                    {loading?"loading...":data.getUser.username}
                </div>

                <div className={"preview-template-banner-profile"} style={{backgroundImage:`url(${data.getUser.profileImage})`}} >
                    {(data.getUser.profileImage != '')?'':data.getUser.fullname[0].toUpperCase()}
                </div>

                <div className={"preview-template-banner-joinedOn"}>
                    {getDaysFromNow(data.getUser.createdAt.substring(0,10))}
                </div>
                <h4 style={ { fontSize:'1.2rem'}} className='preview-template-banner-fullname' >{data.getUser.fullname}</h4>
            </div>
            <div className="preview-links">
              <div className="preview-template-userBio">
              {(data.getUser.bio != '')?data.getUser.bio:''}
              {/* <UserBio ReturnText={true} /> */}
              </div>
              <LinkList user_id={user_id} />
            </div>
            <div className="right-preview-wall"></div>
        </div>
    )
}

const GET_USER_DATA = gql`
    query Getuser($id:ID!) {
    getUser(id:$id) {
      username
      createdAt
      fullname
      profileImage
      bio
    }
  }
`

export default Preview;