import { useQuery } from '@tanstack/react-query';
import { Button, Grid, Loading, Spacer, Text } from '@nextui-org/react';
import { StatusDTO } from '@rotom/types';
import { useCallback, useState } from 'react';

import { StatusCard } from './statusCard';
import { MemoizedWorkersTable as WorkersTable } from './workersTable';
import { MemoizedDevicesTable as DevicesTable } from './devicesTable';

const fetchStatus = (): Promise<StatusDTO> => fetch('/api/status').then((res) => res.json());

export const StatusPage = (): JSX.Element => {
  const { isLoading, isFetching, error, data, isSuccess } = useQuery<StatusDTO, Error>(['status'], fetchStatus, {
    refetchInterval: 5000,
  });
  const [delLoading, setDelLoading] = useState(false);

  const handleRemoveDead = useCallback(async () => {
    setDelLoading(true);
    const cancel = new AbortController();
    const timer = setTimeout(() => cancel.abort(), 5000);
    try {
      await fetch('/api/device/delete', { method: 'DELETE', signal: cancel.signal });
    } catch (e) {
      console.error(e);
    } finally {
      setDelLoading(false);
      clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !isSuccess) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <>
      <Text h1>
        Status
        <Spacer x={1} css={{ display: 'inline-block' }} />
        {(isLoading || isFetching) && <Loading />}
      </Text>
      <StatusCard {...data} />
      <Spacer y={1} />
      <Grid.Container justify="space-between" alignItems="center">
        <Grid>
          <Text h3>Devices</Text>
        </Grid>
        <Grid>
          <Button auto color="error" size="sm" onClick={handleRemoveDead}>
            {delLoading ? <Loading /> : 'Remove Dead'}
          </Button>
        </Grid>
      </Grid.Container>
      <DevicesTable devices={data.devices} workers={data.workers} />
      <Spacer y={1} />
      <Text h3>Workers</Text>
      <WorkersTable workers={data.workers} />
    </>
  );
};
