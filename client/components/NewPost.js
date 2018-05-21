import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

const styles = {
  width: '33vw',
  marginTop: '5vh',
}

const NewPost = () => (
  <Form style={styles} reply>
    <Form.TextArea />
    <Button content='New Post' labelPosition='left' icon='edit' primary />
  </Form>
)

export default NewPost
