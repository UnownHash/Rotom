import { Button, Loading, Modal, Table, useModal } from '@nextui-org/react';
import { JobsDTO, DeviceControlDTO } from '@rotom/types';
import { useState } from 'react';

import { ExecuteJobModal } from './executeJobModal';

interface JobsTableProps {
  devices?: DeviceControlDTO[];
  isLoading: boolean;
  jobs: JobsDTO;
  refetchDevices: () => void;
  refreshJobStatuses: () => void;
}

export const JobsTable = ({
  devices,
  isLoading,
  jobs,
  refetchDevices,
  refreshJobStatuses,
}: JobsTableProps): JSX.Element => {
  const [jobId, setJobId] = useState<string>('');
  const { setVisible, bindings } = useModal();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
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
          <Table.Column>Name</Table.Column>
          <Table.Column>Description</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {Object.values(jobs).map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.id}</Table.Cell>
              <Table.Cell>{job.description}</Table.Cell>
              <Table.Cell>
                <Button
                  size="sm"
                  onClick={() => {
                    refetchDevices();
                    setJobId(job.id);
                    setVisible(true);
                  }}
                >
                  Run
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal scroll fullScreen closeButton={true} aria-labelledby="job execution modal" {...bindings}>
        <ExecuteJobModal
          closeModal={() => {
            setVisible(false);
            refreshJobStatuses();
          }}
          devices={devices}
          jobId={jobId}
        />
      </Modal>
    </>
  );
};
