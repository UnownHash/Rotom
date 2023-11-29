import React, { useState, useMemo, useCallback } from 'react';
import { Button, Modal, Table, Text } from '@nextui-org/react';
import { MitmControlDTO } from '@rotom/connections';
import { Selection } from '@react-types/shared/src/selection';
import { toast } from 'react-toastify';

import { SearchInput } from '../status/search';

interface ExecuteJobModalProps {
  closeModal: () => void;
  devices?: MitmControlDTO[];
  jobId: string;
}

export const ExecuteJobModal: React.FC<ExecuteJobModalProps> = ({ closeModal, devices, jobId }) => {
  const [selectedDevices, setSelectedDevices] = useState<Selection>();
  const [search, setSearch] = useState('');

  const filteredDevices = useMemo(() => {
    return devices?.filter((device) => device.deviceId?.includes(search) || device.origin?.includes(search)) || [];
  }, [devices, search]);

  const executeJob = useCallback(
    async ({ deviceIds }: { deviceIds: string[] | number[] }) => {
      const promise = fetch(`/api/job/execute/${jobId}/${deviceIds.join()}`, { method: 'POST' }).then(
        async (response) => {
          if (response.status !== 200) {
            throw new Error();
          }
          closeModal();
        },
      );

      toast.promise(promise, {
        pending: `Running ${jobId}...`,
        success: `${jobId} started successfully`,
        error: `Failed to start job ${jobId}`,
      });
    },
    [jobId, closeModal], 
  );

  return (
    <>
      <Modal.Header>
        <Text h3>Execute {jobId}</Text>
      </Modal.Header>
      <Modal.Body>
        <SearchInput value={search} onChange={setSearch} />
        {filteredDevices && (
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
              {filteredDevices.map((device) => (
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
