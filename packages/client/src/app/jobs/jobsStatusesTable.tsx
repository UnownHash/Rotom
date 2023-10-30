import { JobsDTO, JobsStatusDTO } from '@rotom/types';
import { Loading, Table } from '@nextui-org/react';

interface JobsStatusesTableProps {
  isLoading: boolean;
  jobs?: JobsDTO;
  statuses: JobsStatusDTO;
}

export const JobsStatusesTable = ({ isLoading, statuses }: JobsStatusesTableProps): JSX.Element => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Table
      aria-label="Jobs"
      bordered
      sticked
      lined
      headerLined
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <Table.Header>
        <Table.Column>ID</Table.Column>
        <Table.Column>Job</Table.Column>
        <Table.Column>Device ID</Table.Column>
        <Table.Column>Device Origin</Table.Column>
        <Table.Column>Result</Table.Column>
        <Table.Column>Is Over</Table.Column>
        <Table.Column>Is Successful</Table.Column>
      </Table.Header>
      <Table.Body>
        {Object.keys(statuses)
          .sort((jobNumberA, jobNumberB) => {
            return parseInt(jobNumberA) - parseInt(jobNumberB);
          })
          .map((id) => {
            const status = statuses[id];

            return (
              <Table.Row key={id}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{status.jobId}</Table.Cell>
                <Table.Cell>{status.deviceId}</Table.Cell>
                <Table.Cell>{status.deviceOrigin}</Table.Cell>
                <Table.Cell>{status.result}</Table.Cell>
                <Table.Cell>{status.executionComplete ? '✅' : '❌'}</Table.Cell>
                <Table.Cell>{status.success ? '✅' : '❌'}</Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};
