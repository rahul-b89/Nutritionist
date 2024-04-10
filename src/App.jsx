import React, { useState } from 'react';
import DialogBox from './components/DialogBox';


function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="App">
      <button onClick={handleOpenDialog}>Open Dialog</button>
      <DialogBox isOpen={isDialogOpen} onClose={handleCloseDialog} setIsOpen={setIsDialogOpen} />
    </div>
  );
}

export default App;
