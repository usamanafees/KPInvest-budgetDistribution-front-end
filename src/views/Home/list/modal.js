import { X } from 'react-feather'
import { Button, Label, Modal, ModalBody, FormGroup, Input, Form, CustomInput, Row, Col, Card, ModalHeader } from 'reactstrap'
import CreateForm from '../forms/createEmployee'
import EditForm from '../forms/editEmployee'


export const ModalComponent = ({ rowId, modal, toggle, teams, users, totalUsers }) => {
    return (
        <Modal isOpen={modal}
        style={{ 
            marginTop: 250,
            maxWidth: 280
        }}
        toggle={toggle}
        backdrop="static">
            <ModalHeader className="m-0">
                <Row>
                    <Col sm={10}>
                        <h3 className='text-primary' style={{ fontWeight: 600, margin: 0 }}>
                            {(rowId !== undefined) ? 'Edit Employee' : 'Add Employee'}
                        </h3> 
                    </Col>
                    <Col sm={2}>
                        <X onClick={toggle} className='cursor-pointer' style={{color: "black"}} size={20} />
                    </Col>
                </Row>
            
            </ModalHeader>
            <ModalBody className="m-2">
                {(rowId !== undefined) ? <EditForm teams={teams} totalUsers={totalUsers} users={users} toggle={toggle} rowId={rowId} /> : <CreateForm teams={teams} totalUsers={totalUsers} users={users} toggle={toggle} />}
            </ModalBody>
        </Modal>
    )
}
