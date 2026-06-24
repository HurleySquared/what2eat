import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '@/context/UserContext';
import { Header } from '@/components/Header';
import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';

export default function App() {
  // full meal or small bites
  // breakfast, brunch, lunch, dinner, dessert
  // meat, vegetarian, pescatarian
  // sweet or savory
  // warm or cold foods
  // heavy or light foods
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}
