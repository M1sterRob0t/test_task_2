import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppRoute } from './constants';
import { Layout } from './componets/Layout';
import { FinalizePage } from './pages/FinalizePage';
import { ResultsPage } from './pages/ResultsPage';
import { DashboardPage } from './pages/DashboardPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <Layout />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: AppRoute.Results + '/:id',
        element: <ResultsPage />,
      },
      {
        path: AppRoute.Finalize + '/:id',
        element: <FinalizePage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
