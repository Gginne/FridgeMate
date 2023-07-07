import { Button, 
    Group, 
    Modal, 
} from '@mantine/core';
import { db } from "../../firebase";

export default function DeleteItemModal(props) {

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            await db.fridgeitems.doc(props.id).delete()
            props.onClose()
        } catch(err) {
            console.log(err)
        }
    }
    return(
        <Modal
            opened={props.opened} 
            onClose={props.onClose} 
            title={`Remove ${props.name} from fridge?`}
        >
                <Group position='apart'>
                    <Button variant="outline" onClick={props.onClose}>No, go back</Button>
                    <Button type='submit' onClick={handleDelete}>Yes, remove</Button>
                </Group>
        </Modal>
    )
}