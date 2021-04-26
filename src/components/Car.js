


import Carousel from 'react-bootstrap/Carousel';
import Figure from 'react-bootstrap/Figure';
import bike from './images/bike.jpeg';

const Car = () => {
   
    return(
      <>
      <div className='car'>
      <Carousel>
  <Carousel.Item interval={4000}>
  <Figure align='center'>
        <Figure.Image
            width={'60%'}
            height={'60%'}
            alt="171x180"
            src={bike}
        />
       
   </Figure>
    {/* <img
      className="d-block w-100"
      src={store}
      alt="First slide"
    /> */}
   
  </Carousel.Item>
  <Carousel.Item interval={500}>
  <Figure align='center'>
        <Figure.Image
            width={'60%'}
            height={'60%'}
            // alt="171x180"
            src={bike}
        />
       
   </Figure>
    
  </Carousel.Item>
  
</Carousel>
</div>
       </>
    )
   
}

export default Car;