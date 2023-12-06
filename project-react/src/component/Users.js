// Users.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Users.css';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:1010/list');
                const data = await response.json();

                if (data.status === 'ok') {
                    setUsers(data.users);
                } else {
                    console.error('Error fetching user data:', data.message);
                }
            } catch (error) {
                console.error('Error during API request:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:1010/delete/${userId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.status === 'ok') {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                console.error('Error deleting user:', data.message);
            }
        } catch (error) {
            console.error('Error during delete request:', error);
        }
    };

    return (
        <div className='Container-Users'>
            <div className='userslist'>
                <h2>User List</h2>
                <ul>
                    {users.map(user => (
                        <li className='data' key={user.id}>
                            <div className='username-data'>
                                <strong>Username : &nbsp; </strong>{user.username}
                            </div>
                            <div className='email-data'>
                                <strong>Email :</strong> {user.email}
                            </div>
                            <div className='user-actions'>
                                <Link to={`/edit/${user.id}`} className="btn btn-outline-secondary edit">
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary delete"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserList;
