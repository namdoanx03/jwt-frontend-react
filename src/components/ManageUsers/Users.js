import { useEffect, useState } from "react"
import { fetchAllUser, deleteUser } from "../../service/userService"
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = (props) => {
    const [listUser, setListUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(2)
    const [totalPages, setTotalPages] = useState(0)

    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})

    //modal update/create user
    const [isShowModalUser , setIsShowModalUser ] = useState(false)
    const [actionModalUser, setActionModalUser] = useState('CREATE')
    const [dataModalUser, setDataModalUser] = useState({})

    useEffect(() => {
        fetchUsers()
    }, [currentPage])

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit)
        if(response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages)
            setListUser(response.data.DT.users)         
        }
    }
const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1)
};
const handleDeleteUser = async(user) => {
    setDataModal(user) 
    setIsShowModalDelete(true)
}
const handleClose = () => {
    setIsShowModalDelete(false)
    setDataModal({}) 

}
const confirmDeleteUser = async() => {
    let response = await deleteUser(dataModal)
    if (response && response.data.EC === 0) {
        toast.success(response.data.EM)
        await fetchUsers()
        setIsShowModalDelete(false)
    } else {
        toast.error(response.data.EM)
    }
}
const onHideModalUser = async() => {
    setIsShowModalUser(false)
    setDataModalUser({})
    await fetchUsers()
}
const handleEditUser = (user) => {
    setActionModalUser("UPDATE")
    setDataModalUser(user)
    setIsShowModalUser(true)
}
    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="action">
                            <button className="btn btn-success">Refesh</button>
                            <button className="btn btn-primary" 
                            onClick={() => 
                            {setIsShowModalUser(true)
                            setActionModalUser("CREATE")
                            }}>Add new user</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ?
                                    <>
                                        {listUser.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className="btn btn-warning mx-3" 
                                                            onClick={() => handleEditUser(item)}
                                                        >Edit</button>
                                                        <button className="btn btn-danger"
                                                            onClick={() => handleDeleteUser(item)}
                                                        >Delete</button>

                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <span>Not found user</span>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>
            <ModalDelete
                show = {isShowModalDelete}
                handleClose = {handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal = {dataModal}
            />
            <ModalUser title={"Create New User"} 
                onHide = {onHideModalUser}
                show = {isShowModalUser}
                action = {actionModalUser}
                dataModalUser = {dataModalUser}
            />
            
        </>
        
    )
}
export default Users