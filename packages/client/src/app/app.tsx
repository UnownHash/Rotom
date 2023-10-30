import 'react-toastify/dist/ReactToastify.css';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { JobsPage } from './jobs';
import { StatusPage } from './status';
import { Layout } from './layout';

const queryClient = new QueryClient();
const darkTheme = createTheme({
  type: 'dark',
});

if (process.env['NODE_ENV'] === 'development' && process.env['NX_ENABLE_MOCKS'] === '1') {
  import('./server').then(({ makeServer }) => {
    makeServer({ environment: 'development' });
  });
}

export const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={darkTheme}>
        <Layout>
          <Routes>
            <Route path="/" element={<StatusPage />} />
            <Route path="jobs" element={<JobsPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          theme="dark"
          autoClose={5000}
          closeOnClick
          draggable
          pauseOnFocusLoss
          pauseOnHover
          style={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            /* @ts-ignore */
            '--toastify-z-index': '10000',
          }}
        />
      </NextUIProvider>
    </QueryClientProvider>
  );
};
