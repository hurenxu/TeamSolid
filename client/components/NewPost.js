import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

const styles = {
  width: '33vw',
  marginTop: '5vh',
}

const NewPost = () => (
  <Form style={styles} reply>
    <Form.TextArea />
      <Button.Group>
          <Button>Clear</Button>
          <Button.Or />
          <Button positive>Post</Button>
      </Button.Group>
  </Form>
)

export default NewPost