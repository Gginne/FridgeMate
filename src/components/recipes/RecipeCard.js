import { Card, Image, Text, Button, Group } from "@mantine/core";

export default function RecipeCard({ data }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={data.image} height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text size={15} weight={500}>
          {data.title}
        </Text>
      </Group>

      <Button
        component="a"
        rel="noopener noreferrer"
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        href={data.sourceUrl}
        target="_blank"
      >
        Go to recipe
      </Button>
    </Card>
  );
}
