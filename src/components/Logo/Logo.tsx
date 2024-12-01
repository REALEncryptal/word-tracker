import { Image, Group, Text } from '@mantine/core';
import logo from '../../assets/logo.png';

export default function Logo({ size }: { size: number }) {
    return <Group align="center" gap={5}>
        <Image src={logo} alt="Word Tracker" width={size} height={size} />
        <Text fw={700} c="blue">Word Tracker</Text>
    </Group>
}
