import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClientProvider} from '@tanstack/react-query'
import queryClient from './queryClient.ts'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/root.tsx'
import ErrorPage from './routes/error-page.tsx'
import Register from './routes/register.tsx'
import Login from './routes/login.tsx'
import Home from './routes/home.tsx'
import Balance from './routes/balance.tsx'
import Transaction from './routes/transaction.tsx'
import Confirmation from './routes/confirmation.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "balance",
        element: <Balance />
      },
      {
        path: "transaction",
        element: <Transaction />
      },
      {
        path: "confirmation",
        element: <Confirmation />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
)
