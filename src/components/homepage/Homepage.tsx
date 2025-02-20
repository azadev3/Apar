import '../../styles/homepage/homepage.scss';
import TopContent from './uitilshomepage/TopContent';
import FeelTheDifference from './uitilshomepage/FeelTheDifference';
import HowToRide from './uitilshomepage/HowToRide';
import WhyRide from './uitilshomepage/WhyRide';
import Blog from './uitilshomepage/Blog';
import Map from './uitilshomepage/Map';
import OurPartners from './uitilshomepage/OurPartners';
import DownloadApp from './uitilshomepage/DownloadApp';
import { useNavigate, useParams } from 'react-router-dom';
import { EnumLangType } from '../pages/WhyRidePage';
import { useLang } from '../../context/SelectedLanguage';
import { paths } from '../../App';
import React from 'react';

const Homepage = () => {

  const { lang } = useParams<{ lang: EnumLangType }>();
  const { selectedLanguage } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (selectedLanguage && selectedLanguage !== lang) {
      const newPath = paths.homepage[selectedLanguage as keyof typeof paths.homepage];
      if (newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [navigate, lang, selectedLanguage]);

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