import { Text } from '@nextui-org/react';
import { JobsDTO, JobsStatusDTO, MitmControlDTO, StatusDTO } from '@rotom/types';
import { useQuery } from '@tanstack/react-query';
import { JobsTable } from './jobsTable';
import { JobsStatusesTable } from './jobsStatusesTable';

const fetchJobs = (): Promise<JobsDTO> => fetch('/api/job/list').then((res) => res.json());
const fetchJobsStatuses = (): Promise<JobsStatusDTO> => fetch('/api/job/status').then((res) => res.json());
const fetchStatus = (): Promise<StatusDTO> => fetch('/api/status').then((res) => res.json());

export const JobsPage = (): JSX.Element => {
  const {
    isLoading: areJobsStatusesLoading,
    refetch: refreshJobStatuses,
    error: jobsStatusesError,
    data: jobsStatuses,
    isSuccess: jobsStatusesSuccess,
  } = useQuery<JobsStatusDTO, Error>(['jobsStatuses'], fetchJobsStatuses, {
    refetchInterval: 5000,
  });

  const { data: devices, refetch: refetchDevices } = useQuery<StatusDTO, Error, MitmControlDTO[]>(
    ['status'],
    fetchStatus,
    {
      select: (status) => status.devices,
    },
  );

  const {
    isLoading: areJobsLoading,
    isFetching: areJobsFetching,
    error: jobsError,
    data: jobs,
    isSuccess: jobsSuccess,
  } = useQuery<JobsDTO, Error>(['jobs'], fetchJobs, {
    staleTime: Infinity,
  });

  if (jobsError || !jobsSuccess) {
    return <div>An error has occurred: {jobsError?.message}</div>;
  }

  if (jobsStatusesError || !jobsStatusesSuccess) {
    return <div>An error has occurred: {jobsStatusesError?.message}</div>;
  }

  return (
    <>
      <Text h1>Jobs</Text>
      <Text h3>List</Text>
      <JobsTable
        devices={devices}
        isLoading={areJobsLoading || areJobsFetching}
        jobs={jobs}
        refetchDevices={refetchDevices}
        refreshJobStatuses={refreshJobStatuses}
      />
      <Text h3>Statuses</Text>
      <JobsStatusesTable isLoading={areJobsStatusesLoading} jobs={jobs} statuses={jobsStatuses} />
    </>
  );
};
