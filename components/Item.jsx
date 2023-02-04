import { Card, Text } from '@nextui-org/react';
import Image from 'next/image';
import chair from 'public/images/arm-chair.jpeg';

export default function Item({ item }) {
  return (
    <Card>
      <Text h3>{item.title}</Text>
      <Image 
        src={item.photoURL}
        alt={`${item.title}`}
        width={300}
        height={300}
        />
        <Text>{item.caption}</Text>
    </Card>
  );
}