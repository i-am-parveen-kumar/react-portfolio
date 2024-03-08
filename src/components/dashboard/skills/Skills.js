import "./Skills.scss";
import FrontendLogo from "../../../icons/frontend.png";
import BackendLogo from "../../../icons/backend.png";

const Skills = () => {
  const feSkills = {
    logo: FrontendLogo,
    heading: "Frontend Developer",
    subHeading:
      "I like to code things from scratch, and enjoy bringing ideas to life in the browser.",
    otherDetails: [
      {
        heading: "Languages I speak:",
        data: "HTML, Pug, Slim, CSS, Sass, Git",
      },
      {
        heading: "Dev Tools:",
        data: ["JavaScript", "React", "SCSS", "VSCode", "Git", "Netlify"],
      },
    ],
  };

  const beSkills = {
    logo: BackendLogo,
    heading: "Backend Developer",
    subHeading:
      "I like to code things from scratch, and enjoy bringing microservices to life",
    otherDetails: [
      {
        heading: "Languages I speak:",
        data: "JAVA, Spring Boot, Microservices, Database, Git",
      },
      {
        heading: "Dev Tools:",
        data: ["Intellij", "Git", "Docker", "Netlify"],
      },
    ],
  };
  return (
    <div className="skills-container">
      <div className="skills-item">
        <SkillItem data={feSkills} />
      </div>
      <div className="skill-separator"></div>
      <div className="skills-item">
        <SkillItem data={beSkills} />
      </div>
    </div>
  );
};

export default Skills;

const OtherDetails = ({ otherDetail }) => {
  const { heading, data } = otherDetail || {};
  return (
    <div className="other-details-container">
      <div className="other-detail-heading">{heading}</div>
      {typeof data === "string" ? (
        <div>{data}</div>
      ) : (
        <>
          {data.map((_) => (
            <div className="other-detail-array-item">{_}</div>
          ))}
        </>
      )}
    </div>
  );
};

const SkillItem = ({ data }) => {
  const { logo, heading, subHeading, otherDetails } = data || {};
  return (
    <div className="skill-item-container">
      <img className="skill-logo-img" src={logo} />
      <h2>{heading}</h2>
      <div className="skill-item-subheading">{subHeading}</div>
      {otherDetails.map((otherDetail) => (
        <OtherDetails otherDetail={otherDetail} />
      ))}
    </div>
  );
};
