import Separator from "../common/separator/Separator";
import TODO from "../to-do/TODO";
import "./Dashboard.scss";
import Introduction from "./Introduction/Introduction";
import Skills from "./skills/Skills";
const Dashboard = () => {
  return (
    <>
      <Introduction />
      <Separator />
      <Skills />
      <Separator />
      <TODO />
    </>
  );
};

export default Dashboard;
