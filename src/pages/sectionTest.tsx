import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { ContentWrapper } from "./contentWrapper";
import PeopleSection from "./people";
import AboutComponent from "./about";

interface SectionProps {
  id: string;
  content: string;
  isActive: boolean;
  color: string;
  zIndex: number;
  videoSrc?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  content,
  isActive,
  color,
  zIndex,
  videoSrc,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isActive ? "active" : "inactive");
  }, [isActive, controls]);

  const sectionVariants = {
    inactive: {
      y: -40,
      opacity: 0.7,
      scale: 0.95,
      zIndex: zIndex,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    active: {
      y: 0,
      opacity: 1,
      scale: 1,
      zIndex: zIndex,
      transition: {
        y: {
          duration: 0.2,
          type: "spring",
          from: "40vh",
          stiffness: 70,
          damping: 15,
        },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      layoutId={id}
      variants={sectionVariants}
      initial="initial"
      animate={controls}
      exit="inactive"
      transition={{ duration: 0.5, type: "easeOut" }}
      className={`section p-10 border-2 border-gray-400 rounded-tl-3xl rounded-tr-3xl shadow-lg ${color} `}
      style={{
        position: "absolute",
        width: "75%",
        top: 100,
        right: 0,
        bottom: 0,
        boxSizing: "border-box",
      }}
    >
      {id === "People" ? (
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <PeopleSection isActive={isActive} />
        </div>
      ) : videoSrc ? (
        <div className="relative w-full h-full">
          <video
            className="video w-full rounded-lg overflow-hidden"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            style={{
              position: "absolute",
              bottom: "12vh",
              left: "0",
              padding: "1rem",
            }}
          >
            <h2 className="text-4xl font-bold text-white p-4 bg-black bg-opacity-50 rounded-lg">
              We enable Collaborators
              <br /> to create delightful technical solutions
            </h2>
          </div>
        </div>
      ) : (
        <ContentWrapper isActive={isActive}>
          <h2 className="text-2xl font-bold mb-4">{content}</h2>
          <p className="text-gray-700">
            Placeholder content for the {content} section.
          </p>
        </ContentWrapper>
      )}
    </motion.div>
  );
};

export default Section;
