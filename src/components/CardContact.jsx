import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";

const CardContact = ({ contact, deleteContact }) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="card p-3">
                <div className="row align-items-center">
                    <div className="col-2 text-center">
                        <img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            className="rounded-circle"
                            width="100"
                            height="100"
                            alt="contact"
                        />
                    </div>

                    <div className="col-8">

                        <h5>{contact.name}</h5>

                        <p>
                            <i className="fa-solid fa-phone me-2"></i>
                            {contact.phone}
                        </p>

                        <p>
                            <i className="fa-solid fa-envelope me-2"></i>
                            {contact.email}
                        </p>

                        <p>
                            <i className="fa-solid fa-location-dot me-2"></i>
                            {contact.address}
                        </p>

                    </div>

                    <div className="col-2 text-end">

                        <Link to={`/edit/${contact.id}`} className="me-3 text-dark">
                            <i className="fas fa-pencil-alt"></i>
                        </Link>

                        <i
                            className="fa-solid fa-trash text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowModal(true)}
                        ></i>

                    </div>

                </div>
            </div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    deleteContact(contact.id);
                    setShowModal(false);
                }}
            />
        </>
    );
};

export default CardContact;