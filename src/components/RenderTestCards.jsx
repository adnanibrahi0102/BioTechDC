import React from 'react';
import TestCard from './TestCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const RenderTestCards = () => {
  const testData = [
    {
      name: 'HbA1c; GLYCOSYLATED HEMOGLOBIN',
      preparation: 'No special preparation required',
      schedule: 'Daily',
      parameters: 2,
      price: 440,
    },
    {
      name: 'Lipid Profile',
      preparation: 'Fasting for 9-12 hours required',
      schedule: 'Daily',
      parameters: 5,
      price: 600,
    },
    {
      name: 'Complete Blood Count (CBC)',
      preparation: 'No special preparation required',
      schedule: 'Daily',
      parameters: 19,
      price: 350,
    },
    {
      name: 'Liver Function Test (LFT)',
      preparation: 'No special preparation required',
      schedule: 'Daily',
      parameters: 11,
      price: 500,
    },
    {
      name: 'Kidney Function Test (KFT)',
      preparation: 'No special preparation required',
      schedule: 'Daily',
      parameters: 7,
      price: 400,
    },
  ];

  return (
    <>
      <h1 className='text-center text-3xl mt-3 font-semibold'>Popular Tests / Packages</h1>
      <div className="flex flex-wrap justify-center bg-white m-5 rounded-xl p-2">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000 }}
          loop
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {testData.map((test, index) => (
            <SwiperSlide key={index}>
              <TestCard test={test} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default RenderTestCards;
