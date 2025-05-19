import React, { useState } from "react";
import styles from "./SuccessStories.module.css";
import Image from "next/image";

const testimonials = [
  {
    name: "Shravanthi A",
    role: "Data Scientist",
    review: "Learnhow has helped me a lot to learn data science applications in the e-commerce industry. The live class concept was really helpful in receiving proper DS training. Thanks to all my mentors, not the placement team.",
    domain: "Mechanical Domain",
    company: "Today Hike",
    salaryHike: "161.52",
    profile: "/Testimoals/testin_1.webp",
    comIcons: "/comIcons/ford.webp",
    rating: 5,
    video: true,
    videoUrl: "https://www.youtube.com/embed/-cYskbVjRfo?start=7" // Converted URL

  },
  {
    name: "Personal Mishra",
    role: "Lead Data Scientist",
    review: "The course structure is excellent with emphasis on concept building and tools & software at the same time. The support team is excellent and supports the skills of the agile to respond to doubts.",
    domain: "Telecom Domain",
    company: "Today Hike",
    salaryHike: "848.32",
    profile: "/Testimoals/testin_1.webp",
    comIcons: "/comIcons/hcl.webp",
    rating: 5,
    video: true,
    videoUrl: "https://www.youtube.com/embed/-cYskbVjRfo?start=7" // Converted URL

  },
  {
    name: "Mobile Israr",
    role: "Data Scientist",
    review: "Thanks to the Learning data science course & excellent guidance. I was able to see the TCS interview and secure a job with a 20% pay raise. The real-world time projects helped me develop my concepts as a data scientist.",
    domain: "Sales",
    company: "Today Hike",
    salaryHike: "397.61",
    profile: "/Testimoals/testin_1.webp",
    comIcons: "/comIcons/teleper.webp",
    rating: 5,
    video: true,
    videoUrl: "https://www.youtube.com/embed/-cYskbVjRfo?start=7" // Converted URL

  }
];

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
    <mask id="mask0_63_1373" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
      <rect x="0.76123" y="0.756592" width="20.177" height="20.177" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_63_1373)">
      <path d="M9.16805 12.5265L14.2123 9.16365L9.16805 5.80082V12.5265ZM2.44238 19.2521V4.1194C2.44238 3.65701 2.60702 3.26118 2.9363 2.9319C3.26558 2.60263 3.66141 2.43799 4.1238 2.43799H17.5751C18.0375 2.43799 18.4333 2.60263 18.7626 2.9319C19.0919 3.26118 19.2565 3.65701 19.2565 4.1194V14.2079C19.2565 14.6703 19.0919 15.0661 18.7626 15.3954C18.4333 15.7247 18.0375 15.8893 17.5751 15.8893H5.80521L2.44238 19.2521ZM5.09061 14.2079H17.5751V4.1194H4.1238V15.1537L5.09061 14.2079Z" fill="#F91500"/>
    </g>
  </svg>
);

const VideoPopup = ({ videoUrl, onClose }) => {
  return (
    <div className={styles.videoPopupOverlay} onClick={onClose}>
      <div className={styles.videoPopupContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.videoWrapper}>
          <iframe
            src={videoUrl}
            title="Testimonial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const SuccessStories = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const openVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  const closeVideo = () => {
    setCurrentVideo(null);
  };

  return (
    <section className={styles.successSection}>
      <div className={styles.header}>
        <h2>Student Success Stories</h2>
        <p>See how Learning has transformed careers and created life-changing opportunities for our students</p>
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Successful Placements</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>150%</span>
            <span className={styles.statLabel}>Average Salary Hike</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Hiring Partners</span>
          </div>
        </div>
      </div>

      <div className={styles.testimonialsContainer}>
        <h2 className={styles.testimonialsTitle}>Student Testimonial</h2>
        <div className={styles.testimonials}>
          {testimonials.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.profile}>
                <Image className={styles.avatarPlaceholder} src={item.profile} width={80} height={80}/>
                <div className={styles.profileInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.role}</p>
                  <div className={styles.rating}>{"⭐".repeat(item.rating)}</div>
                </div>
                {item.video && (
                  <button 
                    className={styles.videoTag} 
                    onClick={() => openVideo(item.videoUrl)}
                  >
                    <VideoIcon /> Watch Video
                  </button>
                )}
              </div>
              <p className={styles.review}>"{item.review}"</p>
              <div className={styles.cardFooter}>
                <div className={styles.footerInner}>{item.domain} →<p> <strong>{item.role}</strong> @</p> 
                <Image src={item.comIcons} width={50} height={20} alt="logo" />
                
                
                </div>
                <hr className={styles.hr}/>
                <span className={styles.salaryHike}>{item.salaryHike} Salary Hike</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentVideo && <VideoPopup videoUrl={currentVideo} onClose={closeVideo} />}
    </section>
  );
};

export default SuccessStories;