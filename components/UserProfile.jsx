import { Container, Col, Card, Text } from '@nextui-org/react';
// import Image from 'next/image';

export default function UserProfile({ user }) {

  return (
      <Container>
        <Card>
          <Card.Body>
            <Col justify='center' align='flex-start'>
              {/* <Image
                src={}
                alt={`photo of ${user.displayName}`}
              /> */}
              <div>
                Profile picture here
              </div>
            </Col>
            <Col justify='center' align='flex-start'>
                <Text h1>{user.displayName}</Text>
                <Text h2>@{user.username}</Text>
                <Text h3>{user.bio}</Text>
            </Col>
        </Card.Body>
      </Card>
    </Container>
  );
}