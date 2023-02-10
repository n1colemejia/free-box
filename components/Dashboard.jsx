import { Container, Col, Card, Text } from '@nextui-org/react';

export default function Dashboard() {
  const updateOne = "Brianna, Natalie and 3 others added new item to their free box";
  const updateTwo = "2 friends claimed dibs on items in your free box";
  const updateThree = "Sahana added you as a friend";
  
  const notifications = (
    <div>
      <Text h3>{updateOne}</Text>
      <Text h3>{updateTwo}</Text>
      <Text h3>{updateThree}</Text>
    </div>
  );

  return (
    <Container>
      <Card>
        <Card.Body>
          <Col justify='center' align='center'>
            <Text h2>Hello Nicole</Text>
            {notifications}
          </Col>
        </Card.Body>
      </Card>
    </Container>
  );
}