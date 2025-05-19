import { useState } from "react";
import { courses, categories } from "./data";
import styles from "./CourseBrochures.module.css";

const CourseBrochures = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const filteredCourses = courses.filter(
    (course) => course.category === selectedCategory
  );

  return (
    <section className={styles.courseBrochures}>
      <div className={styles.container}>
      



        <h2 className={styles.sectionTitle}>Download Course Brochures</h2>
        <p className={styles.para}>Explore our comprehensive course offerings and download detailed program brochures to learn more.</p>
        <div className={styles.categoryDropdown}>
          <div 
            className={styles.dropdownHeader}
            onClick={toggleDropdown}
          >
            <span>Select Course</span>
            <span className={styles.dropdownArrow}>
              {isDropdownOpen ? '▲' : '▼'}
            </span>
          </div>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {categories.map((category) => (
                <div
                  key={category}
                  className={`${styles.dropdownItem} ${
                    selectedCategory === category ? styles.active : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.courseGrid}>
          {filteredCourses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.cardImage}>
                <img src={course.image} alt={course.title} />
                {/* <div className={styles.certificationBadges}>
                  {course.certificationBadges.map((badge, index) => (
                    <img key={index} src={badge} alt="Certification badge" className={styles.badge} />
                  ))}
                </div> */}
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                
                <div className={styles.courseDetails}>
                  <span className={styles.duration}>{course.duration}</span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.projects}>{course.projects} Projects</span>
                </div>
                
                <div className={styles.certification}>
                  {course.certification}
                </div>
                
                {course.for && (
                  <div className={styles.for}>
                    {course.for}
                  </div>
                )}
              </div>
              
              <div className={styles.cardFooter}>
                <a href={course.brochureLink} className={styles.brochureButton}>
                  Brochure
                </a>
                <a href={course.detailsLink} className={styles.detailsButton}>
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseBrochures;