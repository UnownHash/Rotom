import { Card, Text, Container } from '@nextui-org/react';
import { StatusDTO } from '@rotom/types';

export const StatusCard = ({ devices, workers }: StatusDTO): JSX.Element => {
  return (
    <Container
      fluid
      responsive={false}
      display="grid"
      css={{
        gap: '12px',
        padding: 0,
        gridTemplateColumns: 'repeat(4, 1fr)',
        '@smMax': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@xsMax': {
          gridTemplateColumns: 'repeat(1, 1fr)',
        },
      }}
    >
      <Card>
        <Card.Body>
          <Text h4>Devices</Text>
          <Text>{devices.length}</Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Text h4>Total Workers</Text>
          <Text>{workers.length}</Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Text h4>Workers in Use</Text>
          <Text>{workers.filter((worker) => worker.isAllocated).length}</Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Text h4>Available Workers</Text>
          <Text>{workers.filter((worker) => !worker.isAllocated).length}</Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
