import '../../styles/homepage/homepage.scss';
import TopContent from './uitilshomepage/TopContent';
import FeelTheDifference from './uitilshomepage/FeelTheDifference';
import HowToRide from './uitilshomepage/HowToRide';
import WhyRide from './uitilshomepage/WhyRide';
import Blog from './uitilshomepage/Blog';
import Map from './uitilshomepage/Map';
import OurPartners from './uitilshomepage/OurPartners';
import DownloadApp from './uitilshomepage/DownloadApp';

const Homepage = () => {
  return (
    <div className='homepage'>
      <TopContent />
      <FeelTheDifference />
      <HowToRide />
      <WhyRide />
      <Blog />
      <Map />
      <OurPartners />
      <DownloadApp />
    </div>
  )
}

export default Homepage