import { useEffect } from 'react';
import { Can } from '../components/Can';
import { useAuthContext } from '../contexts/AuthContext';
import { api, setupAPIClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useAuthContext();

  useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data);
  return {
    props: {},
  };
});
