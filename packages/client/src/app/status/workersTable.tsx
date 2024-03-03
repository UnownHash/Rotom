import { memo, useMemo, useState } from 'react';
import { SortDescriptor, Table } from '@nextui-org/react';
import { WorkerDTO, StatusDTO } from '@rotom/types';

import { RelativeTimeLabel } from './relativeTimeLabel';
import { StatusTable } from './statusTable';
import { useTableSort } from './useTableSort';
import { SearchInput } from './search';

const initialSortDescriptor: SortDescriptor = { column: 'workerId', direction: 'ascending' };

export const WorkersTable = ({ workers }: { workers: StatusDTO['workers'] }): JSX.Element => {
  const [search, setSearch] = useState('');
  const list = useTableSort<WorkerDTO>({
    items: workers,
    initialSortDescriptor,
  });

  const filteredItems = useMemo(() => {
    const lowercaseSearch = search.toLowerCase();
    return list.items.filter(
      (worker) =>
        !lowercaseSearch ||
        worker.worker.origin?.toLowerCase().includes(lowercaseSearch) ||
        worker.workerId.toLowerCase().includes(lowercaseSearch) ||
        worker.controller?.workerName.toLowerCase().includes(lowercaseSearch),
    );
  }, [search, list.items]);

  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <StatusTable
        aria-label="Workers"
        onSortChange={list.sort}
        rowsPerPage={100}
        sortDescriptor={list.sortDescriptor}
        tableLength={filteredItems.length}
      >
        <Table.Header>
          <Table.Column key="origin" allowsSorting>
            Origin
          </Table.Column>
          <Table.Column key="workerId" allowsSorting>
            Worker Id
          </Table.Column>
          <Table.Column key="workerVersion" allowsSorting>
            Version
          </Table.Column>
          <Table.Column key="isAllocated" allowsSorting>
            Is Active
          </Table.Column>
          <Table.Column key="scanner.workerName" allowsSorting>
            Scanner Worker Name
          </Table.Column>
          <Table.Column key="mitm.dateLastMessageReceived" allowsSorting>
            Last message received
          </Table.Column>
          <Table.Column key="mitm.dateLastMessageSent" allowsSorting>
            Last message sent
          </Table.Column>
        </Table.Header>
        <Table.Body loadingState={list.loadingState}>
          {filteredItems.map((worker, index) => (
            <Table.Row key={`${worker.workerId}-${index}`}>
              <Table.Cell>{worker.worker.origin}</Table.Cell>
              <Table.Cell>{worker.workerId}</Table.Cell>
              <Table.Cell>{worker.worker.version}</Table.Cell>
              <Table.Cell>{worker.isAllocated ? '✅' : '❌'}</Table.Cell>
              <Table.Cell>{worker.controller?.workerName}</Table.Cell>
              <Table.Cell>
                <RelativeTimeLabel timestamp={worker.worker.dateLastMessageReceived} />
              </Table.Cell>
              <Table.Cell>
                <RelativeTimeLabel timestamp={worker.worker.dateLastMessageSent} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </StatusTable>
    </>
  );
};

export const MemoizedWorkersTable = memo(WorkersTable);
