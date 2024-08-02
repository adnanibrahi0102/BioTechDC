import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import { useNavigate } from "react-router-dom";

const slider = () => {
  const navigate = useNavigate();
  const images = [
    "https://images.pexels.com/photos/8770732/pexels-photo-8770732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/8327034/pexels-photo-8327034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4031504/pexels-photo-4031504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5922043/pexels-photo-5922043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/8539887/pexels-photo-8539887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Welcome to Biotech DC Lab
          <br />
          Your Health, Our Priority
        </motion.p>
        <motion.p className="font-medium text-lg md:text-2xl text-center text-neutral-50 py-2">
          Book your tests online and get accurate results promptly. <br />
          Please visit our lab for sample collection to ensure precise analysis.
        </motion.p>
        <button 
        onClick={() => navigate("/book-test")}
        className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-black mx-auto text-center font-medium rounded-full relative mt-4">
          <span>Book Now →</span>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
};

export default slider;
