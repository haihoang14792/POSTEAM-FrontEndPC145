import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Thay đổi import
import ReactPaginate from 'react-paginate';
import { fetchStore, updateJobStatus } from '../../../services/strapiServices';
import ModalStore from './ModalStore';
import './Store.scss';
import { deleteJobs } from '../../../services/storeServices';
import Devices from './Devices';

const Store = () => {
    const { storeId } = useParams(); // Thay đổi cách lấy tham số

    const [storeDetails, setStoreDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedJobs, setSelectedJobs] = useState([]);

    // Load store details when storeId changes
    useEffect(() => {
        const loadStoreDetails = async () => {
            try {
                const storeDetailsData = await fetchStore(storeId);
                console.log('Dữ liệu trả về từ API:', storeDetailsData);

                if (storeDetailsData && Array.isArray(storeDetailsData)) {
                    setStoreDetails(storeDetailsData);
                } else {
                    setError(new Error('Dữ liệu trả về từ API không hợp lệ'));
                }

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        loadStoreDetails();
    }, [storeId]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleConfirm = async (jobId) => {
        try {
            const updatedJob = await updateJobStatus(jobId, { StatusJob: true });
            console.log('Cập nhật công việc:', updatedJob);

            setStoreDetails((prevDetails) =>
                prevDetails.map((job) =>
                    job.id === jobId
                        ? { ...job, attributes: { ...job.attributes, StatusJob: true } }
                        : job
                )
            );
        } catch (error) {
            console.error("Error updating job status:", error);
        }
    };

    const handleAddJob = (newJob) => {
        setStoreDetails((prevDetails) => [...prevDetails, newJob]);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedJobs(storeDetails.map(job => job.id));
        } else {
            setSelectedJobs([]);
        }
    };

    const handleSelectJob = (e, jobId) => {
        if (e.target.checked) {
            setSelectedJobs(prev => [...prev, jobId]);
        } else {
            setSelectedJobs(prev => prev.filter(id => id !== jobId));
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await deleteJobs(selectedJobs);
            setStoreDetails(prevDetails => prevDetails.filter(job => !selectedJobs.includes(job.id)));
            setSelectedJobs([]);
        } catch (error) {
            console.error("Error deleting jobs:", error);
        }
    };

    const totalPages = Math.ceil(storeDetails.length / itemsPerPage);
    const currentPageData = storeDetails.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className="mt-3">Danh sách công việc cho cửa hàng {storeId}</h2>
            <hr />
            <div className='container'>
                <div className="store-header">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus mt-2"></i> Thêm công việc
                    </button>
                    <button
                        className="btn btn-danger ml-2"
                        onClick={handleDeleteSelected}
                        disabled={selectedJobs.length === 0}
                    >
                        Xóa công việc đã chọn
                    </button>
                    <ModalStore showModal={showModal} handleClose={() => setShowModal(false)} handleAddJob={handleAddJob} />
                </div>
                <table className="table table-bordered table-hover mt-2">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedJobs.length === storeDetails.length}
                                />
                            </th>
                            <th scope="col">STT</th>
                            <th scope="col">Danh sách công việc</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Ngày thực hiện</th>
                            <th scope="col">Ghi chú</th>
                            <th scope="col">Người phụ trách</th>
                            <th scope="col">Trạng thái</th>
                            <th>Xác nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.length > 0 ? (
                            currentPageData.map((job, index) => (
                                <tr key={job.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedJobs.includes(job.id)}
                                            onChange={(e) => handleSelectJob(e, job.id)}
                                        />
                                    </td>
                                    <td>{currentPage * itemsPerPage + index + 1}</td>
                                    <td>{job.attributes.ListJob}</td>
                                    <td>{job.attributes.DescriptionJob}</td>
                                    <td>{formatDate(job.attributes.DateJob)}</td>
                                    <td>{job.attributes.Note}</td>
                                    <td>{job.attributes.Person}</td>
                                    <td>{job.attributes.StatusJob ? "Hoàn thành" : "Chưa hoàn thành"}</td>
                                    <td>
                                        {!job.attributes.StatusJob && (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleConfirm(job.id)}
                                            >
                                                Xác nhận
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={"Trước"}
                        nextLabel={"Sau"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
            <Devices />
        </div>
    );
};

export default Store;
