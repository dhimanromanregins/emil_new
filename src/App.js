import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendEmail from './components/SendEmail';
import Navbar from './components/Navbar';
import SendBulkEmail from './components/SendBulkEmail';
import SendGroupEmail from './components/SendGroupEmail';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Products from './components/Products';
import Emails from './components/Emails';
import AddGroup from './components/AddGroup';
import Profile from './components/Profile';


function App() {
  const isAuthenticated = !!localStorage.getItem('userId');
  console.log(isAuthenticated, )
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register/" element={<Register />} />
        <Route path="sidebar/" element={<Sidebar />} />
        <Route path="products/" element={<Products />} />
        <Route path="addgroups/" element={<AddGroup />} />
        <Route path="profiles/" element={<Profile />} />
        <Route path="emails/" element={<Emails />} />
        <Route path="dashboard/" element={<SendEmail />} />
        <Route path="/bulk-email-sender" element={<SendBulkEmail />} />
        <Route path="/group-email" element={<SendGroupEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
