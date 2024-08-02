import React from 'react';
import { HeroParallax } from '../components/ui/hero-parallax';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Slider from '../components/Slider'
import RenderTestCards from '../components/RenderTestCards';
import { FaVial, FaFlask, FaHospitalAlt, FaUsers, FaMicroscope, FaTruck } from 'react-icons/fa';

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

  const { ref: refSamples, inView: inViewSamples } = useInView({ triggerOnce: true });
  const { ref: refLabs, inView: inViewLabs } = useInView({ triggerOnce: true });
  const { ref: refCentres, inView: inViewCentres } = useInView({ triggerOnce: true });
  const { ref: refCustomers, inView: inViewCustomers } = useInView({ triggerOnce: true });
  const { ref: refTests, inView: inViewTests } = useInView({ triggerOnce: true });
  const { ref: refPoints, inView: inViewPoints } = useInView({ triggerOnce: true });

  return (
    <div className="max-w-full mx-auto px-4 py-8 bg-yellow-100">
        <Slider/>
      <HeroParallax products={products} />
      <RenderTestCards/>
     
       
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black mb-4 mt-2">About BioTech Diagnostic Center</h1>
        <p className="text-lg text-black mb-8">
          Welcome to BioTech Diagnostic Center, where we are dedicated to delivering accurate and reliable diagnostic services. Our state-of-the-art facilities and experienced medical professionals ensure high-quality care for all patients.
        </p>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-black text-center mb-4">Why BioTech DC?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`bg-yellow-200 shadow-md rounded-lg p-6 ${inViewSamples ? 'animate-countup' : ''}`} ref={refSamples}>
          <FaVial className="text-4xl text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Samples Collected</h3>
          <p className="text-3xl text-blue-500 font-bold">
            {inViewSamples && <CountUp end={50000000} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-yellow-200 shadow-md rounded-lg p-6 ${inViewLabs ? 'animate-countup' : ''}`} ref={refLabs}>
          <FaHospitalAlt className="text-4xl text-green-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Labs</h3>
          <p className="text-3xl text-green-500 font-bold">
            {inViewLabs && <CountUp end={280} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-yellow-200 shadow-md rounded-lg p-6 ${inViewCentres ? 'animate-countup' : ''}`} ref={refCentres}>
          <FaUsers className="text-4xl text-yellow-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Patient Service Centres</h3>
          <p className="text-3xl text-yellow-500 font-bold">
            {inViewCentres && <CountUp end={5500} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-yellow-200 shadow-md rounded-lg p-6 ${inViewCustomers ? 'animate-countup' : ''}`} ref={refCustomers}>
          <FaUsers className="text-4xl text-red-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Total No. of Customers</h3>
          <p className="text-3xl text-red-500 font-bold">
            {inViewCustomers && <CountUp end={27000000} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-yellow-200 shadow-md rounded-lg p-6 ${inViewTests ? 'animate-countup' : ''}`} ref={refTests}>
          <FaMicroscope className="text-4xl text-purple-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Total No. of Tests and Panels</h3>
          <p className="text-3xl text-purple-500 font-bold">
            {inViewTests && <CountUp end={5000} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-yellow-200 shadow-md rounded-lg p-6 ${inViewPoints ? 'animate-countup' : ''}`} ref={refPoints}>
          <FaTruck className="text-4xl text-teal-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Pick-up Points</h3>
          <p className="text-3xl text-teal-500 font-bold">
            {inViewPoints && <CountUp end={11000} duration={2.5} />}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
