import { useQuery } from '@tanstack/react-query';
import { Loading, Spacer, Text } from '@nextui-org/react';
import { StatusDTO } from '@rotom/types';

import { StatusCard } from './statusCard';
import { MemoizedWorkersTable as WorkersTable } from './workersTable';
import { MemoizedDevicesTable as DevicesTable } from './devicesTable';

const fetchStatus = (): Promise<StatusDTO> => fetch('/api/status').then((res) => res.json());

export const StatusPage = (): JSX.Element => {
  const { isLoading, isFetching, error, data, isSuccess } = useQuery<StatusDTO, Error>(['status'], fetchStatus, {
    refetchInterval: 5000,
  });

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
      <Text h3>Devices</Text>
      <DevicesTable devices={data.devices} workers={data.workers} />
      <Spacer y={1} />
      <Text h3>Workers</Text>
      <WorkersTable workers={data.workers} />
    </>
  );
};
