import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FullPageSpinner from './components/FullPageSpinner'
import Home from './pages/home/Home'
import { ErrorBoundary } from 'react-error-boundary'
import { IErrorValues } from './utils/interfaces'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar'
import { DataMessageProvider } from './context/MessageContext'

const ListAddress = React.lazy(() => import('./pages/listAddress/ListAddress'))
const SearchAddress = React.lazy(() => import('./pages/searchAddress/SearchAddress'))

function FullPageErrorFallback({ error }: IErrorValues) {
  return (
    <div
      role="alert"
      style={{
        color: 'red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <DataMessageProvider>
        <NavigationBar />
        <Router>
          <React.Suspense fallback={<FullPageSpinner />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/list' element={<ListAddress />} />
              <Route path='/search' element={<SearchAddress />} />
            </Routes>
          </React.Suspense>
        </Router>
      </DataMessageProvider>
    </ErrorBoundary>
  )
}

export default App
