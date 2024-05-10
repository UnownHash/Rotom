import { useQuery } from '@tanstack/react-query';
import { Button, Grid, Loading, Spacer, Text } from '@nextui-org/react';
import { StatusDTO, TransformedStatusDTO } from '@rotom/types';
import { useCallback, useState } from 'react';

import { StatusCard } from './statusCard';
import { MemoizedWorkersTable as WorkersTable } from './workersTable';
import { MemoizedDevicesTable as DevicesTable } from './devicesTable';

const fetchStatus = (): Promise<StatusDTO> => fetch('/api/status').then((res) => res.json());

export const StatusPage = (): JSX.Element => {
  const { isLoading, isFetching, error, data, isSuccess } = useQuery<StatusDTO, Error, TransformedStatusDTO>(
    ['status'],
    fetchStatus,
    {
      refetchInterval: 5000,
      select: (data) => {
        const newData = { ...data } as TransformedStatusDTO;

        newData.devices.forEach((device) => {
          const deviceWorkers = newData.workers.filter((worker) => worker.deviceId === device.deviceId);
          device.load = {
            percent: 0,
            allocated: deviceWorkers.filter((worker) => worker.isAllocated).length,
            total: deviceWorkers.length,
          };
          if (device.load.total) {
            device.load.percent = (device.load.allocated / device.load.total) * 100;
          }
        });

        return newData;
      },
    },
  );
  const [delLoading, setDelLoading] = useState(false);

  const handleRemoveDead = useCallback(async () => {
    setDelLoading(true);
    const cancel = new AbortController();
    const timer = setTimeout(() => cancel.abort(), 5000);
    try {
      await fetch('/api/device', { method: 'DELETE', signal: cancel.signal });
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
