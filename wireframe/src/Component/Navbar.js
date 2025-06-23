import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <section class="row">
                <section class="col-md-12 p-0">
                    <nav class="navbar navbar-expand-lg bg-primary">
                        <section class="navbar-brand fs-2 fw-bold mx-2 text-light"> ANHAS WEB </section>


                        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <section class="collapse navbar-collapse" id="menu">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <Link to={"/"} class="btn btn-outline-dark rounded-0 m-2">Home</Link>
                                </li>
                            </ul>
                        </section>

                    </nav>
                </section>
            </section>
        </>
    )
}

export default Navbar