import React from 'react';
import { AddForm } from './components/AddForm';
import { UserState } from './context/User/userState';
import { ListUsers } from './components/ListUsers';
import { Alert } from './components/Alert';
import { AlertState } from './context/Alert/alertState';

function App() {
  return (
    <div className="p-4">
      <div className="row justify-content-center">
        <AlertState>
          <UserState>
            <div className="col-10 col-xl-4">
                <AddForm />
                <Alert />
            </div>
            <div className="col-10 col-xl-8">
                <ListUsers />  
            </div>
          </UserState>
        </AlertState>
      </div>
    </div>
  );
}

export default App;
