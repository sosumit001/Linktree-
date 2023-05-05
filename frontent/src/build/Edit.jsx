import './Edit.css'
import { useContext,useRef,useState } from 'react';
import { AuthContext } from '../context/auth';
import LinkField from './buildComponent/LinkField';
import Preview from './Preview';
import UploadProfile from './buildComponent/UploadProfile';
import UserBio from './buildComponent/UserBio';

const Edit = () => {
    const {user} = useContext(AuthContext)
    const URLref = useRef()
    const [isPreviewOn, setPreview] = useState({
        on: false
      })
    
      const [isCopyURLOn, setCopyURL] = useState({
        on: false
      })

 
    const handlePreview = () => {
        (!isPreviewOn)? setPreview(true) : setPreview(false)
    }

    const handleCopyURL = () => {
        (!isCopyURLOn)? setCopyURL(true) : setCopyURL(false)
    }
    const copyUrl = () => {
        var copyText = URLref.current;

       // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard.writeText(copyText.value);
        alert("Linktree URL is: " + copyText.value);
    }
    
    window.onresize = () => {
        if(window.innerWidth > 860) {
            if(!isPreviewOn) {
                setPreview(true)
            }
        } else {
            setPreview(false)
        }
    }

    return ( 
        <div id="Editor">
            {/*1.  features */}
            <div className="editor-features">
                <div className="editor-share-container">
                    <div onClick={handleCopyURL} className='editor-share-btn'>share</div>
                </div>
                <div className="editor-features-link-field">
                    <UploadProfile profile_img={user.profileImage} user_id = {user.user_id} />
                    <UserBio EditActive={true} user_id = {user.user_id} />
                    <LinkField user_id={user.user_id} />
                </div>
            </div>

            {/*2. Preview  */}
            <div style={{top:isPreviewOn?'0%':'100%'}} className="editor-preview">
                <div className='preview-container'>
                    <Preview  user_id={user.user_id} />
                    {/* <iframe width={'100%'} height={'100%'} src="/preview" frameborder="0"></iframe> */}
                </div>
            </div>

            {/*3. Preview Button */}
            <div style={{borderRadius:isPreviewOn?"20px":"10px"}} onClick={handlePreview} className="editor-preview-btn">
                {
                    isPreviewOn?'Edit':'Preview'
                }
            </div>

            {/*4. Share Website */}
            <div style={{top:!isCopyURLOn?'30%':'140%'}} className="preview-weburl-container">
              <h4>Copy! Linktree URL</h4>
              <input ref={URLref} style={{height:'40px', border:'1px solid', marginTop:'10px',marginBottom:'-10px'}} defaultValue={`https://linktree.art/${user.username}`} type="text" id="myInput" />
              <div className='open-weburl-container' >
                 <button className='open-weburl-btn'  onClick={copyUrl}>. copy .</button>
                 <div className='open-weburl-btn' ><a style={{color:'black'}} target='_blank' href={`https://linktree.art/${user.username}`}>↗</a></div>
              </div>
              <div  onClick={handleCopyURL} className="cross-weburl">X</div>
            </div>
        </div>
    )
}

export default Edit