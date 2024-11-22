import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { AuthProvider } from './context/auth.context';
import RouterWrapper from './Router';

const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <RouterWrapper />
      </AuthProvider>
    </LocalizationProvider>
  );
};

export default App;
