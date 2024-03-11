import Separator from "../common/separator/Separator";
import Todo from "../todo/Todo";
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
      <Todo />
    </>
  );
};

export default Dashboard;
