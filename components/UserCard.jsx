import { Card, User } from "@nextui-org/react";

export default function UserCard() {
  return (
    <Card>
      <User 
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        name="Tony Reichert"
        size="xl"
      />
    </Card>
  )
}