import './App.css'
import AppRoutes from './AppRoutes'
import AuthProvider from './contexts/AuthContext'

// App check authentication
// Trong App sẽ có AppRoutes và chứa các trang mình cần

function App() {
  return (<AuthProvider>
    <AppRoutes />
  </AuthProvider>);
};


export default App;
