import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../addgroup.css'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
export default function AddGroup() {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://20.235.152.209/api/addgroups/');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://20.235.152.209/api/addgroups/', { group_name: groupName });
      fetchGroups();
      setGroupName('');
      toast.success("Group Added successfully")
    } catch (error) {
      console.error('Error adding group:', error);
      toast.error("Error while adding group")
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://20.235.152.209/api/addgroups/${id}`);
      fetchGroups();
      toast.success("Group Deleted Successfully")
    } catch (error) {
      console.error('Error deleting group:', error);
      toast.error("Error deleting group")
    }
  };

  return (
    <>
    <Navbar/>
    <ToastContainer />
    <div className="addGroupContainer">
      <form onSubmit={handleSubmit}>
      <label style={{ color: 'black' }}>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="inputField"
          />
        </label>
    
        <button type="submit" className="submitButton float-end mb-3">Add Group</button>


      </form>
      <table className="groupTable">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Emails</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.group_name}</td>
              <td>{group.email_count}</td>
              <td>
                <button onClick={() => handleDelete(group.id)} className="deleteButton">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
