import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './SlideEffect.css'


const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '440px',
  margin:'5px auto'
}
const slideImages = [
  {
    url:'/susii',
    caption: 'Slide 1'
  },
  {
    url:'about',
    caption: 'Slide 2'
  },
];

const SlideEffect = () => {
    return (
      <div  className="slide-container">
        <Slide >
         {slideImages.map((slideImage, index)=> (
            <div  key={index}>
             
              <div className='slide-cover' style={{ ...divStyle  }}>
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                <div>
                    <iframe width={'100%'} height={'100%'} src={slideImage.url} frameborder="0"></iframe>
                </div> 
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default SlideEffect