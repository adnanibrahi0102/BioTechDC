import React from 'react';
import { HeroParallax } from '../components/ui/hero-parallax';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  const products = [
    {
      title: "Get Report Online",
      link: "",
      thumbnail: "https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Comprehensive Blood Test",
      link: "",
      thumbnail: "https://images.pexels.com/photos/4230620/pexels-photo-4230620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Lipid Profile",
      link: "",
      thumbnail: "https://www.manipaltrutest.com/_next/image?url=https%3A%2F%2Fmanipaltrutest.s3.ap-south-1.amazonaws.com%2Fblog-images%2Fblog-images-1691495052413-599623-Lipid%2520Profile%2520Test.jpeg&w=1920&q=100",
    },
    {
      title: "Thyroid Function Test",
      link: "",
      thumbnail: "https://health-e.in/wp-content/uploads/2024/02/hypothyroidism-result-with-blood-sample-tube-1536x1024.webp",
    },
    {
      title: "COVID-19 Testing",
      link: "",
      thumbnail: "https://www.fau.edu/newsdesk/images/news/covid-test-ai-newsdesk.jpg",
    },
    {
      title: "Diabetes Panel",
      link: "",
      thumbnail: "https://labs.360healthservices.com/wp-content/uploads/2020/12/600x282xDiabetes-Blood-Tests-1280x720-1.jpg.pagespeed.ic.SUM4-zpGOY.webp",
    },
    {
      title: "Allergy Testing",
      link: "",
      thumbnail: "https://www.netmeds.com/images/cms/wysiwyg/blog/2021/05/1621845082_Allergy_big_1.jpg",
    },
    {
      title: "Liver Function Test",
      link: "",
      thumbnail: "https://cura4u.com/Common/DisplayFileFormFileName?fileName=Liver_Function_Test_LFT_How_to_correlate_different_readings__BlogImage_0dd64c42-d96b-48c1-8fc6-e716ae355a28.jpeg",
    },
  ];

  const [refPatients, inViewPatients] = useInView({ triggerOnce: true });
  const [refTests, inViewTests] = useInView({ triggerOnce: true });
  const [refReports, inViewReports] = useInView({ triggerOnce: true });

  return (
    <div className="max-w-full mx-auto px-4 py-8 bg-indigo-950">
      <HeroParallax products={products} />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black mb-4 mt-2">About BioTech Diagnostic Center</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to BioTech Diagnostic Center, where we are dedicated to delivering accurate and reliable diagnostic services. Our state-of-the-art facilities and experienced medical professionals ensure high-quality care for all patients.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`bg-white shadow-md rounded-lg p-6 ${inViewPatients ? 'animate-countup' : ''}`} ref={refPatients}>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Patients</h3>
            <p className="text-3xl text-blue-500 font-bold">
              {inViewPatients && <CountUp end={150} duration={2.5} />}
            </p>
          </div>
          <div className={`bg-white shadow-md rounded-lg p-6 ${inViewTests ? 'animate-countup' : ''}`} ref={refTests}>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Tests</h3>
            <p className="text-3xl text-green-500 font-bold">
              {inViewTests && <CountUp end={300} duration={2.5} />}
            </p>
          </div>
          <div className={`bg-white shadow-md rounded-lg p-6 ${inViewReports ? 'animate-countup' : ''}`} ref={refReports}>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Reports Generated</h3>
            <p className="text-3xl text-yellow-500 font-bold">
              {inViewReports && <CountUp end={120} duration={2.5} />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
