import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userlist from "./component/Userlist";
import CreateUser from "./component/CreateUser";
import EditUser from "./component/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Userlist />} />
        <Route path="/creatuser" element={<CreateUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
