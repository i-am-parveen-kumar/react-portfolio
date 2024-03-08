import "./Introduction.scss";
const Introduction = () => {
  return (
    <div className="introduction-container">
      <img
        className="dash-intro-img"
        src="https://static.wixstatic.com/media/fb5049_d42b3fb1cdc74bda86d3991874142ad2~mv2.png/v1/fill/w_581,h_537,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Frame%2011852.png"
      />
      <div>
        <h1 className="hello-text">Hello!</h1>
        <h1 className="intro-text">
          I'm Parveen, a Backend developer based in Banglore.
        </h1>
      </div>
    </div>
  );
};

export default Introduction;
