import React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";



function Home() {
    const [emp, setEmp] = useState([]);
    const [task, setTask] = useState([]);
    const [summary, setSummary] = useState([]);
    const [empedit, setempEdit] = useState([]);
    const [taskedit, settaskEdit] = useState([]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { register: registerAddTask, handleSubmit: handleSubmitAddTask, reset: resetAddTask, } = useForm()
    const { register: registerEditEmp, handleSubmit: handleSubmitEditEmp, reset: resetEditEmp, } = useForm({ defaultValues: empedit[0] })
    const { register: registerEditTask, handleSubmit: handleSubmitEditTask, reset: resetEditTask, } = useForm({ defaultValues: taskedit[0] })

    const allemp = async () => {
        const res = await axios.get("http://localhost/anhas/viewemp.php")
        setEmp(res.data)
    }

    const alltask = async () => {
        const res = await axios.get("http://localhost/anhas/viewtask.php")
        setTask(res.data)
    }

    const allsummary = async () => {
        const res = await axios.get("http://localhost/anhas/summary.php")
        setSummary(res.data["Result"])
        allsummary()
    }

    useEffect(() => {
        allemp()
        alltask()
        allsummary()
    }, [])

    const getdata = async (frm) => {
        const res = await axios.post("http://localhost/anhas/addemp.php", JSON.stringify(frm))
        alert(res.data["Result"])
        allemp()
        reset();
    }

    const addtask = async (frm) => {
        const res = await axios.post("http://localhost/anhas/addtask.php", JSON.stringify(frm))
        alert(res.data["Result"])
        alltask()
        resetAddTask()
    }
    const taskstatus = async (id, status) => {
        const obj = { tid: id, sts: status }
        const res = await axios.post("http://localhost/anhas/taskstatus.php", JSON.stringify(obj))
        alert(res.data["Result"])
        alltask()
    }
    const deltaskrec = async (id) => {
        if (window.confirm("Are You Sure ?")) {
            const obj = { did: id }
            const res = await axios.post("http://localhost/anhas/deletetask.php", JSON.stringify(obj))
            alert(res.data["Result"])
            alltask()
        }
    }
    const delemprec = async (id) => {
        if (window.confirm("Are You Sure ?")) {
            const obj = { did: id }
            const res = await axios.post("http://localhost/anhas/deleteemp.php", JSON.stringify(obj))
            alert(res.data["Result"])
            allemp()
        }
    }
    const getemprec = (id) => {
        const row = emp.filter(obj => obj.eid == id)
        setempEdit(row[0])
        resetEditEmp(row[0])
    }
    const empupdate = async (frm) => {
        const res = await axios.post("http://localhost/anhas/empupdate.php", JSON.stringify(frm))
        alert(res.data["Result"])
        allemp()
        alltask()
    }
    const gettaskrec = (id) => {
        const row = task.filter(obj => obj.tid == id)
        settaskEdit(row[0])
        resetEditTask(row[0])
    }
    const taskupdate = async (frm) => {
        const res = await axios.post("http://localhost/anhas/updatetask.php", JSON.stringify(frm))
        alert(res.data["Result"])
        alltask()
    }

    return (
        <>
            <section className="row">
                <section className="col-md-2 table-responsive">
                    <section className="row">
                        <section className="col-md-auto">
                            <caption className="fw-bold fs-3">Employees</caption>
                        </section>
                        <section className="col-md-auto btn-sm mt-2">
                            <caption><button data-bs-target='#box' data-bs-toggle='modal' className="btn btn-outline-dark rounded-0 btn-sm">ADD</button></caption>
                        </section>
                    </section>
                    <table className="table table-bordered table-dark w-100" align="center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th colSpan={2}><center>Actions</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                emp.map((v, k) => {
                                    return (
                                        <tr>
                                            <td>{v.ename}</td>
                                            <td>
                                                <button onClick={() => delemprec(v.eid)} className='btn btn-outline-danger rounded-0'>Delete</button>
                                            </td>
                                            <td>
                                                <button data-bs-target='#empeditbox' data-bs-toggle='modal' onClick={() => getemprec(v.eid)} className='btn btn-outline-success rounded-0'>Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>
                <section className="col-md-10 table-responsive">
                    <section className="row">
                        <section className="col-md-auto">
                            <caption className="fw-bold fs-3">Tasks</caption>
                        </section>
                        <section className="col-md-auto btn-sm mt-2">
                            <caption><button data-bs-target='#addtaskbox' data-bs-toggle='modal' className="btn btn-outline-dark rounded-0 btn-sm">ADD</button></caption>
                        </section>
                    </section> <table className='table table-bordered table-dark w-100'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th>Employee</th>
                                <th>Status</th>
                                <th colSpan={2}><center>Actions</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                task.map((v, k) => {
                                    return (
                                        <tr>
                                            <td>{v.title}</td>
                                            <td>{v.date}</td>
                                            <td>{v.ename}</td>
                                            <td>
                                                {
                                                    v.status == "Pending" ? <button onClick={() => taskstatus(v.tid, v.status)} className='btn btn-outline-danger rounded-0'>{v.status}</button>
                                                        :
                                                        <button onClick={() => taskstatus(v.tid, v.status)} className='btn btn-outline-success rounded-0'>{v.status}</button>
                                                }
                                            </td>
                                            <td>
                                                <button onClick={() => deltaskrec(v.tid)} className='btn btn-outline-danger rounded-0'>Delete</button>
                                            </td>
                                            <td>
                                                <button data-bs-target='#edittaskbox' data-bs-toggle='modal' onClick={() => gettaskrec(v.tid)} className='btn btn-outline-success rounded-0'>Edit</button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <section className='row'>
                        <section className='col-md-12 table-responsive'>
                            <caption className="fw-bold fs-3">Summary</caption>
                            <table className='table table-bordered table-dark w-100'>
                                <thead>
                                    <tr>
                                        <th>Employee Name</th>
                                        <th>Total Task</th>
                                        <th>Completed Task</th>
                                        <th>Incompleted Task</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        summary.map((v, k) => {
                                            return (
                                                <tr>
                                                    <td>{v.ename}</td>
                                                    <td>{v.total}</td>
                                                    <td>{v.completed}</td>
                                                    <td>{v.pending}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </section>
                    </section>
                </section>
            </section>

            <section className='modal' id='box' data-bs-backdrop='static'>
                <section className='modal-dialog'>
                    <section className='modal-content'>
                        <section className='modal-header fs-3 fw-bold'>Add Employee<span data-bs-dismiss='modal' className='btn btn-close'></span></section>
                        <section className='modal-body'>
                            <form method='post' onSubmit={handleSubmit(getdata)}>
                                <table className='table table-bordered w-100 table-dark'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <td>
                                                <input {...register("ename", { required: true, pattern: /^[A-Za-z\s]{2,50}$/ })} type='text' className='form-control rounded-0 p-2' placeholder='Enter Name'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.ename?.type == "required" && "Enter Name"}
                                                    {errors.ename?.type == "pattern" && "Enter Valid Name *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>
                                                <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} type='text' className='form-control rounded-0 p-2' placeholder='Enter Email'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.ename?.type == "required" && "Enter Email"}
                                                    {errors.ename?.type == "pattern" && "Enter Valid Email *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <center><button data-bs-dismiss='modal' className='btn btn-outline-primary btn-rounded rounded-0'>ADD</button></center>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </form>
                        </section>
                    </section>
                </section>
            </section>

            <section className='modal' id='addtaskbox' data-bs-backdrop='static'>
                <section className='modal-dialog'>
                    <section className='modal-content'>
                        <section className='modal-header fs-3 fw-bold'>Add Task<span data-bs-dismiss='modal' className='btn btn-close'></span></section>
                        <section className='modal-body'>
                            <form method='post' onSubmit={handleSubmitAddTask(addtask)}>
                                <table className='table table-bordered table-dark w-100'>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <td>
                                                <input {...registerAddTask("title", { required: true, pattern: /^[A-Za-z0-9 .,'"-]{3,100}$/ })} type='text' placeholder='Enter Title' className='form-control rounded-0'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.title?.type == "required" && "Enter Title"}
                                                    {errors.title?.type == "pattern" && "Enter Valid Title *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td>
                                                <input {...registerAddTask("date", { required: true })} type='date' placeholder='Enter Title' className='form-control rounded-0'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.date?.type == "required" && "Select Date *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Select Employee</th>
                                            <td>
                                                <select {...registerAddTask("empid", { required: true })} className='form-select rounded-0'>
                                                    <option value={""}>Select Employee</option>
                                                    {
                                                        emp.map((v, k) => {
                                                            return (
                                                                <option value={v.eid}>{v.ename}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.empid?.type == "required" && "Select Employee *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <center><button data-bs-dismiss='modal' className='btn btn-outline-primary rounded-0'>ADD</button></center>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </form>
                        </section>
                    </section>
                </section>
            </section>
            <section className='modal' id='empeditbox' data-bs-backdrop='static'>
                <section className='modal-dialog'>
                    <section className='modal-content'>
                        <section className='modal-header fs-3 fw-bold'>Update Employee<span data-bs-dismiss='modal' className='btn btn-close'></span></section>
                        <section className='modal-body'>
                            <form method='post' onSubmit={handleSubmitEditEmp(empupdate)}>
                                <table className='table table-bordered w-100 table-dark'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <td>
                                                <input {...registerEditEmp("ename", { required: true, pattern: /^[A-Za-z\s]{2,50}$/ })} type='text' className='form-control rounded-0 p-2' placeholder='Enter Name'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.ename?.type == "required" && "Enter Name"}
                                                    {errors.ename?.type == "pattern" && "Enter Valid Name *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>
                                                <input {...registerEditEmp("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} type='text' className='form-control rounded-0 p-2' placeholder='Enter Email'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.ename?.type == "required" && "Enter Email"}
                                                    {errors.ename?.type == "pattern" && "Enter Valid Email *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <center><button data-bs-dismiss='modal' className='btn btn-outline-primary btn-rounded rounded-0'>Update</button></center>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </form>
                        </section>
                    </section>
                </section>
            </section>
            <section className='modal' id='edittaskbox' data-bs-backdrop='static'>
                <section className='modal-dialog'>
                    <section className='modal-content'>
                        <section className='modal-header fs-3 fw-bold'>Update Task<span data-bs-dismiss='modal' className='btn btn-close'></span></section>
                        <section className='modal-body'>
                            <form method='post' onSubmit={handleSubmitEditTask(taskupdate)}>
                                <table className='table table-bordered table-dark w-100'>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <td>
                                                <input {...registerEditTask("title", { required: true, pattern: /^[A-Za-z0-9 .,'"-]{3,100}$/ })} type='text' placeholder='Enter Title' className='form-control rounded-0'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.title?.type == "required" && "Enter Title"}
                                                    {errors.title?.type == "pattern" && "Enter Valid Title *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td>
                                                <input {...registerEditTask("date", { required: true })} type='date' placeholder='Enter Title' className='form-control rounded-0'></input>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.date?.type == "required" && "Select Date *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Select Employee</th>
                                            <td>
                                                <select {...registerEditTask("empid", { required: true })} className='form-select rounded-0'>
                                                    <option value={""}>Select Employee</option>
                                                    {
                                                        emp.map((v, k) => {
                                                            return (
                                                                <option value={v.eid}>{v.ename}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <section className='fw-bold text-danger mt-2'>
                                                    {errors.empid?.type == "required" && "Select Employee *"}
                                                </section>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <center><button data-bs-dismiss='modal' className='btn btn-outline-primary rounded-0'>Update</button></center>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </form>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Home