import React from 'react'
import '../App.css'
import { Col, Form, Row } from 'react-bootstrap'






function SideBar() {

    
  return (

    <>
      <div id='sidebar-layout'>
      <Form inline>
      <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
         
        </Row>
        </Form>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>


      </div>




    </>
  )
}

export default SideBar