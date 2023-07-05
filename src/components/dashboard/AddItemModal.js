import { Button, Modal, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';

export default function AddItemModal(props) {

    const form = useForm({
        initialValues: {
          item: '',
          quantity: 0,
          unit: 'oz',
          boughtdate: '',
          exp: '',
        },
      });

    return(
        <Modal opened={props.opened} onClose={props.onClose} title="Add food item">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Food item"
                    placeholder="Strawberries"
                    description="Search for a food item"
                    {...form.getInputProps('item')}
                />
                <NumberInput
                    defaultValue={0}
                    placeholder="0"
                    label="Quantity"
                    precision={2}
                    withAsterisk
                    {...form.getInputProps('quantity')}
                />
                <NativeSelect
                    data={['oz', 'grams', 'lbs', 'pints', 'quarts', 'gallons', ]}
                    label="Unit"
                    withAsterisk
                    {...form.getInputProps('unit')}
                />
                <DateInput 
                    label="Bought date" 
                    placeholder="Date input" 
                    withAsterisk
                    {...form.getInputProps('boughtdate')}
                />
                <DateInput 
                    label="Expiration date" 
                    placeholder="Date input" 
                    withAsterisk
                    {...form.getInputProps('exp')}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Modal>
    )
}