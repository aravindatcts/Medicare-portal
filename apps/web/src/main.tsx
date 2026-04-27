import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { AuthProvider } from '@descope/react-sdk'
import App from './App.tsx'
// import LoginPage from './pages/LoginPage.tsx'
import Dashboard from './pages/Dashboard.tsx'
import FindCare from './pages/FindCare.tsx'
import Benefits from './pages/Benefits.tsx'
import Prescriptions from './pages/Prescriptions.tsx'
import Claims from './pages/Claims.tsx'
import ClaimDetails from './pages/ClaimDetails.tsx'
import SubmitClaim from './pages/SubmitClaim.tsx'
import ProviderDetail from './pages/ProviderDetail.tsx'
// import ProtectedRoute from './components/ProtectedRoute.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AuthProvider projectId={import.meta.env.VITE_DESCOPE_PROJECT_ID}> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route
              path="/"
              element={<App />}
            >
              <Route index element={<Dashboard />} />
              <Route path="find-care" element={<FindCare />} />
              <Route path="find-care/:id" element={<ProviderDetail />} />
              <Route path="benefits" element={<Benefits />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="claims" element={<Claims />} />
              <Route path="claims/:id" element={<ClaimDetails />} />
              <Route path="claims/submit" element={<SubmitClaim />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    {/* </AuthProvider> */}
  </StrictMode>,
)
