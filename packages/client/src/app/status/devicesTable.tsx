import { Fragment, memo, useCallback, useState } from 'react';
import { StatusDTO, MitmControlDTO } from '@rotom/types';
import { Table, Dropdown, SortDescriptor } from '@nextui-org/react';
import { toast } from 'react-toastify';

import { RelativeTimeLabel } from './relativeTimeLabel';
import { StatusTable } from './statusTable';
import { useTableSort } from './useTableSort';
import { SearchInput } from './search';

const kBNumberFormat = new Intl.NumberFormat('en', { style: 'unit', unit: 'kilobyte', unitDisplay: 'short' });

const initialSortDescriptor: SortDescriptor = { column: 'origin', direction: 'ascending' };

export const DevicesTable = ({ devices, workers }: StatusDTO): JSX.Element => {
  const [search, setSearch] = useState('');
  const executeAction = useCallback(
    async ({ deviceId, action }: { deviceId: string; action: 'reboot' | 'restart' | 'getLogcat' | 'delete' }) => {
      const promise = fetch(`/api/device/${deviceId}/action/${action}`, { method: 'POST' }).then(async (response) => {
        if (response.status !== 200) {
          throw new Error();
        }

        if (action === 'getLogcat') {
          const blob = await response.blob();
          const fileUrl = window.URL.createObjectURL(blob);
          const fileName = response.headers.get('Content-Disposition')?.slice(22, -1) || 'logcat.zip';

          const anchorElement = document.createElement('a');
          anchorElement.style.display = 'none';
          document.body.appendChild(anchorElement);
          anchorElement.href = fileUrl;
          anchorElement.download = fileName;
          anchorElement.click();

          window.URL.revokeObjectURL(fileUrl);
          document.body.removeChild(anchorElement);
        }
      });

      toast.promise(promise, {
        pending: 'Please wait...',
        success: {
          reboot: 'Device Rebooted',
          restart: 'MITM restarted',
          getLogcat: 'Download started',
          delete: 'Device entry removed',
        }[action],
        error: {
          reboot: 'Failed to reboot device',
          restart: 'Failed to restart MITM',
          getLogcat: 'Failed to download logcat, please check logs',
          delete: "Failed to remove device entry. Make sure it's not alive.",
        }[action],
      });
    },
    [],
  );

  const list = useTableSort<MitmControlDTO>({
    items: devices,
    initialSortDescriptor,
  });

  if (list.items.length === 0) {
    return <div />;
  }

  const lowercaseSearch = search.toLowerCase();
  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <StatusTable
        aria-label="Devices"
        onSortChange={list.sort}
        rowsPerPage={30}
        sortDescriptor={list.sortDescriptor}
        tableLength={list.items.length}
      >
        <Table.Header>
          <Table.Column key="origin" allowsSorting>
            Origin
          </Table.Column>
          <Table.Column key="load" allowsSorting>
            Load
          </Table.Column>
          <Table.Column key="deviceId" allowsSorting>
            Device Id
          </Table.Column>
          <Table.Column key="isAlive" allowsSorting>
            Is Alive
          </Table.Column>
          <Table.Column key="version" allowsSorting>
            MITM's Version
          </Table.Column>
          <Table.Column key="dateLastMessageReceived" allowsSorting>
            Last message received
          </Table.Column>
          <Table.Column key="dateLastMessageSent" allowsSorting>
            Last message sent
          </Table.Column>
          <Table.Column key="lastMemory.memFree" allowsSorting>
            Free memory
          </Table.Column>
          <Table.Column key="lastMemory.memMitm" allowsSorting>
            MITM memory
          </Table.Column>
          <Table.Column key="lastMemory.memStart" allowsSorting>
            Start memory
          </Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body loadingState={list.loadingState}>
          {list.items
            .filter(
              (device) =>
                !lowercaseSearch ||
                device.origin?.toLowerCase().includes(lowercaseSearch) ||
                device.deviceId?.toLowerCase().includes(lowercaseSearch) ||
                device.version === lowercaseSearch,
            )
            .map((device, index) => {
              const deviceWorkers = workers.filter((worker) => worker.deviceId === device.deviceId);

              return (
                <Table.Row key={`${device.deviceId}-${index}`}>
                  <Table.Cell>{device.origin}</Table.Cell>
                  <Table.Cell>
                    {deviceWorkers.filter((worker) => worker.isAllocated).length}/{deviceWorkers.length}
                  </Table.Cell>
                  <Table.Cell>{device.deviceId}</Table.Cell>
                  <Table.Cell>{device.isAlive ? '✅' : '❌'}</Table.Cell>
                  <Table.Cell>{device.version}</Table.Cell>
                  <Table.Cell>
                    <RelativeTimeLabel timestamp={device.dateLastMessageReceived} />
                  </Table.Cell>
                  <Table.Cell>
                    <RelativeTimeLabel timestamp={device.dateLastMessageSent} />
                  </Table.Cell>
                  <Table.Cell>{kBNumberFormat.format(device.lastMemory.memFree)}</Table.Cell>
                  <Table.Cell>{kBNumberFormat.format(device.lastMemory.memMitm)}</Table.Cell>
                  <Table.Cell>{kBNumberFormat.format(device.lastMemory.memStart)}</Table.Cell>
                  <Table.Cell>
                    {device.deviceId !== undefined && (
                      <Dropdown>
                        <Dropdown.Button size="xs" css={{ minWidth: 0 }} />
                        <Dropdown.Menu
                          aria-label="Actions"
                          onAction={(key) => {
                            if (
                              device.deviceId &&
                              (key === 'restart' || key === 'reboot' || key === 'getLogcat' || key === 'delete')
                            ) {
                              executeAction({ deviceId: device.deviceId, action: key });
                            }
                          }}
                        >
                          <Dropdown.Item key="restart">Restart</Dropdown.Item>
                          <Dropdown.Item key="reboot">Reboot</Dropdown.Item>
                          <Dropdown.Item key="getLogcat">Logcat</Dropdown.Item>
                          <Dropdown.Item key="delete">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </StatusTable>
    </>
  );
};

export const MemoizedDevicesTable = memo(DevicesTable);
