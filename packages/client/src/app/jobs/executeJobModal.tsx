import { Button, Modal, Table, Text } from '@nextui-org/react';
import { DeviceControlDTO } from '@rotom/connections';
import { Selection } from '@react-types/shared/src/selection';
import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';

interface ExecuteJobModalProps {
  closeModal: () => void;
  devices?: DeviceControlDTO[];
  jobId: string;
}

export const ExecuteJobModal = ({ closeModal, devices, jobId }: ExecuteJobModalProps): JSX.Element => {
  const [selectedDevices, setSelectedDevices] = useState<Selection>();

  const executeJob = useCallback(
    async ({ deviceIds }: { deviceIds: string[] | number[] }) => {
      const promise = fetch(`/api/job/execute/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // fastify is only able to parse the body to a project with this header
        },
        body: JSON.stringify({ deviceIdsOrOrigins: deviceIds }),
      }).then(async (response) => {
        if (response.status !== 200) {
          throw new Error();
        }
        closeModal();
      });

      toast.promise(promise, {
        pending: `Running ${jobId}...`,
        success: `${jobId} started successfully`,
        error: `Failed to start job ${jobId}`,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jobId],
  );

  return (
    <>
      <Modal.Header>
        <Text h3>Execute {jobId}</Text>
      </Modal.Header>
      <Modal.Body>
        {devices && (
          <Table
            aria-label="Devices"
            bordered
            headerLined
            lined
            selectionMode="multiple"
            sticked
            selectedKeys={selectedDevices}
            onSelectionChange={(selection) => setSelectedDevices(selection)}
            css={{
              height: 'auto',
              minWidth: '100%',
            }}
            containerCss={{
              overflow: 'auto',
            }}
          >
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column>Origin</Table.Column>
            </Table.Header>
            <Table.Body>
              {devices.map((device) => (
                <Table.Row key={`${device.deviceId}`}>
                  <Table.Cell>{device.deviceId}</Table.Cell>
                  <Table.Cell>{device.origin}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          disabled={!selectedDevices || !devices}
          onClick={() => {
            if (!selectedDevices || !devices) {
              return;
            }

            if (selectedDevices === 'all') {
              executeJob({ deviceIds: devices.map((device) => device.deviceId) as string[] });
              return;
            }

            executeJob({ deviceIds: Array.from(selectedDevices) as string[] });
          }}
        >
          Run
        </Button>
      </Modal.Footer>
    </>
  );
};
