import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditContact = () => {

    const { id } = useParams(); 
    const navigate = useNavigate();

    const API_URL = "https://playground.4geeks.com/contact";

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    
    const getContact = () => {

        fetch(API_URL + "/agendas/vicente/contacts")
            .then(response => response.json())
            .then((data) => {

                const contactFound = data.contacts.find(
                    (contact) => contact.id == id
                );

                if (contactFound) {
                    setName(contactFound.name);
                    setPhone(contactFound.phone);
                    setEmail(contactFound.email);
                    setAddress(contactFound.address);
                }

            })
            .catch((error) => console.log("error:", error));
    };

    useEffect(() => {
        getContact();
    }, []);


    const handleSubmit = (event) => {

        event.preventDefault();

        fetch(API_URL + "/agendas/vicente/contacts/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
                address: address
            })
        })
            .then(response => response.json())
            .then((data) => {

                console.log("Contacto actualizado:", data);

                navigate("/");

            })
            .catch((error) => console.log("error:", error));
    };

    return (
        <div className="container mt-5">

            <div className="row">
                <div className="col-12 col-md-6 m-auto">

                    <h2 className="mb-4 text-center">Edit contact</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Full name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Save
                        </button>

                    </form>

                    <div className="mt-3 text-center">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <p>or get back to contacts</p>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};