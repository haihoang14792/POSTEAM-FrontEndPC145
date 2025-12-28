import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createNewJob } from '../../../services/storeServices';
import { getUsers } from '../../../services/userServices';
import './ModalStore.scss';

const ModalStore = ({ showModal, handleClose, handleAddJob }) => {
    const [newJob, setNewJob] = useState({
        StoreID: '',
        ListJob: '',
        DescriptionJob: '',
        DateJob: '',
        Note: '',
        Person: '',
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUsers();
                console.log('Dữ liệu người dùng:', userData);
                setUsers(userData);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prevJob) => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await createNewJob(newJob);
            console.log('Công việc mới đã được thêm:', response);

            handleAddJob(response);

            setNewJob({
                StoreID: '',
                ListJob: '',
                DescriptionJob: '',
                DateJob: '',
                Note: '',
                Person: '',
            });

            handleClose();
        } catch (error) {
            console.error('Lỗi khi thêm công việc:', error);
        }
    };

    return (
        <Modal className="modalContent" show={showModal} onHide={handleClose}>
            <Modal.Header className="modalHeader" closeButton>
                <Modal.Title className="modalTitle">Thêm Công Việc Mới</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <Form>
                    <Form.Group className="formGroup">
                        <Form.Label className="formLabel">Store Number</Form.Label>
                        <Form.Control
                            className="formControl"
                            type="text"
                            name="StoreID"
                            value={newJob.StoreID}
                            onChange={handleInputChange}
                            placeholder="Enter Store Number"
                        />
                    </Form.Group>
                    <Form.Group className="formGroup">
                        <Form.Label className="formLabel">Danh sách công việc</Form.Label>
                        <Form.Control
                            className="formControl"
                            type="text"
                            name="ListJob"
                            value={newJob.ListJob}
                            onChange={handleInputChange}
                            placeholder="Enter List of Jobs"
                        />
                    </Form.Group>
                    <Form.Group className="formGroup">
                        <Form.Label className="formLabel">Mô tả</Form.Label>
                        <Form.Control
                            className="formControl"
                            type="text"
                            name="DescriptionJob"
                            value={newJob.DescriptionJob}
                            onChange={handleInputChange}
                            placeholder="Enter Job Description"
                        />
                    </Form.Group>
                    <Form.Group className="formGroup">
                        <Form.Label className="formLabel">Ngày thực hiện</Form.Label>
                        <Form.Control
                            className="formControl"
                            type="date"
                            name="DateJob"
                            value={newJob.DateJob}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="formGroup">
                        <Form.Label className="formLabel">Ghi chú</Form.Label>
                        <Form.Control
                            className="formControl"
                            type="text"
                            name="Note"
                            value={newJob.Note}
                            onChange={handleInputChange}
                            placeholder="Enter Note"
                        />
                    </Form.Group>
                    <Form.Group className="formGroup">
                        <Form.Label className="formLabel">Người phụ trách</Form.Label>
                        <Form.Control
                            as="select"
                            className="formControl"
                            name="Person"
                            value={newJob.Person}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Chọn người phụ trách --</option>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <option key={user.id} value={user.FullName}>
                                        {user.FullName || user.Position}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Không có người dùng</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <Button className="btnSecondary" variant="secondary" onClick={handleClose}>Hủy</Button>
                <Button className="btnPrimary" variant="primary" onClick={handleSubmit}>Thêm công việc</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalStore;
