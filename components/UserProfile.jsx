import { Container, Col, Card, Text } from '@nextui-org/react';
import Image from 'next/image';
import AddFriendButton from './AddFriendButton';

export default function UserProfile({ user, addFriendCallback, removeFriendCallback}) {

  return (
      <Container>
        <Card>
          <Card.Body>
            <Col justify='center' align='flex-start'>
              <Image
                src={user.profilePic}
                alt={`photo of ${user.name}`}
                width={100}
                height={150}
              />
              <div>
                Profile picture here
              </div>
            </Col>
            <Col justify='center' align='flex-start'>
                <Text h1>{user.displayName}</Text>
                <Text h2>@{user.username}</Text>
                <Text h3>{user.bio}</Text>
            </Col>
            <Col justify='center' align='flex-start'>
              <AddFriendButton
                friend={user.username}
                addFriendCallback={addFriendCallback}
                removeFriendCallback={removeFriendCallback}
              />
            </Col>
        </Card.Body>
      </Card>
    </Container>
  );
}