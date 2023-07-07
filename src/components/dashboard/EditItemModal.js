import { Button, 
    Group, 
    Modal, 
    NativeSelect, 
    NumberInput,  
    Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, isNotEmpty } from '@mantine/form';
import { db } from "../../firebase";

export default function EditItemModal(props) {

    const form = useForm({
        initialValues: {
          item: props.data.item,
          quantity: props.data.quantity,
          unit: props.data.unit,
          boughtdate: new Date(props.data.bought.seconds * 1000),
          exp: new Date(props.data.exp.seconds * 1000),
        },
        validate: {
            item: isNotEmpty(),
            quantity: (value) => (value <= 0 ? 'Quantity must be greater than 0' : null),
            unit: isNotEmpty(),
            boughtdate: isNotEmpty(),
            exp: isNotEmpty(),
        }
      });

    const handleSubmit = async (e) => {
        e.preventDefault()
        var valid = form.validate()
        if(valid.hasErrors) {
            return
        }

        const data = {}
        if(form.values.quantity !== props.data.quantity) {
            data['quantity'] = form.values.quantity
        }
        if(form.values.boughtdate.getDate() !== new Date(props.data.bought.seconds * 1000).getDate()) {
            data['bought'] = form.values.boughtdate
        }
        if(form.values.exp.getDate() !== new Date(props.data.exp.seconds * 1000).getDate()) {
            data['exp'] = form.values.exp
        }

        if(Object.keys(data).length === 0) {
            props.onClose()
            return
        } else {
            try{
                const doc = await db.fridgeitems.doc(props.data.id)
                doc.update(data)
                props.onClose()
            } catch(err) {
                console.log(err)
            }
        }
    }    

    return(
        <Modal
            opened={props.opened} 
            onClose={props.onClose}
            title={`Edit ${props.data.name}`}
        >
            <form onSubmit={handleSubmit}>
                <Stack>
                    <NumberInput
                            placeholder="0"
                            label="Quantity"
                            precision={2}
                            min={0}
                            withAsterisk
                            {...form.getInputProps('quantity')}
                        />
                        <NativeSelect
                            data={[props.data.unit]}
                            label="Unit"
                            withAsterisk
                            disabled
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
                        <Group position="apart">
                            <Group>
                                <Button variant="outline" onClick={props.onClose}>Cancel</Button>
                            </Group>
                            <Button type='submit'>Save</Button>
                        </Group>
                </Stack>
            </form>
        </Modal>
    )
}